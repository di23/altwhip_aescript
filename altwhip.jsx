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
var propid = selprop.matchName;

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

// NOTE посмотреть как работает GimmePropPath
// На универсальность можно проверять таким образом - могу редактировать имя - тогда достаю просто name,
// не могу его редактировать, тогда достаю matchName.
// Все проще есть propertyType, через него и находить что надо вставлять

alert( prop_hierarchy );

})(); // end