define(["models/movie"], function (Movie) {

    return Backbone.Collection.extend({
        model: Movie
    });

});