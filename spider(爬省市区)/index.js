const express = require('express');
const path = require('path');
const app = express();
let routes = require("./router")
var ejs = require('ejs');


app.use(routes)
app.engine('html', ejs.__express);
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'html');
app.listen(3000, function () {
    console.log('app is listening at port 3000');
});