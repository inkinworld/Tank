var Sprites = {};
function Sprite(gw,gh,vw,vh){
	//图形绘图大小
	this.graph = {
		width: gw,
		height: gh
	}
	//图形碰撞体积
	this.volume = {
		width: vw,
		height: vh
	}

	this.state = {
		x : 0,
		y : 0,
		rota : 0,
		// 0 --> up
		// 1 --> right
		// 2 --> down
		// 3 --> left 
		direction : 0,	
		frame : 0
	}

	this.frameList = [];

	// frameList 数组的成员为 frameData
	//格式如下：为调用canvas.drawImage(image, sx, sy, sw, sh, x, y, w, h)的对应参数
	// frameData{
	// 	x : sx,
	// 	y : sy
	// 	w : sw,
	// 	h : sh,
	// 	image : image
	// }
}

Sprite.prototype.draw = function(ctx){
	var frameData = this.frameList[this.state.frame];
	drawPicture(ctx,frameData,this.state.x,this.state.y,this.graph.width,this.graph.height,this.state.rota);

	function drawPicture(context,frameData,x,y,w,h,rota){
		var sx = frameData.x,
			sy = frameData.y,
			sw = frameData.w,
			sh = frameData.h,
			image = frameData.image,
			rota = rota;
		context.save();
		context.translate(x,y);
		context.rotate( (Math.PI / 180) * rota);
		context.translate(-w/2,-h/2);
		// context.drawImage(image, sx, sy, sw, sh, x-(w/2), y-(h/2), w, h);
		context.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);
		// console.log(this.s);
		context.restore();
	}
}

Sprite.prototype.addFrame = function(image,x,y,w,h){
	// console.log(this);
	this.frameList.push({
		image: image,
		x: x,
		y: y,
		w: w,
		h: h
	})
}

Sprite.prototype.newCounter = function(){
	var num = 0;
	function add(){
		return num++;
	}

	function clear(){
		num = 0;
	}

	return {
		add :add,
		clear :clear
	}
}	
 
Sprite.prototype.remove = function(ctx){
	ctx.fillRect(this.state.x -32,this.state.y -32,this.graph.width,this.graph.height);
}

