import { findUserByUsername } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async(req,res) => {
    const {username, password} = req.body;
    //console.log(req.body);
    const user = await findUserByUsername(username);
    //console.log(user);
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({ message: "Credenciales incorrectas, verifique por favor" });
    }

    const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: "24h"});
    res.json({user,token})
}