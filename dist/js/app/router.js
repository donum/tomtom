define(["app", "models/movie", "views/movie", "models/movies", "views/movies"],
    function (app, ModelsMovie, ViewsMovie, ModelsMovies, ViewsMovies) {
    var Router = Backbone.Router.extend({

        routes: {
            "": "index"
        },

        index: function () {
            var collection = new ModelsMovies();
            collection.reset(data);

            var collectionView = new ViewsMovies({model: collection});
            collectionView.render();
        }

    });

    return Router;
});