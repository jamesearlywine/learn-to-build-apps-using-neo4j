const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./src/routes.js');

const port = +process.argv[2];
process.title = process.argv[3];

const app = express();

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes.forApp(app);

app.listen(port);

console.log(`\nServer started on port ${port}\n`);

module.exports = app;
