var FilmLocationListView = Backbone.View.extend({

    initialize: function(options) {
        map = options.map;
        google.maps.event.addListener(map, "idle", function() {
            if (this.isMapDragging) {
                this.idleSkipped = true;
                return;
            }
            this.idleSkipped = false;
            this.respond_to_map_change();
        }.bind(this));
        google.maps.event.addListener(map, "dragstart", function() {
            this.isMapDragging = true;
        }.bind(this));
        google.maps.event.addListener(map, "dragend", function() {
            this.isMapDragging = false;
        }.bind(this));
        google.maps.event.addListener(map, "bounds_changed", function() {
            this.idleSkipped = false;
        }.bind(this));
      
        this.map = map;
        this.model.on('add', this.added_location, this);
        
        this.render();
    },

    respond_to_map_change : function() {
        var self = this;

        film_locations.remove_all();

        // refresh views
        film_locations.set_bounds(self.map.getBounds());
        film_locations.fetch().done(function() {
            self.model.each (self.added_location, self);
        });
    },

    added_location : function (location){
      var marker_view = new FilmLocationMarkerView({ model: location, map: this.map });
    },

    render: function() {
      this.model.each (this.added_location, this);
    }
});
