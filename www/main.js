var autocomplete = new google.maps.places.Autocomplete($('.searchbox input')[0], {types:['geocode']} );

var address = {
	street: '',
	city: '',
	state: '',
	zip: ''
}; 

$('.searchbox button').click(function(e){

	var place = autocomplete.getPlace();

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


var score = 80
var renderScore = function() {
	$(".score-bar").data("score", score);
	$(".score-text strong").html(score + "%");
	$(".score-bar .left").css("width", score + "%");  
	$(".score-bar .right").css("width", (100 - score) + "%");  
}
$(function() {
	renderScore();
})

// last input
$('.container-location .next-button').click(function(e){
	// TODO: render summary page

/*

			<div class="score-bar" data-score="75">
					<div class="left"><span class="res-downsize">DOWNSIZE</span></div>
					<div class="right"><span class="res-share">SHARE</span></div>
				</div>
				<div class="score-text">Based on your answers, <strong>75%</strong> of people in your situation would downsize to a smaller home.</div>
				<a href="#"><p style="text-align:center;">Breakdown of your score<p></a>
			</div>
*/
	renderScore();

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














