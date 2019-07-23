
const bcrypt = require('bcryptjs')
const db = require('../data/dbConfig');

module.exports = function restricted (req, res, next){
    if(req.session && req.session.username){
        next()
    }else{
        
        res.status(401).json({message:"Please log in"})
            
    }
}