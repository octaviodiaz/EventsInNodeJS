var express = require ('express');
var eventRouter =  express.Router();
var mongodb  =  require('mongodb').MongoClient;


eventRouter.route('/').get(function (request,response){
    // response.send('Events!');
        var url  =  'mongodb://localhost:27017/eventsApp';
        mongodb.connect(url , function (errr, db){
            var collection =  db.collection('events');  //addressing the collection
            collection.find({}).toArray(function (err,results){ //finding all events
                response.render('events' ,{
                nav : [ {link : 'Services' ,text : 'Services' },
                    {link : 'Portfolio' ,text : 'Portfolio' },
                    {link : 'About' ,text : 'About' },
                    {link : 'Team' ,text : 'Team' },
                    {link : 'Contact' ,text : 'Contact' },
                    {link : 'Events' ,text : 'Events' }
                ],
                events :results
            });
        });
        
    });
})

// eventRouter.route('/event').get(function (request,response){
//     response.send('Single Event!');
// })

eventRouter.route('/:id').get(function (request,response){
    var id  = request.params.id;
    response.render('event' ,{
        nav : [ {link : 'Services' ,text : 'Services' },
                {link : 'Portfolio' ,text : 'Portfolio' },
                {link : 'About' ,text : 'About' },
                {link : 'Team' ,text : 'Team' },
                {link : 'Contact' ,text : 'Contact' },
                {link : 'Events' ,text : 'Events' }],
        event :eventsData[id]
    });
});


module.exports = eventRouter;