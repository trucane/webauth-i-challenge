const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');



module.exports = {
    findUsers,
    findUserBy,
    registerUser,
    loginUser
}


function findUsers(){
    return db('users')
        .select('id', 'isLoggedIn', 'username')
    ;
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
    return db('users').insert({...data, isLoggedIn:0});
}

function loginUser(data, req){
    const {username , password} = data;
    return db('users').first()
    .where({username}).then(user =>{
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.username = username;
            return db('users').update({isLoggedIn:1}).where({username})
        }else{
            return null
        }
    })
}