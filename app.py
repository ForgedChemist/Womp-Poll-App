from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def init_db():
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    # Add users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert demo user if not exists
    c.execute('SELECT * FROM users WHERE email = ?', ('demo@womp.com',))
    if not c.fetchone():
        c.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            ('demo@womp.com', generate_password_hash('demo123'))
        )
    
    # Create polls table
    c.execute('''
        CREATE TABLE IF NOT EXISTS polls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            options TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    options = json.dumps(data.get('options'))  # Convert options list to JSON string
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    c.execute('INSERT INTO polls (question, options) VALUES (?, ?)', (question, options))
    poll_id = c.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({'id': poll_id, 'message': 'Poll created successfully'})

@app.route('/api/polls', methods=['GET'])
def get_polls():
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    c.execute('SELECT * FROM polls')
    polls = c.fetchall()
    
    formatted_polls = []
    for poll in polls:
        # Get vote counts for each option
        c.execute('SELECT option_index, COUNT(*) FROM votes WHERE poll_id = ? GROUP BY option_index', (poll[0],))
        votes = dict(c.fetchall())
        
        options = json.loads(poll[2])
        formatted_polls.append({
            'id': poll[0],
            'question': poll[1],
            'options': options,
            'votes': [votes.get(i, 0) for i in range(len(options))]
        })
    
    conn.close()
    return jsonify(formatted_polls)

@app.route('/api/polls/<int:poll_id>/vote', methods=['POST'])
def vote(poll_id):
    data = request.json
    option_index = data.get('optionIndex')
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    c.execute('INSERT INTO votes (poll_id, option_index) VALUES (?, ?)', (poll_id, option_index))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Vote recorded successfully'})

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = c.fetchone()
    conn.close()
    
    if user and check_password_hash(user[2], password):
        return jsonify({
            'success': True,
            'user': {'email': user[1]}
        })
    
    return jsonify({
        'success': False,
        'message': 'Invalid credentials'
    }), 401

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    conn = sqlite3.connect('polls.db')
    c = conn.cursor()
    
    try:
        c.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            (email, generate_password_hash(password))
        )
        conn.commit()
        conn.close()
        return jsonify({
            'success': True,
            'user': {'email': email}
        })
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({
            'success': False,
            'message': 'Email already exists'
        }), 400

if __name__ == '__main__':
    app.run(debug=True) 