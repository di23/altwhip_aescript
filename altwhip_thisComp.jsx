/*
	altwhip_thisComp
	Author: Yahor Hayeuski
	version: 1.00
	Script for ft-Toolbar

	Copy to clipboard expression path of the property. Path is relevant for "thisComp".
*/
( function (){

// ---------------------------------
// Functions
// ---------------------------------

function find_universal_property_name( prop ){

	if ( prop.parentProperty.propertyType === PropertyType.INDEXED_GROUP ){
		return prop.name;
	} else {
		return prop.matchName;
	}
}

// ---------------------------------
// Checks
// ---------------------------------

// Check for selected comp
var curcomp = app.project.activeItem;
if (( curcomp == null ) || !( curcomp instanceof CompItem )){

	alert( "There is no active comp." );
	return; // Exit
}

// Check if one property selected
var selprop;

var selected_props = curcomp.selectedProperties;
if ( selected_props.length == 1 ){

	selprop = selected_props[ 0 ];

} else if ( selected_props.length == 2 ){ // Sometimes parent property is selected together with target property
	if ( selected_props[ 0 ].matchName == selected_props[ 1 ].parentProperty.matchName ){

		selprop = selected_props[ 1 ];

	} else {
		alert( "Select one property." );
		return; // Exit
	}
} else {
	alert( "Select one property." );
	return; // Exit
}

// ---------------------------------
// Property Path
// ---------------------------------

// Find all properties name
var prop_hierarchy = [ find_universal_property_name( selprop )];

for ( var i = 1; i < selprop.propertyDepth; i++ ){

	prop_hierarchy.push( find_universal_property_name( selprop.propertyGroup( i )));
}

// Create path string
var proppart_path = "";
for ( var i = prop_hierarchy.length - 1; i >= 0; i-- ){

	proppart_path += '( "' + prop_hierarchy[ i ] + '" )';
}
var path = "thisLayer" + proppart_path;

// ---------------------------------
// Copy To Clipboard
// ---------------------------------

var cmd_string = 'cmd.exe /c cmd.exe /c "echo|set/p=' + path + '|clip"'; // NOTE: Windows only
system.callSystem( cmd_string );

})(); // end