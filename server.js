var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('mongodb://todolist:pewen1@ds015584.mlab.com:15584/todo-test?authMechanism=SCRAM-SHA-1');

app.use(express.static(__dirname + ''));
app.use(bodyParser.json());


app.get('/list', function(req, res){
    console.log('entrei na lista');

    db.collection('reminders').find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post('/list-item-add', function(req, res){
    console.log(req.body);
    db.collection('reminders').insert(req.body.params, function(err, doc){
        res.json(doc);
    });
});

app.delete('/list-item-remove/:id', function(req, res){
    var id = req.params.id;
    db.collection('reminders').remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });

});
//
// app.get('/detalhesContato/:id', function(req, res){
//     var id = req.params.id;
//     console.log(id);
//     contatos.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
//         res.json(doc);
//
//     });
// });
//
app.put('/list-item-edit/:id', function(req, res){
    var id = req.params.id;
    db.collection('reminders').findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {text: req.body.params.text}},
        new: true}, function(err, doc){
        res.json(doc);
        console.log('edit Complete!');
    });
});

app.listen(3000);


console.log('server running on port 3000');
