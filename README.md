# Blog Heron: A Full-Stack MERN Application

Blog Heron is a modern, feature-rich blog platform built from the ground up using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates a comprehensive understanding of full-stack web development, from a secure RESTful API on the back-end to a dynamic, responsive user interface on the front-end.

This application was developed as a guided project to showcase seamless integration between front-end and back-end components, including database operations, user authentication, API communication, and state management.

---

## ✨ Features

This project is packed with features that showcase a wide range of web development skills:

*   **Full CRUD Functionality:** Create, Read, Update, and Delete blog posts.
*   **User Authentication:** Secure user registration and login system using JSON Web Tokens (JWT) and password hashing with `bcryptjs`.
*   **Authorization & Protected Routes:** Users must be logged in to create, edit, or delete posts. A user can only modify their own posts.
*   **Featured Image Uploads:** Seamless image uploading for post cover images, handled with `multer` on the back-end.
*   **Dynamic Front-End:** A sleek and modern UI built with **React** and **Vite**, featuring:
    *   **Client-side Routing** with React Router.
    *   **Global State Management** for authentication using React Context.
    *   **Beautiful, Responsive UI** styled with **Tailwind CSS** and **shadcn/ui**.
*   **Efficient Back-End:** A robust RESTful API built with **Node.js** and **Express.js**.
*   **Paginated API:** The endpoint for fetching posts is paginated to ensure high performance, even with a large number of posts.
*   **Database Seeder:** A script to quickly populate the database with a large amount of realistic dummy data for development and testing.

---

## 📸 Application Screenshots

Here's a sneak peek of Blog Heron in action.

**Homepage (with Post Grid & Pagination)**
 
*Replace this with a link to your screenshot*

**Single Post Page (with Featured Image)**
 
*Replace this with a link to your screenshot*

**Create/Edit Post Form (with Image Upload)**
 
*Replace this with a link to your screenshot*

**Login Page**
 
*Replace this with a link to your screenshot*


---

## 🛠️ Tech Stack

### Back-End
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web framework for Node.js.
*   **MongoDB:** NoSQL database for storing data.
*   **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
*   **JSON Web Token (JWT):** For secure, token-based authentication.
*   **bcryptjs:** For hashing passwords.
*   **Multer:** For handling file uploads.
*   **express-validator:** For robust API input validation.

### Front-End
*   **React.js:** JavaScript library for building user interfaces.
*   **Vite:** Next-generation front-end tooling for fast development.
*   **React Router:** For client-side routing.
*   **React Context API:** For global state management.
*   **Tailwind CSS:** A utility-first CSS framework for rapid styling.
*   **shadcn/ui:** Re-usable components built with Radix UI and Tailwind CSS.
*   **Axios:** For making HTTP requests to the back-end API.
*   **DOMPurify:** For sanitizing HTML content to prevent XSS attacks.

---

## 🚀 Setup and Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v20.x LTS recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)
*   [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set up the Back-End:**
    ```sh
    # Navigate to the server directory
    cd server

    # Install dependencies
    pnpm install

    # Create a .env file in the /server root
    # Copy the contents of .env.example into it
    cp .env.example .env

    # Update the .env file with your credentials
    # - MONGODB_URI: Your MongoDB connection string
    # - JWT_SECRET: A long, random secret string
    
    # Start the server
    pnpm run dev
    ```
    The back-end server will be running on `http://localhost:5000`.

3.  **Set up the Front-End:**
    *Open a new terminal window for this step.*
    ```sh
    # Navigate to the client directory
    cd client

    # Install dependencies
    pnpm install
    
    # Start the client development server
    pnpm run dev
    ```
    The front-end application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 📖 API Documentation

The back-end provides the following RESTful API endpoints:

### Auth Routes
*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user and receive a JWT.

### Post Routes
*   `GET /api/posts`: Get all posts (with pagination via `?page` & `?limit`).
*   `GET /api/posts/:identifier`: Get a single post by its ID or slug.
*   `POST /api/posts`: Create a new post (Protected).
*   `PUT /api/posts/:identifier`: Update an existing post (Protected).
*   `DELETE /api/posts/:identifier`: Delete a post (Protected).

### Category Routes
*   `GET /api/categories`: Get all categories.

### Upload Routes
*   `POST /api/upload`: Upload an image file (Protected).

---
