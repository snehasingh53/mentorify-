
Overview
Mentorify is a comprehensive mentorship platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It offers users access to a range of educational courses while providing administrators with a robust panel for managing users and content. The platform distinguishes between admin and regular users, ensuring a tailored experience for each type of user.

Features
Admin Panel: Enables administrators to manage users, update course content, and delete records.
User Management: Admins can view, update, or delete user accounts.
Course Management: Admins can add, update, or remove courses.
User Experience: Regular users have access to view and enroll in various courses.
Redirection: Non-admin users are redirected to the home page if they attempt to access the admin panel.
Technology Stack
MongoDB: NoSQL database for storing user and course data.
Express.js: Web framework for building RESTful APIs.
React: Front-end library for building the user interface.
Node.js: JavaScript runtime for server-side development.
Installation
To get started , follow these steps:

Prerequisites
Node.js (>= 14.x)
MongoDB (>= 4.x)
Clone the Repository
bash
Copy code
git clone https://github.com/your-username/mentorify.git
cd mentorify
Install Dependencies
bash
Copy code
npm install
cd client
npm install
cd ..
Configuration
Set up environment variables: Create a .env file in the root directory with the following variables:

env
Copy code

MONGODB_URI=mongodb+srv://admin:thehackstrikesback@cluster0.kxao4nf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
JWT_SECRET_KEY =MYFIRSTMERNPROJET;s
Configure MongoDB: Ensure MongoDB is running on your local machine or update the MONGO_URI to point to your MongoDB instance.

Run the Application
Start the Server

bash
Copy code
npm start
Start the Client

bash
Copy code
cd client
npm start
Accessing the Application
Admin Panel: Navigate to /admin (accessible only to admins).
Home Page: Navigate to / to view available courses and access general functionalities.
User Roles
Admin: Can manage users and courses through the admin panel.
Regular User: Can view and enroll in courses. Access to the admin panel is restricted and redirects to the home page.
Contributing
Contributions are welcome! To contribute to the project , follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and test them thoroughly.
Submit a pull request with a detailed description of your changes.


Contact
For any questions or feedback, please contact:

Email: ssnehasingh53@gmail.com

