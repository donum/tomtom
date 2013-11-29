var userModel = require('./models/users');
var movieModel = require('./models/movies');

var MDB = {
    checkAuth: function (req, res, next) {
        if (!req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    },

    login: function (req, res, next) {
        if (req.session.user) {
            res.redirect('/mdb');
        }

        res.end(require('fs').readFileSync('app/views/login.html', 'utf-8'));

        //res.render('login');
    },

    processLogin: function (req, res, next) {
        var authenticate = userModel.authenticate(req.body.username, req.body.password);

        if (authenticate) {
            req.session.user = req.body.username;
            res.redirect('/mdb');
        } else {
            res.redirect('/');
        }
    },

    logout: function (req, res, next) {
        delete req.session.user;
        res.redirect('/');
    },

    mdb: function (req, res, next) {
        var data = movieModel.getMovies(req.session.user);

        var template = require('fs').readFileSync('app/views/mdb.html', 'utf-8');

        template = template.replace('__data__', JSON.stringify(data));

        res.end(template);
    },

    addMovie: function (req, res, next) {
        var id = movieModel.addMovie(req.body.name, req.body.year, req.body.genre);

        res.end('{"id": ' + id + '}');
    },

    updateMovie: function (req, res) {
        movieModel.updateMovie(req.session.user, req.body.id, req.body.name, req.body.year, req.body.genre, req.body.rating);

        res.end('{"id": '+ req.params.id + '}');
    },

    deleteMovie: function (req, res) {
        movieModel.deleteMovie(req.params.id);

        res.end('{"id": '+ req.params.id + '}');
    }

};

module.exports = MDB;