# ConnectSphere

## Project Description
ConnectSphere is a full-stack real-time communication platform built with modern web technologies. It enables users to connect, communicate, and collaborate seamlessly through a responsive web interface and robust backend infrastructure.

## Features
- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure authentication with JWT and password hashing (bcrypt)
- **Image Support**: Cloud-based image storage and management with Cloudinary
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS and DaisyUI
- **State Management**: Efficient client-side state handling with Zustand
- **Smooth Animations**: Enhanced UX with Framer Motion
- **Toast Notifications**: User feedback with React Hot Toast
- **Database Integration**: MongoDB with Mongoose ODM

## Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken) & Bcrypt
- **Real-time**: Socket.io
- **Storage**: Cloudinary
- **Development**: Nodemon for hot reloading

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with DaisyUI
- **Routing**: React Router
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Real-time**: Socket.io Client

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/IvinMathewAbraham/ConnectSphere.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ConnectSphere
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory and include the following variables:
   ```plaintext
   DB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage
After successfully starting the server, open your browser and go to `http://localhost:3000` to explore the ConnectSphere application. Create an account or log in to experience the full features of the platform.
