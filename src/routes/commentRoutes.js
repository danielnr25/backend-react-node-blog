import express from 'express';
import { storeComment,fetchComments } from '../controllers/commentController.js';

const router = express.Router();

router.post("/",storeComment);
router.get("/:post_id",fetchComments);

export default router;