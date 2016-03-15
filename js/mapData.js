var mapData = 
[{"x":96,"y":96,"initType":14},{"x":96,"y":160,"initType":14},{"x":96,"y":224,"initType":14},{"x":96,"y":288,"initType":14},{"x":32,"y":416,"initType":14},{"x":160,"y":416,"initType":14},{"x":224,"y":416,"initType":14},{"x":224,"y":288,"initType":14},{"x":224,"y":224,"initType":14},{"x":224,"y":160,"initType":14},{"x":224,"y":96,"initType":14},{"x":352,"y":96,"initType":14},{"x":352,"y":160,"initType":14},{"x":352,"y":224,"initType":14},{"x":480,"y":96,"initType":14},{"x":480,"y":160,"initType":14},{"x":480,"y":224,"initType":14},{"x":416,"y":224,"initType":2},{"x":416,"y":160,"initType":11},{"x":608,"y":96,"initType":14},{"x":608,"y":160,"initType":14},{"x":608,"y":224,"initType":14},{"x":608,"y":288,"initType":14},{"x":736,"y":96,"initType":14},{"x":736,"y":160,"initType":14},{"x":736,"y":160,"initType":14},{"x":736,"y":224,"initType":14},{"x":736,"y":288,"initType":14},{"x":352,"y":352,"initType":14},{"x":480,"y":352,"initType":14},{"x":608,"y":416,"initType":14},{"x":672,"y":416,"initType":14},{"x":800,"y":416,"initType":14},{"x":96,"y":544,"initType":14},{"x":96,"y":608,"initType":14},{"x":96,"y":672,"initType":14},{"x":96,"y":736,"initType":14},{"x":224,"y":736,"initType":14},{"x":224,"y":672,"initType":14},{"x":224,"y":608,"initType":14},{"x":224,"y":544,"initType":14},{"x":352,"y":480,"initType":14},{"x":352,"y":544,"initType":14},{"x":352,"y":608,"initType":14},{"x":416,"y":544,"initType":2},{"x":416,"y":480,"initType":11},{"x":480,"y":480,"initType":14},{"x":480,"y":544,"initType":14},{"x":480,"y":608,"initType":14},{"x":608,"y":544,"initType":14},{"x":608,"y":608,"initType":14},{"x":608,"y":672,"initType":14},{"x":608,"y":736,"initType":14},{"x":736,"y":736,"initType":14},{"x":736,"y":672,"initType":14},{"x":736,"y":608,"initType":14},{"x":736,"y":544,"initType":14},{"x":352,"y":800,"initType":9},{"x":352,"y":736,"initType":9},{"x":480,"y":736,"initType":4},{"x":480,"y":800,"initType":4},{"x":416,"y":736,"initType":2}]
console.log(mapData.length);
var map;

map = readMapData(mapData);

function readMapData(mapData){
	var mapArray =[];
	var i = 0;
	var j = 0;
	var childMap;
	for(i =0;i<13;i++){
		childMap = new Array();
		for(j=0;j<13;j++){
			childMap.push(null);
		}
		mapArray.push(childMap);
	}

	mapData.forEach(function(ele){
		var x = ele.x;
		var y =ele.y;
		var type = ele.initType;
		var row = (x - 32)/64;
		var col = (y - 32)/64;
		// mapArray[col][row] = new Tile(x,y,0,0,0,type) 
	})

	return mapArray;
}