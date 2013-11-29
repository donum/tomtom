var express = require('express');

var MDB = require('./app/mdb.js');

var app = express();

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({secret: 'mySecret'}));
//app.use(express.logger());


// serve static files
//app.use('/js/app', express.static(__dirname + '/src/app'));
app.use('/js', express.static(__dirname + '/dist/js'));
app.use('/style', express.static(__dirname + '/dist/style'));
app.use('/font', express.static(__dirname + '/dist/font'));
app.use('/img', express.static(__dirname + '/dist/img'));

app.get('/', MDB.login);

app.post('/login', MDB.processLogin);

app.get('/logout', MDB.logout);

app.get('/mdb', MDB.checkAuth, MDB.mdb);

app.post('/movie', MDB.checkAuth, MDB.addMovie);

app.delete('/movie/:id', MDB.checkAuth, MDB.deleteMovie);

app.put('/movie/:id', MDB.checkAuth, MDB.updateMovie);

app.listen(8080);