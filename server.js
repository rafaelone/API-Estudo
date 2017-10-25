var express = require('express');

var mongodb = require('mongodb');

var bodyParser = require('body-parser');

var objectID = require('mongodb').objectID;

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

var port = 8080;

app.listen(port);

console.log('Servidor HTTP na porta: ' +port);

app.get('/', (req, res) => {
    res.send({msg: 'ola'});
});

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost', 27017, {}),
    {}
);
//post
app.post('/api', (req, res) => {
    var dados = req.body;
        db.open(function(err, mongoclient){
            mongoclient.collection("postagens", function (err, collection){
                collection.insert(dados, function(err, records){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(records);
                    }
                    mongoclient.close();
                });
            });
        });
});
//get
app.get('/api', (req, res) => {
    var dados = req.body;
        db.open(function(err, mongoclient){
            mongoclient.collection("postagens", function (err, collection){
                collection.find().toArray(function(err, results){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(results);
                    }
                    mongoclient.close();
                });
            });
        });
});

//get by id

app.get('/api/:id', (req, res) => {
    var dados = req.body;
        db.open(function(err, mongoclient){
            mongoclient.collection("postagens", function (err, collection){
                collection.find(req.params.id).toArray(function(err, results){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(results);
                    }
                    mongoclient.close();
                });
            });
        });
});

