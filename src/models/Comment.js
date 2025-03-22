import pool from "../config/database.js";

export const createComment = async(content, author,postId) => {
    try {
        const [results] = await pool.query(
            "INSERT INTO comments(content,username,post_id) VALUES (?,?,?)",[content,author,postId]
        );
        return results;
    } catch (error) {
        throw error;
    }
}

export const getCommentsByPost = async(post_id) => {
    try {
        const [results] = await pool.query("SELECT * FROM comments WHERE post_id = ? ORDER BY id DESC",[post_id]);
        return results;
    } catch (error) {
        throw error;
    }
}   