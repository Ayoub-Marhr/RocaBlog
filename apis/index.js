import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root@mern-blog.seiqug2.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog')
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({    
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
