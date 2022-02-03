const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret="sarthaksamarthsahilabhi"

//Create a user using: POST "/api/auth/"
router.post('/createuser', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 4 }),
  body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
  //  if there are errors return them and bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check whether a user with same credentials already exists
  let user = await User.findOne({ email: req.body.email })
  // console.log(user);
  if (user) {
    return res.status(400).json({ error: "Sorry a user with same credentials already exists" })
  }
  const salt = await bcrypt.genSaltSync(10);
  let securedPass=await bcrypt.hash(req.body.password, salt);
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: securedPass,
  })
  const data={
    user:{
      id:user.id
    }
  }
  const AuthToken = jwt.sign(data,secret);
  res.json(AuthToken)
  // console.log(AuthToken);
})
module.exports = router;