import express from 'express';
import { test } from '../controllers/user.controller.js'; // Adjust the path based on your directory structure

const router = express.Router();

router.get('/test', test);

export default router;
