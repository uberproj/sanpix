var FilmList = Backbone.Collection.extend({
    model: Film,

    initialize: function(options) {
        this.location_id = options.location_id;
    },

    url: function() {
        return "/films.json?location_id=" + this.location_id;
    },
    
    comparator: function(film) {
        return film.get('title');
    },
    
    remove_all: function (){
        var model;
        while (model = this.pop()){
            this.remove(model);
        }
    }
});
