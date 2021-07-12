const express = require('express');
const mongoose = require('mongoose');
const app = express();
const data = require("./routes/data")
require('./crawler/crawler')

let normalizePort = (val)=> {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;

    }
    return false;
}



let port = normalizePort(process.env.PORT || '3000');

app.listen(port)
console.log('listening on port '+port);
console.log("domain:"+ process.env.svDomain);
setInterval(getPrices,  0.5 * 1000)

app.use(express.json());
app.use('/price', data);

