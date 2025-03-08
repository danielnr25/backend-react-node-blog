import bcrypt from 'bcryptjs';

const password = "12345678";

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        if(err){
            throw err;
        } 

        console.log('Contraseña encriptada:',hash);

    })
})