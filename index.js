const express = require('express');
const mongoose = require('./db/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
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

app.listen(port, function()
{
    console.log(`Server Running at Port ${port}`);
});

const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

app.get('/',(req,res)=>{
    res.send('<h1>Hello world!</h1>');
});

