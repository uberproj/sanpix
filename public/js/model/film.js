var Film = Backbone.Model.extend({
    idAttribute: 'id',
    
    url: function() {
        return "/films/" + this.id + ".json";
    },
    
    clear: function() {
    }
});
