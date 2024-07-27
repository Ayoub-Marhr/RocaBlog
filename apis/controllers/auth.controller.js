import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
}
const JWT_Secret = "ROCA"; // Consider using environment variables for secrets

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        // Find the user by email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Compare provided password with hashed password
        const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
        if (!isPasswordValid) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, JWT_Secret, { expiresIn: '1h' });

        // Send response with token in a cookie
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production
            sameSite: 'Strict' // Prevents CSRF attacks
        }).json(validUser);
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const { email, name, googlePhotoUrl } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists, generate a token and respond
            const token = jwt.sign({ id: user._id }, JWT_Secret);
            const { password, ...rest } = user._doc;
            return res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            // User does not exist, create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join(' ') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, JWT_Secret);
            const { password, ...rest } = newUser._doc;
            return res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (error) {
        console.error('Error during Google authentication:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};