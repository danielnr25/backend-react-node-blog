import pool from "../config/database.js";

export const getAll = async () => {
    try {
        const [results] = await pool.query(
            "SELECT p.id, p.title, p.content, p.image, p.user_id, p.category_id, users.username AS author, categories.name AS category FROM `posts` p LEFT JOIN users ON p.user_id = users.id LEFT JOIN categories ON p.category_id = categories.id WHERE p.deleted_at IS NULL"
        );
        return results;
    } catch (error) {
        throw error;
    }
};

export const findById = async (id) => {
    try {
        const [results] = await pool.query(
            "SELECT id, title, content, image, user_id, category_id, created_at, updated_at FROM `posts` WHERE id = ? AND deleted_at IS NULL",
            [id]
        );
        return results[0]; // Devolver solo un post
    } catch (error) {
        throw error;
    }
};

export const create = async (title, content, image, user_id, category_id) => {
    try {
        const [results] = await pool.query(
            "INSERT INTO posts (title, content, image, user_id, category_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
            [title, content, image, user_id, category_id]
        );
        return results.insertId; // Devolver el ID del post creado
    } catch (error) {
        throw error;
    }
};

export const update = async (id, title, content, image, user_id, category_id) => {
    try {
        const [results] = await pool.query(
            "UPDATE posts SET title = ?, content = ?, image = ?, user_id = ?, category_id = ?, updated_at = NOW() WHERE id = ?",
            [title, content, image, user_id, category_id, id]
        );
        return results;
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    try {
        const [results] = await pool.query(
            "UPDATE posts SET deleted_at = NOW() WHERE id = ?",
            [id]
        );
        return results;
    } catch (error) {
        throw error;
    }
};

export const search = async (keyword) => {
    try {
        const [results] = await pool.query(
            "SELECT id, title, content, image, user_id, category_id FROM `posts` WHERE (title LIKE ? OR content LIKE ?) AND deleted_at IS NULL",
            [`%${keyword}%`, `%${keyword}%`]
        );
        return results;
    } catch (error) {
        throw error;
    }
};
