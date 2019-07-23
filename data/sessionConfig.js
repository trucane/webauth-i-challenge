const session = require('express-session')
const cors = require('cors');
const knexSessionStore = require('connect-session-knex')(session);
const database = require('../data/dbConfig')


module.exports = server => {
    const sessionConfig = {
        name: 'honolulu',
        secret:'keep em guessing, keep it hidden!',
        cookie:{
            maxAge:100 * 60 * 10,
            secure:false, //true in production
            httpOnly:true, //cannnot be accessed by js
        },
        resave: false,
        saveUninitialized:false, //GDPR compliance, cannot save cookies without permission
    
        //install connect-session-knex
        store: new knexSessionStore({
            knex:database,
            tablename:'sessions',
            createtable:true,
            sidfieldname:'sid',
            clearInterval:1000 * 60 *60, //deletes all expired sessions in db every hour
    
        })
    };


    server.use(session(sessionConfig));
    server.use(cors())
}