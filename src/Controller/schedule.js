const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


let server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors()); 

server.listen(3000, function() {
    console.log('Server Listen at http://localhost:3000');
});