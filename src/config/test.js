import pool from "./database.js";

const testConnection = async () =>{
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    } catch (error) {
        console.log("Error en la conexión a la base de datos",error.message);
    }
}

testConnection();