const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



module.exports = {
    findUsers,
    findUserBy,
    registerUser,
    loginUser,
    updateUser
}


function findUsers(){
    return db('users')
        .select('id', 'isLoggedIn', 'username')
    ;
}

function findUserBy(filter){
    return db('users')
    .first()
    .where(filter)
    .select('id', 'isLoggedIn', 'username')
    .then(user =>{
        if(user){
            return user;
        }else{
            return null;
        }
    });
}

function registerUser(data){
    const hash = bcrypt.hashSync(data.password, 12);
    data.password = hash;
    return db('users').insert({...data, isLoggedIn:0});
}

function loginUser(data, req){
    const {username , password} = data;
    return findUserBy({username})
        .then(user =>{
            if(user && bcrypt.compareSync(password, user.password)){
                //const token = generateToken(user)
            // console.log('token', token)
                req.session.username = username;
                return db('users').update({isLoggedIn:1}).where({username})
            }else{
                return null
            }
        })
}

function updateUser (data, filter) {
    return db('users').update(data).where(filter);
}


function generateToken(user){
    const jwtPayload = {
        subject: user.id,
        username:user.username
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtOptions = {
        expiresIn:"1d"
    }
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}