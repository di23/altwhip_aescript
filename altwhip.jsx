(function () {

// Check for selected comp
var curcomp = app.project.activeItem;
if (( curcomp == null ) || !( curcomp instanceof CompItem )){
	alert( "There is no active comp." );
	return;
}

// Check if one property selected
if ( curcomp.selectedProperties.length != 1 ){
	alert( "Select one property." );
	return;
}

alert( "yes" );

})(); // end