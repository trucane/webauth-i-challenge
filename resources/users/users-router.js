const express = require('express');
router = express.Router();
router.use(express.json())

const restricted = require('../../auth/restricted-middleware')

const Users = require('./users-model');


router.get('/users', restricted, async (req,res) =>{

    try{
        const users = await Users.findUsers();
        if(users.length){
            res.status(200).json(users)
        }else{
            res.status(209).json({message:"Please add a user"})
        }
    }catch(error){
        res.status(500).json(error)
    }
    Users.get()
});


router.get('/:id', async (req,res) =>{
    const {id} = req.params;

    try{
        const user = await Users.findUserBy(id);
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(error)
    }
})

router.post('/register', async (req, res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        res.status(206).json({message:"Missing name and/or password"})
    }else{
        try{
            const [id] = await Users.registerUser(req.body);
            const newUser = await Users.findUserBy(id)
            res.status(201).json(newUser)
        }catch(error){
            res.status(500).json(error)
        }
    }
});


router.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        res.status(206).json({message:"Missing name and/or password"})
    }else{
        try{
            const user = await Users.loginUser(req.body);
            if(user){
                res.status(201).json({message:"You have logged in"})
            }else{
                res.status(400).json({message:"invalid username and/or passowrd"})
            }
        }catch(error){
            res.status(500).json(error)
        }
    }
});

module.exports = router;


