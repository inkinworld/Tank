var Sprites = {};
function Sprite(image,sx,sy,sw,sh){
	this.s = {
		x : sx,
		y : sy,
		w : sw,
		h : sh,
		image : image
	}
}

Sprite.prototype.draw = function(context,x,y,w,h,rota){
	var sx = this.s.x,
		sy = this.s.y,
		sw = this.s.w,
		sh = this.s.h,
		image = this.s.image,
		rota = rota;
	context.save();
	context.translate(x,y);
	context.rotate( (Math.PI / 180) * rota);
	context.translate(-w/2,-h/2);
	context.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);
	// console.log(this.s);
	context.restore();
}


 

