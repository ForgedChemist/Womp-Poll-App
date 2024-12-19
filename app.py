from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app, 
     resources={r"/api/*": {
         "origins": ["http://localhost:5173"],
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type", "Accept"],
         "supports_credentials": True
     }},
     supports_credentials=True)
def init_db():
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    # Add users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert demo user if not exists
    c.execute('SELECT * FROM users WHERE email = ?', ('demo@womp.com',))
    if not c.fetchone():
        c.execute(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            ('demo@womp.com', generate_password_hash('demo123'), 'Demo User')
        )
    
    # Drop existing polls table if it exists
    c.execute('DROP TABLE IF EXISTS polls')
    
    # Create new polls table with updated schema
    c.execute('''
        CREATE TABLE polls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            options TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by INTEGER,
            is_open BOOLEAN DEFAULT 1,
            FOREIGN KEY (created_by) REFERENCES users (id)
        )
    ''')
    
    # Create votes table
    c.execute('''
        CREATE TABLE IF NOT EXISTS votes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            poll_id INTEGER,
            option_index INTEGER,
            FOREIGN KEY (poll_id) REFERENCES polls (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/api/polls', methods=['POST'])
def create_poll():
    data = request.json
    question = data.get('question')
    options = json.dumps(data.get('options'))
    
    # Get user_id from session (you'll need to implement session handling)
    user_id = request.cookies.get('user_id')  # Or however you're tracking the logged-in user
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    c.execute(
        'INSERT INTO polls (question, options, created_by, is_open) VALUES (?, ?, ?, ?)',
        (question, options, user_id, True)
    )
    poll_id = c.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({'id': poll_id, 'message': 'Poll created successfully'})

@app.route('/api/polls', methods=['GET'])
def get_polls():
    user_id = request.cookies.get('user_id')
    print("User ID from cookie:", user_id)  # Debug print
    
    if not user_id:
        return jsonify({'error': 'No user ID found in cookies'}), 401
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    try:
        c.execute('''
            SELECT p.*, u.name as creator_name 
            FROM polls p 
            JOIN users u ON p.created_by = u.id 
            WHERE p.created_by = ?
        ''', (user_id,))
        polls = c.fetchall()
        
        formatted_polls = []
        for poll in polls:
            # Get total votes for the specific poll from the votes table
            c.execute('SELECT COUNT(*) FROM votes WHERE poll_id = ?', (poll[0],))
            total_votes = c.fetchone()[0]  # Get the total count of votes for this poll
            
            options = json.loads(poll[2])
            # Get vote counts for each option
            c.execute('SELECT option_index, COUNT(*) FROM votes WHERE poll_id = ? GROUP BY option_index', (poll[0],))
            votes = dict(c.fetchall())
            
            formatted_polls.append({
                'id': poll[0],
                'question': poll[1],
                'options': options,
                'votes': [votes.get(i, 0) for i in range(len(options))],  # Votes for each option
                'total_votes': total_votes,  # Total votes from the votes table
                'created_at': poll[3],
                'created_by': poll[4],
                'creator_name': poll[6],
                'is_open': bool(poll[5])
            })
        
        return jsonify(formatted_polls)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/polls/<int:poll_id>/vote', methods=['POST'])
def vote(poll_id):
    data = request.json
    options = data.get('options', [])
    
    user_id = request.cookies.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    # Check if poll is open
    c.execute('SELECT is_open FROM polls WHERE id = ?', (poll_id,))
    poll = c.fetchone()
    
    if not poll or not poll[0]:  # if poll doesn't exist or is_open is False
        conn.close()
        return jsonify({'error': 'Poll is closed or does not exist'}), 403
    
    # If poll is open, record the vote
    try:
        for option_index in options:
            option_index = int(option_index)  # Ensure option_index is an integer
            # Insert the vote for each selected option
            c.execute('INSERT INTO votes (poll_id, option_index) VALUES (?, ?)', (poll_id, option_index))
        
        conn.commit()
        return jsonify({'message': 'Votes recorded successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
    return jsonify({'message': 'Vote recorded successfully'})

@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def login():
    # Handle preflight request
    if request.method == 'OPTIONS':
        return '', 200
        
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    print(f"Login attempt for email: {email}")  # Debug print
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = c.fetchone()
    conn.close()
    
    if user and check_password_hash(user[2], password):
        response = jsonify({
            'success': True,
            'user': {
                'id': user[0],
                'email': user[1],
                'name': user[3]
            }
        })
        # Set cookie with SameSite and other attributes
        response.set_cookie(
            'user_id',
            str(user[0]),
            httponly=True,
            samesite='Lax',
            secure=False,  # Set to True in production with HTTPS
            max_age=86400  # 24 hours
        )
        print(f"Setting user_id cookie: {user[0]}")  # Debug print
        return response
    
    return jsonify({
        'success': False,
        'message': 'Invalid credentials'
    }), 401

@app.route('/api/auth/register', methods=['POST', 'OPTIONS'])
def register():
    # Handle preflight request
    if request.method == 'OPTIONS':
        return '', 200
        
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    print(f"Parsed fields: email={email}, password={'*'*len(password) if password else None}, name={name}")  # Debug print

    if not email or not password or not name:
        missing = []
        if not email: missing.append('email')
        if not password: missing.append('password')
        if not name: missing.append('name')
        return jsonify({
            'success': False, 
            'message': f'Missing required fields: {", ".join(missing)}'
        }), 400
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    try:
        c.execute(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            (email, generate_password_hash(password), name)
        )
        conn.commit()
        conn.close()
        return jsonify({
            'success': True,
            'user': {'email': email, 'name': name}
        })
    except sqlite3.IntegrityError as e:
        print(f"Database error: {e}")  # Debug print
        conn.close()
        return jsonify({
            'success': False,
            'message': 'Email already exists'
        }), 400
    except Exception as e:
        print(f"Unexpected error: {e}")  # Debug print
        conn.close()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/polls/<int:poll_id>/close', methods=['POST'])
def close_poll(poll_id):
    user_id = request.cookies.get('user_id')  # Or however you're tracking the logged-in user
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    # Verify the user owns this poll
    c.execute('SELECT created_by FROM polls WHERE id = ?', (poll_id,))
    poll = c.fetchone()
    
    if not poll or str(poll[0]) != str(user_id):
        conn.close()
        return jsonify({'error': 'Unauthorized'}), 403
    
    c.execute('UPDATE polls SET is_open = 0 WHERE id = ?', (poll_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Poll closed successfully'})

@app.route('/api/polls/<int:poll_id>', methods=['GET'])
def get_poll(poll_id):
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    try:
        # Fetch the poll by ID
        c.execute('SELECT * FROM polls WHERE id = ?', (poll_id,))
        poll = c.fetchone()
        
        if poll is None:
            return jsonify({'error': 'Poll not found'}), 404
        
        # Format the poll data as needed
        poll_data = {
            'id': poll[0],
            'question': poll[1],
            'options': json.loads(poll[2]),  # Assuming options are stored as JSON
            'created_at': poll[3],
            'created_by': poll[4],
            'is_open': bool(poll[5])
        }
        
        return jsonify(poll_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True) 