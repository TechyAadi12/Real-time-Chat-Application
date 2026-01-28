# Real-time Chat Application

A production-ready, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js), featuring real-time messaging, user authentication, and a modern UI with Tailwind CSS and DaisyUI.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO.
- **Authentication**: Secure login and signup with JWT (JSON Web Tokens) and bcryptjs.
- **Online Status**: Real-time tracking of online/offline users.
- **Responsive UI**: Beautiful, dark-mode interface built with React, Tailwind CSS v4, and DaisyUI v5.
- **Profile Customization**: Automatic default profile pictures based on gender.
- **Message Persistence**: Messages are saved in MongoDB for permanent chat history.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI development.
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS v4**: Utility-first CSS framework.
- **DaisyUI v5**: Premium UI components.
- **Zustand**: Lightweight state management for auth and conversations.
- **React Router Dom**: Client-side routing.
- **Socket.IO Client**: Real-time bidirectional communication.
- **React Hot Toast**: Beautiful notification alerts.

### Backend
- **Node.js & Express**: Scalable server-side logic.
- **MongoDB Atlas**: Cloud-hosted NoSQL database.
- **Socket.IO**: Real-time engine.
- **Mongoose**: Elegant MongoDB object modeling.
- **JWT**: Secure authentication.
- **Bcryptjs**: Password hashing for security.

## 📂 Project Structure

```
Real time Chat Application/
├── backend/                # Node.js Express Server
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic for routes
│   ├── middleware/        # Auth & error handling middleware
│   ├── models/            # Mongoose schemas (User, Message)
│   ├── routes/            # API endpoints (Auth, Messages, Users)
│   ├── socket/            # Socket.IO configuration
│   ├── utils/             # Helper functions (JWT generation)
│   └── server.js          # Main entry point
├── frontend/               # React Vite Application
│   ├── public/            # Static assets (male.jpg, female.jpg)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks (signup, login, etc.)
│   │   ├── pages/         # Application pages (Home, Login, Signup)
│   │   ├── zustand/       # State management stores
│   │   ├── App.jsx        # Routing and layout
│   │   └── main.jsx       # Entry point
│   └── vite.config.js     # Vite configuration & Proxy
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

### 4. Running the App
- Open your browser and navigate to `http://localhost:3000`.
- The frontend will automatically proxy API requests to `http://localhost:5000`.

## 🔧 Recent Improvements
- **Tailwind v4 Migration**: Updated to the latest Tailwind CSS v4 and DaisyUI v5 for improved performance and modern styling.
- **Local Assets**: Integrated local `male.jpg` and `female.jpg` as high-quality default profile pictures.
- **Database Cleanup**: Synchronized all existing users to use the new local asset path for profile photos.

## 📄 License
This project is open-source and available under the MIT License.
