const express = require('express');
const server = express();

const UsersRouter = require('../resources/users/users-router')





server.get('/', (req, res) =>{
    res.send('<h1>Using the Users hashes for passes </h1>')
});

server.use('/api', UsersRouter);


module.exports = server;