import { createComment,getCommentsByPost } from "../models/Comment.js";


export const storeComment = async(req, res) =>{
    const {post_id, author, text} = req.body;
    
    if (!post_id || !author || !text) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const result = await createComment(text,author,post_id);
        res.status(201).json({ message: 'Comentario registrado exitosamente', comment_id: result.insertId });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const fetchComments = async(req, res) =>{
    const {post_id} = req.params;

    try {
        const comments = await getCommentsByPost(post_id);
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }


}