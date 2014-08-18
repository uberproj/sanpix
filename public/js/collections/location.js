var FilmLocationList = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: FilmLocation,
    
    add_new: function(film_location){
        this.create(film_location);
    },

    set_bounds: function(bounds) {
        this.bounds = bounds;
    },
    
    url: function() {
        var bounds = this.bounds;
        return "/locations.json?bounds=" + bounds.toUrlValue();
    },
    
    // Films are sorted by their title
    comparator: function(film_location) {
        return film_location.get('address');
    },
    
    remove_all: function (){
        var model;
        while (model = this.pop()){
            this.remove(model);
        }
    }
});
