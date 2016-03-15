var load = (function(){
	var imageNum = 4;
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

tankImg = load("../source/Tank.png");
tileImg = load("../source/tile.png");
miscImg = load("../source/Misc.png");
boomImg = load("../source/Boom.png");
// var tankImg;
// var tileImg;