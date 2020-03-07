const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var nodemailer = require('nodemailer');
const {User} = require('../db/models/user.model');


router.post('/register', (req,res)=>{
  
let name = req.body.name.toUpperCase();
let email = req.body.email;
let department = req.body.department;
let rollno = (req.body.rollno).toUpperCase();
let phoneno = req.body.phoneno;
//let thiranId = req.body.thiranId;

       
let newUser = new User({
    name, email, rollno, department, phoneno
});

newUser.save().then((data)=>{
    res.json({success:true, message:"Registered Successfully "});
    
   
}).catch((err) =>
{
    res.json({success:false, message:"Could Not Save User ",err});
})



});

router.post('/existuser',(req,res)=>{
  User.count({'email':req.body.email}).then((cnt)=>{
    res.send({count: cnt});
  }).catch((err)=>{
    console.log(err);
  });  
});

router.post('/existphone', (req, res) => {
  User.count({ 'phoneno': req.body.phoneno }).then((cnt) => {
    res.send({count: cnt});
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/existrollno',(req,res)=>{
  User.count({ 'rollno':req.body.rollno }).then((cnt)=>{
    res.send({count: cnt});
  }).catch((err)=>{
    console.log(err);
  });  
});





module.exports= router;
