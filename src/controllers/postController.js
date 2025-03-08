import { getAll, findById, create, update, remove, search } from '../models/Post.js';
import multer from 'multer';
import path from 'path';

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Renombrar la imagen con timestamp
    }
});
const upload = multer({ storage });

// Obtener todos los posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await getAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts', error });
    }
};

// Obtener un post por ID
export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el post', error });
    }
};

// Crear un nuevo post con imagen
export const createPost = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al subir la imagen', error: err });
        }

        const { title, content, user_id, category_id } = req.body;
        const image = req.file ? req.file.filename : null; // Si hay imagen, guardar el nombre del archivo

        if (!title || !content || !user_id || !category_id) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        try {
            const newPost = await create(title, content, image, user_id, category_id);
            res.status(201).json({ message: 'Post creado exitosamente', postId: newPost });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el post', error });
        }
    });
};

// Actualizar un post (con opción de cambiar imagen)
export const updatePost = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al subir la imagen', error: err });
        }

        const { id } = req.params;
        const { title, content, user_id, category_id } = req.body;
        const image = req.file ? req.file.filename : req.body.image; // Mantener la imagen original si no se sube una nueva

        if (!title || !content || !user_id || !category_id) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        try {
            const updatedPost = await update(id, title, content, image, user_id, category_id);
            if (updatedPost.affectedRows === 0) {
                return res.status(404).json({ message: 'Post no encontrado' });
            }
            res.status(200).json({ message: 'Post actualizado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el post', error });
        }
    });
};

// Eliminar un post (soft delete)
export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await remove(id);
        if (deletedPost.affectedRows === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({ message: 'Post eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post', error });
    }
};

// Buscar posts por título o contenido
export const searchPost = async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ message: 'El término de búsqueda es obligatorio' });
    }

    try {
        const results = await search(keyword);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron posts' });
        }
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar posts', error });
    }
};
