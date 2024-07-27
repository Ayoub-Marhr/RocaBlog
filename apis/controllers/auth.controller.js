import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password, department, job } = req.body;

        // Check if the username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        // Check if the email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            department,
            job
        });

        // Save the new user
        const savedUser = await newUser.save();

        // Send success response
        return res.status(201).json(savedUser);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            if (err.keyPattern.username) {
                return res.status(400).json({ message: 'Username is already taken' });
            }
            if (err.keyPattern.email) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
        }

        // General error
        return res.status(500).json({ message: err.message });
    }
};
