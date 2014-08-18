var FilmListView = Backbone.View.extend({

    el:  $("#films_holder"),

    initialize: function(options) {
        this.model = options.model;
        this.list_container = $("#films_list_holder ul", this.$el);
    },
    
    events: {
        "click #btn_hide_films_info": "hide_films_list",
    },

    hide_films_list: function() {
        $("#films_holder").hide();
    },

    added_film: function(film) {
        var item_view = new FilmListItemView({ model: film });
        $(this.list_container).append(item_view.render().el);
    },

    render: function() {
        $(this.list_container).contents().remove();
        this.model.each(this.added_film, this);
    }
});
