import express from 'express';
import {
   getAllPosts,
   getPostById,
   createPost,
   updatePost,
   deletePost,
   searchPost
} from '../controllers/postController.js';
import { upload } from '../middlewares/Upload.js';
const router = express.Router();


// Rutas para posts
router.get('/search', searchPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', upload.single('image'), createPost);
router.put('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);

export default router;
