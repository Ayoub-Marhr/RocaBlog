import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root@mern-blog.seiqug2.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB is connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/user', userRoutes);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
