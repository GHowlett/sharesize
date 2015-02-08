var autocomplete = new google.maps.places.Autocomplete($('.searchbox input')[0], {types:['geocode']} );

$('.searchbox button').click(function(e){

	var place = autocomplete.getPlace();

	address = {
		street: '',
		city: '',
		state: '',
		zip: ''
	};

	// translates google places data to form data
	var addressForm = {
		street_number: 'street',
		route: 'street',
		locality: 'city',
		administrative_area_level_1: 'state',
		postal_code: 'zip',
	}

	// short vs long name config
	var componentForm = {
	  street_number: 'short_name',
	  route: 'long_name',
	  locality: 'long_name',
	  administrative_area_level_1: 'short_name',
	  postal_code: 'short_name',
	};

	for (var i= 0; i< place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		if (componentForm[addressType]) {
			var val = place.address_components[i][componentForm[addressType]];
			address[addressForm[addressType]] += (' ' + val);
		}
	}

	for (var component in address) 
		$('#hidden-form [name="address[' + component + ']"]').val(address[component].trim());

	$('.container').removeClass('show');
});

$('.searchbox button, .next-button').click(function(e){
	var nextContainer = $(this).parents('.container').eq(0).next();
	$('.container').removeClass('show');
	nextContainer.addClass('show');
});

// last input
$('.container-location .next-button').click(function(e){
	// TODO: render summary page
});

// dollar sign input field
function handleChange() {
var myValue = document.getElementById("income").value;

    if (myValue.indexOf("$") != 0)
    {
        myValue = "$" + myValue;
    }
    
    document.getElementById("income").value = myValue;

}