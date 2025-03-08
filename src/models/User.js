import pool from '../config/database.js';

export const findUserByUsername = async (username) =>{
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ? AND deleted_at IS NULL",[username]);
    return rows[0];
}
