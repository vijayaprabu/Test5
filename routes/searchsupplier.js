var express = require('express');
var router = express.Router();
var fs = require('fs');

//var cassandra = require('cassandra-driver');
//var contactPoints = ['cassandra.us-east-2.amazonaws.com:9142'];
//var authProvider = new cassandra.auth.PlainTextAuthProvider('Sin-Rou_Chen-at-299196734494', 'bafkYpBEJ51qM/FOU+jrjBmNoX57l5W0hHwGOpzXTB8=')
//var port = 4002;
var app = express();
/*
var sslOptions = {
  cert: fs.readFileSync('AmazonRootCA1.pem'),
  host: 'cassandra.us-east-2.amazonaws.com',
  rejectUnauthorized: true
};

var client = new cassandra.Client({
  contactPoints: contactPoints, 
  authProvider: authProvider, 
  localDataCenter: 'us-east-2',
  sslOptions: sslOptions,});

async function connecttoDb() {
  var client = new cassandra.Client({
    contactPoints: contactPoints, 
    authProvider: authProvider, 
    localDataCenter: 'us-east-2',
    sslOptions: sslOptions,});
  await client.connect();
  console.log('Connected to MCS');
}

(async function start() {
  try {
    await connecttoDb();
    app.listen(port, () =>{
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());

*/

/* GET home page. */
router.get('/', function(req, res) {
    res.render('searchsupplier')
});

router.post('/',function(req,res){
    var name=req.body.supplier_name;
    res.redirect('/query/' + name);
});

module.exports = router;
