var Booms = {};
Booms.list = [];
function BoomClear(){
	var newList = [];
	Booms.list.forEach(function(ele){
		if(ele.exist)
			newList.push(ele);
	})
	Booms.list = newList;
}
// 爆炸素材图片，在load模块中加载
var boomImg;

Boom.prototype = new Sprite(Style.boom ,Style.boom ,0 ,0);
function Boom(x,y,rota,direction,frame){
	this.addFrame(boomImg,0,0,64,64);
	this.addFrame(boomImg,64,0,64,64);
	this.addFrame(boomImg,128,0,64,64);
	this.addFrame(boomImg,192,0,64,64);	
	this.addFrame(boomImg,256,0,64,64);	

	this.state = {
		x : x,
		y : y,
		rota : 0,
		// 0 --> up
		// 1 --> right
		// 2 --> down
		// 3 --> left 
		direction : direction,
		frame : frame
	}

	this.exist = 1; 

	this.update = function(){
		var num = this.counter()
		if(num < 2){ 
			this.state.frame = 0;
			return;
		}
		if(num < 4){
			this.state.frame = 1;
			return;
		}
		if(num < 6){
			this.state.frame = 2;
			return;
		}
		// if(num < 8){
		// 	this.state.frame = 3;
		// 	return;
		// }
		// if(num < 10){
		// 	this.state.frame = 4;
		// 	return;
		// }
		if(num > 5) {
			this.counder = null;
			this.exist = 0;
		}
	}

	this.counter = newCounter();

	function newCounter(){
		var num = 0;
		return function(){
			return num++; 
		}
	}
}