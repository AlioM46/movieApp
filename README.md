### Preview ( https://movieapp-7pvq.onrender.com/  )

## * Please Note: if you got " Error 404 Not found" Please go to the home page "/" then refresh *

### ** I issued some problems with deployment it would be better if you clone it on your pc **


# Netflix Clone App

Welcome to the Netflix Clone App repository! This project replicates some of the features of Netflix and is built with React for the frontend, Express and Node.js for the backend, and MongoDB as the database. User authentication, movie management, and additional features such as favorites, user editing, roles, permissions, route protection, and password change are implemented.

## Technologies Used

- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - Redux Toolkit (RTK): A state management library.
  - RTK Query: A set of tools for simplifying data fetching and state management.
  
- **Backend:**
  - Express: A web application framework for Node.js.
  - Node.js: A JavaScript runtime.
  - Mongoose: Non-Relational Database Library.
  - JWT (JSON Web Token): Used for user authentication.

## Features

- **User Authentication:**
  - User registration and login with JWT.
  - Route protection for authenticated users.

- **Movie Management (CRUD):**
  - Read ( Watch ) movies.
  - Create, Update, and Delete movies *(Admin only)*


- **User Management:**
  - CURD Users. *(Admin only)*
  - Change password and update user details.




## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AlioM46/Netflix_Clone.git
    ```

2. **Install dependencies:**

    ```bash
    cd server
    npm install

-----
    
    cd MovieApp
    npm install 
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    FRONT_END_URL=http://localhost:5173
    PORT=5000
    JWT_SECRET=your_jwt_secret
    MONGO_URL=your_mongodb_uri
    ```

4. **Run the application:**

    ```bash
    # Start the backend server
    cd server
    npm start

    # Start the frontend application
    cd MovieApp
    npm run dev
    ```

The application should now be running locally, and you can access it in your browser. The frontend will be available at `http://localhost:5173`, and the backend will be running on the ( 5000 ) port.

## Contributing


We welcome contributions! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.


Happy Streaming! 🎬✨


🏞️🏞 ScreenShoots:
![image](https://i.ibb.co/sPrb5K4/Screenshot-2023-12-17-235742.png)

![image](https://i.ibb.co/M7yXg6m/Screenshot-2023-12-17-235804.png)

![image](https://i.ibb.co/2S9k8C0/Screenshot-2023-12-17-235846.png)

