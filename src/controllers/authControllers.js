import connection from "../database/db.js";
import bcrypt from 'bcrypt'

export async function postSignUp(req, res){
    const {name, email, password} = req.user;

    const passwordHash = bcrypt.hashSync(password,10)

    try{
        await connection.query(`INSERT INTO users (name, email, password) 
        VALUES($1,$2,$3)`,[name, email, passwordHash]);
        res.send(200);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}