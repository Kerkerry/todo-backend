import Connection from "../models/db_connection.js"
import { expressjwt } from "express-jwt";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// https://www.npmjs.com/package/express-jwt

const SECRET_KEY='todo-app-user-secret-key'

const signup=(req,res)=>{
    const saltRounds = 10;
    const {username,upassword}=req.body;
    const sql=`INSERT INTO users(id,username,password)
            VALUES(?,?,?)`;
    const userid=Date.now().toString();
    bcrypt.hash(upassword, saltRounds, function(err, hash) {
        
        Connection.query(
            sql,
            [userid,username,hash],
            (err,result)=>{
                if(err){
                    console.error(`Error occured creating user: ${err}`);
                    res.status(500).json(err)
                }else{
                    console.log(`Successfully created the user: ${result}`);
                    res.status(201).json(result)
                }
            }
        )
    });
}

const signin=(req,res)=>{
    const {username,upassword}=req.body
    const sqlQuery=`SELECT * FROM users WHERE username=?`
    Connection.query(
        sqlQuery,
        [username],
        (err,result)=>{
            if(err){
                console.error(err);
                res.status(500).json(err);
            }else{
                const userNotFound=result.length===0;
                if(userNotFound){
                    res.status(404).json(`User not found`);
                }else{
                    const {id,username,password}=result[0]
                    bcrypt.compare(upassword, password, function(err, result) {
                        if(err){
                            res.status(500).json(err);
                        }else{
                            if(result){
                                const user={userid:id,username:username}
                                res.status(200).json(user)
                            }else{
                                res.status(500).json(`Wrong password`)
                            }
                        }
                    });
                }
            }
        }
    )
}

export default {
    signup,
    signin
}