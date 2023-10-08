# Book Store React Application

Welcome to the Book Store React Application! This web application allows users to browse and purchase books from a wide range of categories. It also features Firebase authentication for user login and a real-time admin panel for managing book inventory using WebSockets.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM)
  - Firebase Authentication

- **Frontend:**
  - React
  - Redux (for state management)
  - Axios (for API requests)
  - Firebase Authentication

- **Real-time Updates:**
  - WebSockets (for real-time admin panel updates)

## Features

- **User Authentication:**
  - Secure user authentication using Firebase Authentication.
  - Users can create accounts, log in, and reset passwords.

- **Book Catalog:**
  - Browse books by category, author, or genre.
  - View book details, including the summary, author, and price.

- **Shopping Cart:**
  - Add books to the shopping cart.
  - Adjust the quantity and remove items from the cart.

- **Checkout:**
  - Enter shipping information and place orders.

- **Admin Panel:**
  - Real-time updates for inventory management using WebSockets.
  - Add new books, update existing ones, and remove books from the catalog.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/book-store.git`
2. Navigate to the backend folder: `cd backend`
3. Install backend dependencies: `npm install`
4. Start the backend server: `node server.js`
5. Navigate to the frontend folder: `cd ../frontend`
6. Install frontend dependencies: `npm install`
7. Start the frontend development server: `npm start`

Make sure to configure Firebase Authentication and MongoDB connection in the backend. Also, set up WebSocket connections for real-time updates in the admin panel.

## Admin Panel

To access the admin panel:

1. Visit `http://localhost:3000/admin` in your browser.
2. Log in using your admin credentials.
3. Manage book inventory in real-time using the WebSocket-powered admin panel.
