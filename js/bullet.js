var Bullets = {};
// 子弹图片load模块
var miscImg;

function Bullet(x,y,rota,direction,frame){
	this.state = {
		x : x,
		y : y,
		rota : rota,
		// 0 --> up
		// 1 --> right
		// 2 --> down
		// 3 --> left 
		direction : direction,
		frame : frame
	}

	this.moveState = {
		w: 0,
		a: 0,
		s: 0,
		d: 0,
		isMove: false
	}

	this.graph = {
		width: Style.tank,
		height: Style.tank
	}

	this.frame = [];
	this.frame.push(new Sprite(miscImg,0,0,8,8));
	
	this.draw = function(ctx){
		this.frame[this.state.frame].draw(ctx,this.state.x,this.state.y,Style.button,Style.button,this.state.rota);
	}

}