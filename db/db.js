const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Thiran', function(err){
    if(!err)
        console.log('DB Connected');
    else
        console.log('Error in DB Connection '+JSON.stringify(undefined,err,2));
});

module.exports= {mongoose};