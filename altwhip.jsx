(function () {

// Check for selected comp
var curcomp = app.project.activeItem;
if (( curcomp == null ) || !( curcomp instanceof CompItem )){
	alert( "There is no active comp." );
	return;
}

// Check if one property selected
if ( curcomp.selectedProperties.length != 1 ){ // FIXME пропорция выделяется не одна а вместе с эффектом
	alert( "Select one property." );
	return;
}

var selprop = curcomp.selectedProperties[ 0 ];

// Find property path
var propid = selprop.propertyIndex;

var groupids = [];
for ( var i = 1; i < selprop.propertyDepth; i++ ){
	groupids.push( selprop.propertyGroup( i ).name );
}

alert( groupids );
alert( "end" );

})(); // end