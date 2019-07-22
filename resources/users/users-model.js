const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');



module.exports = {
    findUsers,
    findUserBy,
    registerUser,
    loginUser
}


function findUsers(){
    return db('users');
}

function findUserBy(id){
    return db('users')
    .first()
    .where({id}).then(user =>{
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
    return db('users').insert({...data, isLoggedIn:1});
}

function loginUser(data){
    const {username , password} = data;
    return db('users').first()
    .where({username}).then(user =>{
        if(user && bcrypt.compareSync(password, user.password)){
            return db('users').update({isLoggedIn:1}).where({username})
        }else{
            return null
        }
    })
}