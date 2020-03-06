const mongoose = require ('mongoose');

var nodemailer = require('nodemailer');

let emailLengthChecker = (email)=>{
    if(!email)
    {
         return false;
    }
    else
    {
         if(email.length<5 || email.length >30 )
              return false;
         else
              return true;
    }
}

let validEmailChecker = (email)=>{
    if(!email)
    {
         return false;   
    }
    else
    {
         const regExp = new RegExp( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
         return regExp.test(email);
    }
}
const emailValidators = [
    {
         validator:emailLengthChecker,
          message : 'E-Mail must be atleast 5 characters long but no more than 30'
    },
    {
         validator:validEmailChecker,
         message:"must provide a valid email"
    }
]


const  userScheama = new mongoose.Schema({
    name : {type : String, required:true},
    email : {type : String, required:true , unique:true, lowercase:true, validate : emailValidators},
    rollno: {type : String, required : true , unique : true},
    department : {type : String, required : true},
    phoneno : {type : Number, required : true,unique : true, minlength : 10, maxlength : 10},
    thiranId : {type : String , unique : true}
});

userScheama.pre('save',function(next){
    let user = this;
  //let count=mongoose.connection.db.collection(user);
  User.count({}).then((cnt)=> {
       return cnt;
  }).then((cnt) => {
     let id = (("20TH")+(101 + cnt)).toUpperCase();
     user.thiranId = id;  
     const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,  //true for 465 port, false for other ports
          auth: {
            user: 'teamthiran2020@gmail.com',
            pass: 'thiran2020'
          }
        });
      
        const mailOptions = {
          from: 'teamthiran2020@gmail.com', // sender address
          to: user.email, // list of receivers
          subject: 'THIRAN 2020', // Subject line
          text: 'Hey guyz i have found the way to send email for our thiran', // plain text body
          html: 'Hey '+user.name+', Thanks for registering in THIRAN 2020. <br>We are hoping that we will see you in our events. <br> Kindly Check our website <a href="http://psgthiran.in">psgthiran.in</a> for further details.<br><br>Your THIRAN ID : <b>'+user.thiranId+'</b>' // html body
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               console.log(error);
               //  res.status(400).send(error);
          } else {
               console.log('Success');
               // res.status(200).send(info);
          }
        });
        next();
  })
  /*console.log(count);
  //cnt=count(mongoose.connection.db, 'users');
    let id=("20TH")+count.toUpperCase();
    user.thiranId = id;
    const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 465,
     secure: true,  //true for 465 port, false for other ports
     auth: {
       user: 'teamthiran2020@gmail.com',
       pass: 'thiran2020'
     }
   });
 
   const mailOptions = {
     from: 'teamthiran2020@gmail.com', // sender address
     to: user.email, // list of receivers
     subject: 'THIRAN 2020', // Subject line
     text: 'Hey guyz i have found the way to send email for our thiran', // plain text body
     html: 'Hey '+user.name+', Thanks for registering in THIRAN 2020. <br>We are hoping that we will see you in our events. <br> Kindly Check our <a href="http://psgthiran.in/thiran20">Website</a> for further details.<br><br>Your THIRAN ID : <b>'+user.thiranId+'</b>' // html body
   };
 
   transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
          console.log(error);
          //  res.status(400).send(error);
     } else {
          console.log('Success');
          // res.status(200).send(info);
     }
   });

 
    
//     let transporter = nodemailer.createTransport({
//          service : 'gmail',
//          secure : false,
//          port : 3000,
//          auth : {
//               user : 'sherlockbinary@gmail.com',
//               pass : 'ramu123@'
//          },
//          tls :{
//               rejectUnauthorized : false
//          } 
//     })

//     let mailOptions = {
//          from : 'dhanumca3748@gmail.com',
//          to : 'nanthsiva06@gmail.com',
//          subject : 'Test Mail',
//          text : 'Waathaa',

//     }

//     transporter.sendMail(mailOptions,(err,info)=>{
//          if(err)
//           console.log('Error '+err)
//           else
//           {
//                console.log('Mail Sent Successfully'+info);
//                next();
//           }
              
//     })
next();*/
    
});

/*let getCount=()=>{
     return User.count({}).then((cnt)=>{
          return cnt;
     }).then((cnt)=>{
          return cnt;
     })
}*/

const User = mongoose.model('User', userScheama);

module.exports={ User };