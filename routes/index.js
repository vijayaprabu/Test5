var express = require('express');
var router = express.Router();
var fs = require('fs');
var cassandra = require('cassandra-driver');
var contactPoints = ['cassandra.us-east-2.amazonaws.com:9142'];
var authProvider = new cassandra.auth.PlainTextAuthProvider('Sin-Rou_Chen-at-299196734494', 'bafkYpBEJ51qM/FOU+jrjBmNoX57l5W0hHwGOpzXTB8=');
var app = express();

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

var getAllSuppliers = 'SELECT * FROM "CSCI_541_Project".suppliers';

/* GET home page. */
router.get('/', function(req, res, next) {
  client.execute(getAllSuppliers,[],function(err,result){
      if(err){
            res.status(404).send({msg: err});
      }
      else{
        console.log('result: $' + JSON.stringify(result.rows))
        res.render('index',{ title:'Inventory of Suppliers',
             datas: result.rows
        });
      }
  });
});

module.exports = router;
