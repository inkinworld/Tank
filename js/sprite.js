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

var Tanks = {};
var Sprites = {};
var tankImg = new Image();
tankImg.src = "./source/Tank.png";
tankImg.onload = function(){
	ctx = document.getElementById('canvas').getContext('2d');
	Tanks.myTank = new MyTank();
	Tanks.myTank.keyBoard();
	var iframes = 0;
	function draw(){
		iframes = (iframes + 1)%60
		ctx.clearRect(0,0,Style.canvas,Style.canvas);
		Tanks.myTank.update(iframes);
		Tanks.myTank.draw();
		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
} 


function MyTank(){
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

	this.moveState = {
		w: 0,
		a: 0,
		s: 0,
		d: 0,
		isMove: false
	}

	this.frame = [];
	this.frame.push(new Sprite(tankImg,0,0,32,32));
	this.frame.push(new Sprite(tankImg,448,0,32,32));

	this.draw = function(){
		this.frame[this.state.frame].draw(ctx,this.state.x,this.state.y,Style.tank,Style.tank,this.state.rota);
	}

	this.keyBoard = function(){
		var that = this;
		Action.keyBind('down','W',function(){
			that.state.direction = 0;
			that.moveState.w = 1;
			that.state.rota = 0;	
		})

		Action.keyBind('down','S',function(){
			that.state.direction = 2;
			that.moveState.s = 1;
			that.state.rota = 180;
		})

		Action.keyBind('down','A',function(){
			that.state.direction = 3;
			that.moveState.a = 1;	
			that.state.rota = 270;
		})

		Action.keyBind('down','D',function(){
			that.state.direction = 1;
			that.moveState.d = 1;
			that.state.rota = 90;
		})

		//当按键抬起
		Action.keyBind('up','W',function(){
			that.moveState.w = 0;
		})

		Action.keyBind('up','S',function(){
			that.moveState.s = 0;
		})

		Action.keyBind('up','A',function(){
			that.moveState.a = 0;	
		})

		Action.keyBind('up','D',function(){
			that.moveState.d = 0;
		})
	}

	this.update = function(frames){
		var state = Tanks.myTank.state,
			moveState = Tanks.myTank.moveState;
		moveState.isMove = moveState.w || moveState.a || moveState.s || moveState.d;
		if(moveState.isMove){
			state.frame = Math.floor(frames/4)%2;
			switch(Tanks.myTank.state.direction){
				case 0:
					state.y -= 5;
					break;
				case 1:
					state.x += 5;
					break;
				case 2:
					state.y += 5;
					break;
				case 3:
					state.x -= 5;
					break;
			}
		} 
	}
}
