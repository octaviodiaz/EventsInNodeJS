var express= require("express");
var app = express();

var port  =  process.env.PORT || 3000;
var eventRouter  = require('./src/routes/eventRoutes');
var dbRouter  = require('./src/routes/dbroutes');

app.use(express.static('public'));
//app.use(express.static('src/views'));
app.use(express.static('bower_components'));


app.set('views', './src/views');
app.set('view engine' , 'ejs');


app.use('/Events', eventRouter);
app.use('/Db' , dbRouter);

app.get('/', function (request, response){
    //response.send('Hello world');
    response.render('index' , {
        list:[1,2,5],
        nav : [ {link : 'Services' ,text : 'Services' },
                {link : 'Portfolio' ,text : 'Portfolio' },
                {link : 'About' ,text : 'About' },
                {link : 'Team' ,text : 'Team' },
                {link : 'Contact' ,text : 'Contact' },
                {link : 'Events' ,text : 'Events' }]
    });
});

app.get('/routing' , function (request ,response){
   response.send('Hello world routing');
});

app.listen (port , function (error){
   console.log("listening from port " + port); 
});
