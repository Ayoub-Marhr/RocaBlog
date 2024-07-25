import express from 'express';
import mongoose from 'mongoose';
const app = express();
mongoose.connect('mongodb+srv://root:root@mern-blog.seiqug2.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog').then(console.log('mongodb is connected')).catch(err=>{console.log(err)})
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
