define(['text!views/movies.html'], function (template) {
    return Backbone.View.extend({
        tagName: 'table',
        className: 'movieTable table table-striped table-hover',

        render: function () {
            this.$el.html(template);

            $('#main').append(this.$el);
        }
    });
})