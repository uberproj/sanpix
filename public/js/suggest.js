var options;
jQuery(function() {
	$('#search_film').autocomplete({
        serviceUrl: '/films.json',
        onSelect: function(suggestion) {
            App.move_map(suggestion.data.location.lat, suggestion.data.location.lng);
        },
        transformResult: function(response) {
            response = JSON.parse(response);
            return {
                suggestions: $.map(response, function(item) {
                    return { value: item.title + "(" + item.location.address + ")", data: item };
                })
            };
        }
    });
}); 

