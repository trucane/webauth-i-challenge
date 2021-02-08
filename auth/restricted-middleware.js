

const jwt = require('jsonwebtoken');
const secrets = require('../data/config/secrets');




//restricted with jwt
module.exports = function restricted (req, res, next){

    const token = req.headers.authorization;
    
    if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json({message:"no entry"})
            }else{
                req.jwtToken = decodedToken;
                next();
            }
        });
    }else{
        
        res.status(401).json({message:"no token provided"})
            
    }
}


//restricted with sessions
// module.exports = function restricted (req, res, next){
//     if(req.session && req.session.username){
//         next()
//     }else{
        
//         res.status(401).json({message:"Please log in"})
            
//     }
// }