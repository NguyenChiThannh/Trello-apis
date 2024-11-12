# Trello Clone API

## 1. Introduction
A RESTful API backend for a Trello-like project management application built with Node.js, Express, and MongoDB.

### 1.1 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Google OAuth integration
  - Password reset with OTP
  - Role-based access control

- **Board Management**
  - Create/Read/Update boards
  - Public and private board types
  - Board member management
  - Pagination support

- **Column & Card Management**
  - Create/Read/Update/Delete columns
  - Create/Read/Update cards
  - Drag and drop support for cards between columns
  - Card comments and cover images

- **Real-time Features**
  - Socket.IO integration for real-time updates
  - Online user tracking
  - Real-time notifications

### 1.2 Tech Stack
- Javascript
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- Passport.js
- Nodemailer
- Cloudinary
- Twilio

### 1.3 Prerequisites

- Node.js 18.16.0
- MongoDB
- Gmail account (for email notifications)
- Cloudinary account (for image uploads)
- Google OAuth credentials
- Twilio account (for SMS)

### 1.4 Environment Variables

Create a `.env` file in the root directory with the following variables:

## 2. API Documentation

### 2.1 Authentication Routes

- **POST** `/register`: Registers a new user. A Magic Link is sent to the user's email. Clicking the link redirects to /verify-account/ for account creation.
- **POST** `/verify-account/`: Verifies the user's email and creates an account in the database.
- **POST** `/login`: Logs in a user.
- **POST** `/refresh`: Requests a new refresh token.
- **POST** `/logout`: Logs out the user and invalidates their session.

#### Google OAuth Routes

- **GET** `/google`: Initiates Google OAuth for login.
- **GET** `/google/callback`: Handles the Google OAuth callback.
- **GET** `/login-success`: Success endpoint for third-party authentication.

### 2.2 Board Routes

- **GET** `/`: Retrieves all boards for the authenticated user.
- **POST** `/`: Creates a new board.
- **GET** `/:boardId`: Retrieves a specific board's details.
- **PUT** `/:boardId`: Updates a specific board's details.
- **PUT** `/supports/moving_card`: Moves a card to a different column.

### 2.3 Column Routes

- **POST** `/`: Creates a new column.
- **PUT** `/:id`: Updates a specific column's details.
- **DELETE** `/:id`: Deletes a specific column.

### 2.4 Card Routes

- **POST** `/`: Creates a new card.
- **PATCH** `/uploadCover`: Updates a specific column's details.
- **PATCH** `/updateDescription`: Updates a specific card's description.
- **POST** `/comment`: Adds a comment to a specific card.

### 2.5 Invitations Routes

- **POST** `/`: Creates a new invitation.
- **POST** `/accept-invitation`: Accepts an invitation.

### 2.6 OTP Routes

- **POST** `/`: Creates a new OTP.
- **POST** `/verify`: Verifies an OTP.

### 2.7 User Routes

- **DELETE** `/`: Deletes a user.
- **PATCH** `/upload`: Updates a user's avatar.

### 2.8 Message Routes

- **GET** `/:boardId/:receiverId`: Retrieves messages between two users.
- **POST** `/send/:boardId/:receiverId`: Sends a message to a user.
