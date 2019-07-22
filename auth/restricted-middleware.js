
const bcrypt = require('bcryptjs')
const db = require('../data/dbConfig');

module.exports = function restricted (req, res, next){
    const {username, password} = req.headers;
    if(!username && !password){
        res.status(400).json({message:"please provide username and/or password"})
    }else{
        db('users').first()
        .where({username})
            .then(user =>{
                    if(user && bcrypt.compareSync(password, user.password) && user.isLoggedIn){
                        res.status(200).json({message:`Welcome ${user.username}`})
                    }else{
                        res.status(401).json({message:"Invalid username and/or password"})
                    }
                }).catch(error =>{
                    res.status(500).json(error)
                })
    }
}