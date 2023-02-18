const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post('/register',async(req,res)=>{

   try {
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

     //creating an object of a user
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword,
    });

    //save new user and response
    const user = await newUser.save();
    res.status(200).json(user);

   } catch (error) {
    res.status(500).json(error);
   }
});

//LOG IN

router.post("/login",async(req,res)=>{
    try {
        //validation of email
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not found");

        //validation of password
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(404).json("Wrong Password");

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router