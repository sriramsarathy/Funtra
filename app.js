var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;
var publicPath = __dirname + '/public';
console.log(__dirname + '/public');
app.use(express.static(__dirname + '/public'));
// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/local", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
    
});

app.get('/', function (req, res) {
  res.sendFile('/login.html', {root: publicPath});
});

//app.get('/', function (req, res) {
//res.sendfile(__dirname + '/public/login.html', { root: __dirname + "/public/login.html" } );
//});

app.get('/hellosriram', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

   res.send(JSON.stringify({"hi":"Hello Sriram"}));
    //res.json({hi:hello});
});

app.get('/mySystem', function (req, res) { 
    var startup = db.collection("startup_log");
    startup.find({
        hostname:"INLM50874508A"
    }).toArray(function(error, documents) {
    if (error) throw error;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(documents));
});
});
app.get('/person', function (req, res) { 
    var startup = db.collection("Person");
    startup.find({
        name:req.query.name
    }).toArray(function(error, documents) {
    if (error) throw error;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(documents));
    });
});