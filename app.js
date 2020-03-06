const express = require('express');
const mongoose = require('./db/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app= express();

app.use(bodyParser.json());
app.use(cors({
    origin : '*'
 }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, x-access-token, x-refresh-token, Content-Type, Accept, _id");
    res.header("Access-Control-Expose-Headers", "x-access-token, x-refresh-token");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.listen(3000, '0.0.0.0', function()
{
    console.log('Server Running at Port 3000');
});

const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

app.get('/',(req,res)=>{
    res.send('<h1>Oombu da dei</h1>');
});

