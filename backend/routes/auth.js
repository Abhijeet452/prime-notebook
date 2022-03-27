const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "sarthaksamarthsahilabhi";
const fetchuser=require('../Middleware/fetchuser');

//ROUTE 1:Create a user using: POST "/api/auth/"
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
  try {
    let user = await User.findOne({ email: req.body.email })
    // console.log(user);
    if (user) {
      return res.status(400).json({ error: "Sorry a user with same credentials already exists" })
    }
    const salt = await bcrypt.genSaltSync(10);
    let securedPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPass,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const AuthToken = jwt.sign(data, secret);
    res.json({ "Authtoken": AuthToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

  // console.log(AuthToken);
})
//ROUTE 2 Authenticate a user using POST:"/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  //  if there are errors return them and bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { email, password } = req.body;
    // check whether a user with same credentials already exists
    let user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Please login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(400).json({ error: "Please login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const AuthToken = jwt.sign(data, secret);
    res.json({ "Authtoken": AuthToken })
    // console.log(AuthToken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})


// ROUTE 3: Get loggedin user information using: POST "/api/auth/getuser". login required.
router.post('/getuser', fetchuser, async (req, res) => {
  //  if there are errors return them and bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    userID=req.user.id;
    const user = await User.findById(userID).select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})
  module.exports = router;