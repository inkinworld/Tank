var Tanks = {};
Tanks.list = [];
// 坦克素材图片，在load模块加载；
var tankImg;
Tank.prototype = new Sprite(Style.tank ,Style.tank ,Style.tank ,Style.tank);
function Tank(){
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
	this.fire = function(){
		switch(this.state.direction){
			case 0:
				Bullets.list.push(new Bullet(this.state.x,this.state.y - Style.tank/2,0,0,0));
				break;
			case 1:
				Bullets.list.push(new Bullet(this.state.x + Style.tank/2,this.state.y,90,1,0));
				break;
			case 2:
				Bullets.list.push(new Bullet(this.state.x,this.state.y + Style.tank/2,180,2,0));
				break;
			case 3:
				Bullets.list.push(new Bullet(this.state.x - Style.tank/2,this.state.y,270,3,0));
				break;
		}
	}
	
	this.remove =function(ctx){
		ctx.fillRect(this.state.x -32,this.state.y -32,64,64);
	}

	this.update = function(frames,tileList){
		// 引用自身
		var that = this;
		var state = that.state,
			moveState = that.moveState;
		moveState.isMove = moveState.w || moveState.a || moveState.s || moveState.d;
		if(moveState.isMove){
			state.frame = Math.floor(frames/4)%2;
			switch(that.state.direction){
				case 0:
					state.y -= Style.tankSpeed;
					correct(0);
					break;
				case 1:
					state.x += Style.tankSpeed;
					correct(1);
					break;
				case 2:
					state.y += Style.tankSpeed;
					correct(0);
					break;
				case 3:
					state.x -= Style.tankSpeed;
					correct(1);
					break;
			}

			tileList.forEach(function(ele){
				var collResult = Collision.isColl(that,ele);
				var childList = []; 
				if( collResult.isColl ){
					childList = ele.createChildColl();
					if(!childList.length) return;
					childList.forEach(function(ele){
						var collResult = Collision.isColl(that,ele);
						if(collResult.isColl){
							switch(that.state.direction){
								case 0:
									state.y = ele.state.y + (ele.volume.height/2) + (Style.tank/2);
									break;
								case 1:
									state.x = ele.state.x - (ele.volume.height/2) - (Style.tank/2);
									break;
								case 2:
									state.y = ele.state.y - (ele.volume.height/2) - (Style.tank/2);
									break;
								case 3:
									state.x = ele.state.x + (ele.volume.height/2) + (Style.tank/2);
									break;
							}
						}
					})
					// switch(Tanks.myTank.state.direction){
					// 	case 0:
					// 		state.y = ele.state.y + (ele.volume.height);
					// 		break;
					// 	case 1:
					// 		state.x = ele.state.x - (ele.volume.height);
					// 		break;
					// 	case 2:
					// 		state.y = ele.state.y - (ele.volume.height);
					// 		break;
					// 	case 3:
					// 		state.x = ele.state.x + (ele.volume.height);
					// 		break;
					// }
					return;
				}
			})
			// 修正超出画布
			if(state.x < Style.tank/2) state.x = Style.tank/2;
			if(state.x > Style.canvas-32) state.x = Style.canvas-32;
			if(state.y < Style.tank/2) state.y = Style.tank/2;
			if(state.y > Style.canvas-32) state.y = Style.canvas-32;
		} 
		// 修正运动
		function correct(type){
			switch(type){
				case 0:
					state.x = Math.round(state.x / (Style.tank / 2)) * (Style.tank/2);
					break;
				case 1:
					state.y = Math.round(state.y / (Style.tank / 2)) * (Style.tank/2);
					break;
			}
		}

	}

}

MyTank.prototype = new Tank();
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

	this.keyBoard = function(){
		var that = this;
		//发射子弹
		// function fire(){
		// 	switch(that.state.direction){
		// 		case 0:
		// 			Bullets.list.push(new Bullet(that.state.x,that.state.y - Style.tank/2,0,0,0));
		// 			break;
		// 		case 1:
		// 			Bullets.list.push(new Bullet(that.state.x + Style.tank/2,that.state.y,90,1,0));
		// 			break;
		// 		case 2:
		// 			Bullets.list.push(new Bullet(that.state.x,that.state.y + Style.tank/2,180,2,0));
		// 			break;
		// 		case 3:
		// 			Bullets.list.push(new Bullet(that.state.x - Style.tank/2,that.state.y,270,3,0));
		// 			break;
		// 	}
		// }
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

		Action.keyBind('down','J',this.fire.bind(that));
	}
}

AiTank.prototype = new Tank();
function AiTank(x,y,rota,direction,frame){
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

	this.update = function(frames,tileList){
			var times = this.counter.add();
			if(times > 60){
				this.moveState.d = 1;
				this.state.direction = parseInt((Math.random() * 4));
				switch(this.state.direction){
					case 0:
						this.state.rota = 0;
						break;
					case 1:
						this.state.rota = 90;
						break;
					case 2:
						this.state.rota = 180;
						break;
					case 3:
						this.state.rota = 270;
						break;
				}
				this.fire();
				this.counter.clear();
			}
		AiTank.prototype.update.call(this,frames,tileList);
	}

	this.counter = newCounter();

	function newCounter(){
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
}