const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./src/routes.js');
const http = require('http');

const app = express();

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes.forApp(app);

const port = 3000;
server = http.createServer(app);
server.listen(port);

console.log(`\nServer started on port ${port}\n`);

// https://stackoverflow.com/questions/23258421/how-to-stop-app-that-node-js-express-npm-start
const io = require('socket.io')(server);
io.on('connection', (socketServer) => {
  socketServer.on('npmStop', () => {
    process.exit(0);
  });
});

module.exports = app;
