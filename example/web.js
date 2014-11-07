var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');

var app = connect();

// some constants
var PORT = 9123;
var HOME_PAGE = 'example.html';

// start server
app.use(serveStatic('static', {index: [HOME_PAGE]}));
app.use(serveStatic('..', {index: false, extensions: ['css', 'js']}));
app.use(serveStatic('../bower_components', {index: false}));
app.listen(PORT);

// open browser
open('http://localhost:' + PORT + '/' + HOME_PAGE);
