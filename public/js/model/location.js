var FilmLocation = Backbone.Model.extend({
    idAttribute: 'id',
    
    initialize: function() {
    },
    
    url: function() {
        return "locations/" + this.id + ".json";
    },
    
    clear: function() {
    }
});
