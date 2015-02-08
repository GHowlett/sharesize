var autocomplete = new google.maps.places.Autocomplete($('.searchbox input')[0], {types:['geocode']} );

// dollar sign input field
function handleChange() {
var myValue = document.getElementById("income").value;

    if (myValue.indexOf("$") != 0)
    {
        myValue = "$" + myValue;
    }
    
    document.getElementById("income").value = myValue;

}

