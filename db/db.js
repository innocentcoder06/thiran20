const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://nanthsiva06:gopal26@taskmanager-ucdkw.mongodb.net/Thiran2020?retryWrites=true&w=majority', function(err){
    if(!err)
        console.log('DB Connected');
    else
        console.log('Error in DB Connection '+JSON.stringify(undefined,err,2));
});

module.exports= {mongoose};
