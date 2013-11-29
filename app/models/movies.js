var fs = require('fs');

module.exports = {
    getMovies: function (user) {

        var movies = [];

        var movieLines = fs.readFileSync('db/movies.txt', 'utf-8').split('\n');

        var allRatings = this.getRatings();
        var ratings = this.getRatingsForUser(user, allRatings);

        for (var i = 0; i < movieLines.length; i++) {
            var line = movieLines[i].split(';');

            if (!line[0]) {
                continue;
            }

            var movie = {
                'id': line[0].trim(),
                'name': line[1].trim(),
                'year': line[2].trim(),
                'genre': line[3].trim(),
                'rating': ''
            };
            if (ratings[line[0]]) {
                movie.rating = ratings[line[0]];
            }
            movies.push(movie);
        }
        return movies;
    },

    getRatings: function () {
        var ratings = [];

        var ratingLines = fs.readFileSync('db/ratings.txt', 'utf-8').split('\n');

        for (var i = 0;i < ratingLines.length; i++) {
            var line = ratingLines[i].split(';');

            if (!line[0]) {
                continue;
            }

            ratings.push({
                'user': line[0].trim(),
                'movie': line[1].trim(),
                'rating': line[2].trim()
            });
        }
        return ratings;
    },

    getRatingsForUser: function (user, ratings) {
        var result = {};
        for (var i = 0; i < ratings.length; i++) {
            var rating = ratings[i];

            if (rating.user === user) {
                result[rating.movie] = rating.rating;
            }
        }
        return result;
    },

    getNewId: function (movies) {
        var maxId = 0;

        for (var i = 0; i < movies.length; i++) {
            if (movies[i].id > maxId) {
                maxId = movies[i].id;
            }
        }
        return parseInt(maxId) + 1;
    },

    addMovie: function (name, year, genre) {
        var movies = this.getMovies();

        var id = this.getNewId(movies);

        for (var i = 0; i < movies.length; i++) {
            delete movies[i].rating;
        }

        movies.push({
            'id': id,
            'name': name,
            'year': year,
            'genre': genre
        });

        fs.writeFile('db/movies.txt', this.flatten(movies));

        return id;
    },

    flatten: function (data) {
        var result = [];
        var line = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                line.push(data[i][key]);
            }
            result.push(line.join(';'));
            line = [];
        }
        return result.join('\n');
    },

    updateMovie: function (user, id, name, year, genre, rating) {

        var movies = this.getMovies();

        for (var i = 0; i < movies.length; i++) {
            delete movies[i].rating;
            if (movies[i].id === id) {
                movies[i].id = id;
                movies[i].name = name;
                movies[i].year = year;
                movies[i].genre = genre;
            }
        }

        fs.writeFile('db/movies.txt', this.flatten(movies));

        this.updateRating(user, id, rating);
    },

    updateRating: function (user, movie, rating) {
        if (rating === '') {
            return;
        }
        var ratings = this.getRatings();

        var match = false;

        for (var i = 0; i < ratings.length; i++) {
            if (ratings[i].user === user && parseInt(ratings[i].movie) === parseInt(movie)) {
                ratings[i].rating = rating;
                match = true;
            }
        }

        if (!match) {
            ratings.push({
                'user': user,
                'movie': movie,
                'rating': rating
            });
        }

        fs.writeFile('db/ratings.txt', this.flatten(ratings));
    },

    deleteMovie: function (movie) {
        var movies = this.getMovies();

        for (var i = 0; i < movies.length; i++) {
            delete movies[i].rating;
            if (movies[i].id === movie) {
                delete movies[i];
            }
        }

        fs.writeFile('db/movies.txt', this.flatten(movies));

        this.deleteRating(movie);
    },

    deleteRating: function (movie) {
        var ratings = this.getRatings();

        for (var i = 0; i < ratings.length; i++) {
            if (parseInt(ratings[i].movie) === parseInt(movie)) {
                delete ratings[i];
            }
        }

        fs.writeFile('db/ratings.txt', this.flatten(ratings));
    }
}
