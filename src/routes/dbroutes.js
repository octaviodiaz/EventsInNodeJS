var express =  require('express');
var dbRouter = express.Router();
var mongodb = require('mongodb').MongoClient;



var eventsData  =  [
                {   name : 'Party of Michel Birthday',
                    description  : 'just another party',
                    date : '2016.01.01',
                    duration : '1 hour'
                } ,
                {   name : 'Sausage Party',
                    description  : 'An event with Seth Rogen!',
                    date : '2017.01.01',
                    duration : '2 hour'
                } ,
                 {   name : 'Michaels weeding',
                    description  : 'Finally I get married',
                    date : '2017.06.01',
                    duration : '4 hour'
                } 
    ];

dbRouter.route('/addEventData')
    .get(function (request,response){
        //response.send('Succesfull');    
        var url = 'mongodb://localhost:27017/eventsApp';
        mongodb.connect(url, function (err,db){
            var collection  =  db.collection('events'); //if the collection does not exist mongo will add it
            collection.insertMany(eventsData, function (err, results){
                response.send(results);
                db.close();
            });        
        });
    });

module.exports = dbRouter;