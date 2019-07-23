const express = require('express');
const server = express();
const restricted = require('../auth/restricted-middleware')

const middleware = require('../data/sessionConfig')
const UsersRouter = require('./users/users-router')


middleware(server);





server.get('/', (req, res) =>{
    res.send('<h1>Using the Users hashes for passes </h1>')
});

server.use('/api', UsersRouter);
server.use('/api/restricted', restricted, UsersRouter);


module.exports = server;