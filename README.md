# Womp - Create Engaging Polls

## Overview
Womp is a web application designed to create, share, and analyze polls with ease. It allows users to engage their audience and gather meaningful insights through interactive polls.

## Project Structure
The project is structured as follows:

```
.gitattributes
.gitignore
app.py
eslint.config.js
Img/
index.html
jsconfig.json
package.json
postcss.config.js
requirements.txt
src/
	App.jsx
	components/
		auth/
			Auth.jsx
			LoginForm.jsx
			ProtectedRoute.jsx
			SignupForm.jsx
		common/
			NotFound.jsx
		dashboard/
			CreatePollForm.jsx
			Dashboard.jsx
			DatePicker.jsx
		layout/
			Footer.jsx
			Header.jsx
		polls/
			PollResults.jsx
			PollVoting.jsx
		sections/
			AboutUs.jsx
			Benefits.jsx
			Hero.jsx
			HowItWorks.jsx
	contexts/
		AuthContext.jsx
	hooks/
		usePollData.js
	index.css
	main.jsx
	vite-env.d.ts
tailwind.config.js
vite.config.js
```

## Key Files and Directories

### Backend
- **app.py**: The main backend file using Flask to handle API requests, user authentication, and database interactions.

### Frontend
- **index.html**: The main HTML file that includes the root div for the React application.
- **src/**: Contains all the React components, contexts, hooks, and styles.
  - **App.jsx**: The main React component that sets up routing and context providers.
  - **components/**: Contains all the React components organized by functionality.
    - **auth/**: Components related to authentication (login, signup, protected routes).
    - **common/**: Common components like NotFound.
    - **dashboard/**: Components related to the user dashboard (creating polls, viewing polls).
    - **layout/**: Layout components like Header and Footer.
    - **polls/**: Components for viewing poll results and voting.
    - **sections/**: Static sections like About Us, Benefits, Hero, and How It Works.
  - **contexts/**: Contains context providers like AuthContext for managing authentication state.
  - **hooks/**: Custom hooks like usePollData for fetching and managing poll data.
  - **index.css**: The main CSS file that includes Tailwind CSS imports.
  - **main.jsx**: The entry point for the React application.

### Configuration
- **package.json**: Contains project metadata and dependencies.
- **vite.config.js**: Configuration file for Vite, the build tool.
- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **postcss.config.js**: Configuration file for PostCSS.
- **eslint.config.js**: Configuration file for ESLint.

### Other
- **requirements.txt**: Lists Python dependencies for the backend.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **.gitattributes**: Specifies Git attributes for handling line endings.

## Setup and Installation

### Backend
1. **Install Python dependencies**:
   ```sh
   pip install -r requirements.txt
   ```

2. **Run the Flask server**:
   ```sh
   python app.py
   ```

### Frontend
1. **Install Node.js dependencies**:
   ```sh
   npm install
   ```

2. **Run the development server**:
   ```sh
   npm run dev
   ```

3. **Build the project**:
   ```sh
   npm run build
   ```

## Usage

### Authentication
- **Login**: Users can log in using their email and password.
- **Signup**: New users can register by providing their name, email, and password.
- **Protected Routes**: Certain routes are protected and require authentication.

### Polls
- **Create Poll**: Authenticated users can create new polls with multiple options.
- **Vote**: Users can vote on polls.
- **View Results**: Users can view the results of polls, including the number of votes for each option.

### Dashboard
- **My Polls**: Users can view and manage their created polls.
- **Create Poll**: Users can create new polls from the dashboard.

## API Endpoints

### Authentication
- **POST /api/auth/login**: Log in a user.
- **POST /api/auth/register**: Register a new user.

### Polls
- **POST /api/polls**: Create a new poll.
- **GET /api/polls**: Get all polls created by the authenticated user.
- **POST /api/polls/:poll_id/vote**: Vote on a poll.
- **POST /api/polls/:poll_id/close**: Close a poll.
- **GET /api/polls/:poll_id**: Get a specific poll.
- **GET /api/polls/:poll_id/results**: Get the results of a specific poll.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributors
- Team 1, Software Engineering Students at Dogus University

## Acknowledgements
- This project is part of the Software Design and Architecture course at Dogus University.
