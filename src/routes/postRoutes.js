import express from 'express';
import multer from 'multer';
import {
   getAllPosts,
   getPostById,
   createPost,
   updatePost,
   deletePost,
   searchPost
} from '../controllers/postController.js';

const router = express.Router();

// Configuración de multer para la subida de imágenes
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
   }
});

const upload = multer({ storage });

// Rutas para posts
router.get('/search', searchPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', upload.single('image'), createPost);
router.put('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);

export default router;
