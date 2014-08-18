var film_locations = new FilmLocationList();

var AppView = Backbone.View.extend({

    el: $("#searchbox"),

    initialize: function() {
        var self = this;

        self.main = $('#main');
        self.map_controls = $('#map_controls');
        self.map_canvas = $('#map_canvas');
        self.header = $('header');
        self.locations_holder = $('#locations_holder');

        var source = $("#film-item-template").html();
        self.film_item_template = Handlebars.compile(source);

        //initialize map
        self.initialize_map();

        self.header.css({top:'-1000px'});
        self.header.animate({top: '0px'}, 1500);

        //self.map_controls.fadeIn();
        setTimeout(function(){
            self.map_controls.fadeIn();
        }, 1000);

        self.film_location_list_view = new FilmLocationListView({model: film_locations, map: self.map});

        $("#search_film").on("keydown", this.filter_film);
    },

    events: {
        "click #btn_find_me": "find_me"
    },

    initialize_map : function(){
        var center = new google.maps.LatLng(37.7588, -122.4147242);
        var styles = [
            {
                elementType: "geometry",
                stylers: [
                    { lightness: 33 },
                    { saturation: -90 }
                ]
            }
        ];
        
        var mapOptions = {
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center,
            styles: styles,
	        panControl: false,
	        zoomControl: true,
	        zoomControlOptions: {
	            position: google.maps.ControlPosition.LEFT_CENTER
	        },
            minZoom: 12
        };
        this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    },

    find_me: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.map.setCenter(initialLocation);
            }.bind(this));
        }
    },

    move_map: function(lat, lng) {
        this.map.setCenter(new google.maps.LatLng(lat, lng));
    }
    
});

Handlebars.registerHelper('list', function(items, options) {
    var out = "";
    for(var i=0, l=items.length; i<l; i++) {
        out = out + options.fn(items[i]);
    }
    return out;
});

Array.prototype.unique = function() {
    var a = [];
    for (var i=0, l=this.length; i<l; i++)
        if (a.indexOf(this[i]) === -1)
            a.push(this[i]);
    return a;
}

var App = null;
$(function(){
    App = new AppView();
});
