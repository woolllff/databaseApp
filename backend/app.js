const express = require('express');
const os = require('os');
const path = require("path");




const app = express();              //Instantiate an express app,
const port = 5050;                  // the port number where server will be listening


app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});

});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
