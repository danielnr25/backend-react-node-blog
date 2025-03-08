import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post("/login", login); //localhost:5000/api/login


export default router;