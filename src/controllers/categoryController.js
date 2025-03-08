import { create, getAll, remove, update } from "../models/Category.js";

export const getAllCategories = async(req, res) => {
    try{
        const categories = await getAll();
        res.status(200).json(categories)
    }catch (error){
        res.status(500).json({message: "Error al obtener las categorias", error})
    }
}

export const createCategory = async (req,res) => {
    const {name,description} = req.body;
    if(!name || !description){
        return res.status(400).json({message: 'Nombre y descripción son obligatorios'})
    }

    try{
        const newCategory = await create(name, description);
        res.status(201).json({message:'Categoría creada exitosamente',newCategory});
    }catch (error){
        res.status(500).json({message:"Error al crear la categoria",error});
    }
}

export const updateCategory = async(req,res)=>{
    const {id} = req.params;
    const {name,description} = req.body;
    if(!name || !description){
        return res.status(400).json({message: 'Nombre y descripción son obligatorios'})
    }

    try{
        const updatedCategory = await update(id,name,description);
        if(updatedCategory.affectedRows===0){
            return res.status(400).json({message: 'Categoria no encontrada'});
        }   

        res.status(200).json({message:'Categoría actualizada exitosamente',updatedCategory});

    }catch (error){
        res.status(500).json({message:"Error al actualizar la categoria",error});
    }

}

export const deleteCategory = async(req, res) =>{
    const {id} = req.params;
    try {
        const deletedCategory = await remove(id);
        if(deletedCategory.affectedRows === 0){
            return res.status(404).json({message: 'Categoria no encontrada'});
        }
        res.status(200).json({message:"Categoría eliminada exitosamente"});

    } catch (error) {
        res.status(500).json({message: "Error al eliminar la categoria",error});
    }
} 
