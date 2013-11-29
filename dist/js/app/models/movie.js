define("models/movie", [], function () {


    return Backbone.Model.extend({

        idAttribute: "id",

        urlRoot: "/movie"

    });


});
