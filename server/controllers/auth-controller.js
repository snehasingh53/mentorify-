// controllers/auth-controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model'); // Adjust the path based on your project structure
const dotenv = require('dotenv');
dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and return JWT token using environment variable
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'User logged in successfully', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
   
};

const register = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {

            return res.status(400).json({ message: 'Email already exists' });
        }
        const userCreated = await User.create({ username, email, phone, password });

        //const token = userCreated.generateToken();
        const token = jwt.sign({ id: userCreated._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        
        res.status(201).json({
            msg: 'User created successfully',
            token: token,
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        next(error);
        //res.status(500).json({ message: 'Internal server error' });
    }
};

const home = async (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to home page' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//  user logic to send user data 

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({  userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

module.exports = { home, register, login, user };
