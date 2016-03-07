var Tanks = {};
// 坦克素材图片，在load模块加载；
var tankImg;

function MyTank(x,y,rota,direction,frame){
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

	this.frame = [];
	this.frame.push(new Sprite(tankImg,0,0,32,32));
	this.frame.push(new Sprite(tankImg,448,0,32,32));

	this.draw = function(ctx){
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
