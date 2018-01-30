var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

 
var dbOperations = require("./dbOperations.js");
var logFmt = require("logfmt");

app.set('views', __dirname + '/views') ;
 

app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );

app.get('/workorder' , function(req,res) {  
    res.sendfile('views/redirect.html');     
/*
    console.log(JSON.stringify(req.headers)); //to see all headers that heroku adds
    if(req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
      res.redirect("https://" + req.headers.host + "/workorder");
    }
    else {
      //the rest of your logic to handle this route
    }*/
});

app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});

app.get('/db/getProductList', function(req,res){
    dbOperations.getProductList(req,res);
});

app.get('/db/addRecord', function(req,res){
    dbOperations.addRecord(req,res);
});

app.get('/db/delRecord', function(req,res){
    dbOperations.delRecord(req,res);
});

app.get('/db/createTable', function(req,res){
    dbOperations.createTable(req,res);
});

app.get('/db/dropTable', function(req,res){
    dbOperations.dropTable(req,res);
}); 

app.get('/db/updateRecord', function(req,res){
    dbOperations.updateRecords(req,res);
});

app.get('/db/Search', function(req,res){
    dbOperations.Search(req,res);
});

app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});