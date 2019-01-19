( function (){

// Check for selected comp
var curcomp = app.project.activeItem;
if (( curcomp == null ) || !( curcomp instanceof CompItem )){
	alert( "There is no active comp." );
	return;
}

// Check if one property selected
var selprop;
if ( curcomp.selectedProperties.length == 1 ){
	selprop = curcomp.selectedProperties[ 0 ];

} else if ( curcomp.selectedProperties.length == 2 ){
	if ( curcomp.selectedProperties[ 0 ].matchName == curcomp.selectedProperties[ 1 ].parentProperty.matchName ){
		selprop = curcomp.selectedProperties[ 1 ];
	} else {
		alert( "Select one property." );
		return;
	}
} else {
	alert( "Select one property." );
	return;
}

// Find property path
var propid;
if ( selprop.parentProperty.propertyType === PropertyType.INDEXED_GROUP ){
	propid = selprop.name;
} else {
	propid = selprop.matchName;
}

var prop_hierarchy = [ propid ];
for ( var i = 1; i < selprop.propertyDepth - 1; i++ ){
	var curname;
	if ( selprop.propertyGroup( i + 1 ).propertyType === PropertyType.INDEXED_GROUP ){
		curname = selprop.propertyGroup( i ).name;
	} else {
		curname = selprop.propertyGroup( i ).matchName;
	}
	prop_hierarchy.push( curname );
}
prop_hierarchy.push( selprop.propertyGroup( selprop.propertyDepth - 1 ).matchName );

// Create path string
var proppart_path = "";
for ( var i = prop_hierarchy.length - 1; i >= 0; i-- ){
	proppart_path += '( "' + prop_hierarchy[ i ] + '" )';
}

var path = "thisLayer" + proppart_path;

// Copy to clipboard
var cmd_string = 'cmd.exe /c cmd.exe /c "echo|set/p=' + path + '|clip"'; 
system.callSystem( cmd_string );

})(); // end