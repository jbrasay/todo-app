# Todo App

This Todo application is a personal project created to learn and practice the MERN stack(MongoDB, Express, React, Node.js). This app allows users to create, read, update, and delete todos.

![Alt text](https://github.com/jbrasay/project-screenshots/blob/0fa4f1c41b34302c67808a28b5410c12be4f18f8/screenshots/todo-app.png)

## Features

- Create, update, and delete todos, and mark todos as completed
- Login page (WIP)

## Technologies

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **HTTP Client:** Axios
- **CORS:** For handling Cross-Origin requests

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/jbrasay/todo-app.git
   cd todo-app

2. Navigate to the server directory and install dependencies:

   ```bash
   cd  server
   npm install express mongodb dotenv nodemon cors mongoose

3. Navigate to the client directory and install dependencies:

   ```bash
   cd client
   npm install
   npm install -D tailwindcss pstcss autoprefixer
   npm install axios

4. Set up your environment variables for MongoDB. Create a .env file in the server directory and add your MongoDB connection string:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=your_server_port

## Starting Project

1. Start the server:
   
   ```bash
   cd server
   npm start

2. In a new terminal, start the client:
  
   ```bash
   cd client
   npm run dev