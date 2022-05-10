require('dotenv').config();
const express = require('express');
var http = require('http');
const app = express();
const port = process.env.PORT;
const routes = require("./router");
const cors = require('cors');

app.use(cors());
app.use(express.json());             
app.use('/api/v1',routes);

var httpServer = http.createServer(app);

httpServer.listen(port, ()=> {
    console.log('Alive at port ' + port + ' http');
    });

