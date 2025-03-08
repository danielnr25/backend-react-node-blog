import pool from '../config/database.js';


export const getAll = async () => {
   try{
    const [results] = await pool.query("SELECT id,name,description FROM categories WHERE deleted_at IS NULL");
    return results;
   }catch (error){
    throw error;
   }
}

export const create = async(name,description) => {
    try{
       const [results] = await pool.query("INSERT INTO categories (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",[name,description]) 
       return results;
    }catch (error){
        throw error;
    }
}

export const update = async (id, name, description) => {
    try {
        const [results] = await pool.query("UPDATE categories SET name = ?, description = ?, updated_at = NOW() WHERE id = ?", [name, description, id]);
        return results;
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) =>{
    try {
        const [results] = await pool.query("UPDATE categories SET deleted_at = NOW() WHERE id = ?",[id]);
        return results;
    } catch (error) {
        throw error;
    }
}