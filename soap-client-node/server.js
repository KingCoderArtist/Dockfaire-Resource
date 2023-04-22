const express = require('express');
const bodyParsers = require('body-parser');
const PSIXDataRouter = require('./routes/PSIXData')
var app = express();

app.use(bodyParsers.json());
app.use('/PSIXData',PSIXDataRouter);

app.listen(3000,(err) => {
    if(err){
        console.log('server startup dailed')
    }else {
        console.log('server started at port:'+3000)

    }
});

