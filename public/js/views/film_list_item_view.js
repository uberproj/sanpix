var FilmListItemView = Backbone.View.extend({

    initialize: function(options) {
        this.model = options.model;
    },

    render: function() {
        var tags = this.model.get("tags").split("|").unique();
        var tagitems = [];

        for (tag in tags) {
            tagitems.push({tag: tags[tag]});
        }

        this.$el.html(App.film_item_template({
            title: this.model.get("title"),
            release_year: this.model.get("release_year"),
            tags: tagitems
        }));
        return this;
    },

    remove: function() {
        this.$el.html('');
    }
});
