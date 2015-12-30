var express = require("express");

var app = express();
app.use(express.static(__dirname)); //use static files in ROOT/public folder

app.get("/", function(request, response){ //root dir
    res.render('index.html');
});

app.listen('8082', "localhost");