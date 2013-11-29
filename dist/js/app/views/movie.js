define(['text!views/movie.html'], function (template) {

    return Backbone.View.extend({
        tagName: 'tr',

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },

        render: function () {
            var data = {
                name: this.model.get('name'),
                year: this.model.get('year'),
                genre: this.model.get('genre')
            };

            this.$el.html(_.template(template, data));

            $('.movieTable tbody').append(this.$el);
        }
    });
});