import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename =fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.join(__dirname,'../uploads'))
    },
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null,uniqueName);
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB máximo
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|webp/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error('Solo se permiten imágenes en formato JPG, JPEG o PNG'));
    }
});
  