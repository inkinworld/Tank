var load = (function(){
	var imageNum = 2;
	return function(src){
		var image = new Image();
		image.src = src;
		image.onload = function(){
			if(--imageNum === 0){
				main();
			}
		}
		return image;
	}
})()

var tankImg = load("./source/Tank.png");
var tileImg = load( "./source/tile.png");
// var tankImg;
// var tileImg;