var express = require('express');
var router = express.Router();
var fs = require('fs');

var app = express();

router.get('/',function(req,res,next){
    res.render('home',{ title:'Home Page'
             
        });
});

module.exports  = router;