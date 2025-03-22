import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas
app.use("/api/auth",authRoutes); // http://localhost:5000/api/auth/login
app.use("/api/categories", categoryRoutes);
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Servidor de NodeJs http://localhost:${PORT}`)
})