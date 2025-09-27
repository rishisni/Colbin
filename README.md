# Colbin Full Stack Developer Assignment

This is a full-stack recruitment platform prototype built for the Colbin Full Stack Developer assignment. The application includes a user registration and login system with secure authentication, and a simple user profile page.

The project is structured into two main parts: a Node.js backend API and a React frontend application.

<br>

## 🚀 Features

* **User Registration:** A public API endpoint for new users to sign up with their email and password.
* **User Login:** A public API for users to authenticate and receive a JWT.
* **User Profile:** A protected page that fetches and displays the authenticated user's data.

<br>

---

<br>

## 🛠️ Technology Stack

**Backend:**
* **Node.js & Express.js:** The runtime environment and web framework for building the REST API.
* **MySQL & Sequelize ORM:** The relational database and Object-Relational Mapper for data persistence.
* **JWT (JSON Web Tokens):** For secure, stateless authentication.
* **Bcrypt:** For hashing and salting user passwords.
* **Joi:** For robust request body validation.

**Frontend:**
* **React & Vite:** The JavaScript library for building the user interface, with Vite for a fast development environment.
* **React Router:** For client-side routing.
* **React-Bootstrap:** For a professional, mobile-first UI with a dark theme.
* **Axios:** For making HTTP requests to the backend API.

<br>

---

<br>

<br>

## 🚀 Setup and Run Instructions

Follow these steps to set up and run the application locally.

### 1. Backend Setup

1.  Navigate to the `backend` directory.
    ```bash
    cd backend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Create a `.env` file and configure your database and JWT secret.
    ```
   
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=colbin_platform
    DB_PORT=3306
    JWT_SECRET=a_very_long_and_random_secret_key
    ```
4.  Start the backend server. The server will automatically connect to your MySQL database and create the necessary `users` table.
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory.
    ```bash
    cd frontend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Create a `.env` file with the API URL.
    ```
    VITE_API_URL=http://localhost:5000/api/user
    ```
4.  Start the frontend development server.
    ```bash
    npm run dev
    ```

The frontend application should now be accessible at `http://localhost:5173`.

<br>

---

<br>

