var FilmLocationMarkerView = Backbone.View.extend({

    initialize: function(options) {
        var self = this;

        this.model = options.model;
        this.model.on('remove', this.remove, this);
        
        this.map = options.map;
        
        var lat = this.model.get("lat");
        var lng = this.model.get("lng");

        this.marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(lat, lng),
            title: this.model.get("address"),
            id : this.model.get("id")
        });
        
        this.marker.infowindow = new google.maps.InfoWindow({
            content: this.marker.title
        });

        this.films = new FilmList({ location_id: this.model.get("id") });
        this.film_list_view = new FilmListView({model: this.films});

        google.maps.event.addListener(this.marker, 'mouseover', function() {
            this.infowindow.open(this.map, this);
        });

        google.maps.event.addListener(this.marker, 'mouseout', function() {
            this.infowindow.close();
        });

        google.maps.event.addListener(this.marker, 'click', function() {
            
            this.marker.infowindow.close();

            this.films.fetch().done(function() {
                this.film_list_view.render();
                $("#films_holder").fadeIn();
            }.bind(this));
        }.bind(this));
    },

    render: function() { },

    remove : function(){
        this.marker.setMap(null);
        this.marker = null;
    }
});
