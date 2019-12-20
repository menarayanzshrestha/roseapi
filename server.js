const http = require('http');
const dotenv = require('dotenv').config();

const app = require('./app.js');

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port : ${port}`);
});


