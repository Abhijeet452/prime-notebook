const express=require('express');
const router=express.Router();
const User = require('../models/User');



//Create a user using: post "/api/auth/"
router.post('/',(req,res) => {
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);
    // obj={
    //     name:"abhi",
    //     age:19
    // }
    // res.json(obj);
})
module.exports=router;