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

	this.graph = {
		width: Style.tank,
		height: Style.tank
	}

	this.frame = [];
	this.frame.push(new Sprite(tankImg,0,0,32,32));
	this.frame.push(new Sprite(tankImg,448,0,32,32));

	this.draw = function(ctx){
		this.frame[this.state.frame].draw(ctx,this.state.x,this.state.y,Style.tank,Style.tank,this.state.rota);
	}

	this.keyBoard = function(){
		var that = this;
		//发射子弹
		function fire(){
			switch(that.state.direction){
				case 0:
					Bullets.list.push(new Bullet(that.state.x,that.state.y - Style.tank/2,0,0,0));
					break;
				case 1:
					Bullets.list.push(new Bullet(that.state.x + Style.tank/2,that.state.y,90,1,0));
					break;
				case 2:
					Bullets.list.push(new Bullet(that.state.x,that.state.y + Style.tank/2,180,2,0));
					break;
				case 3:
					Bullets.list.push(new Bullet(that.state.x - Style.tank/2,that.state.y,270,3,0));
					break;
			}
		}
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

		Action.keyBind('down','J',fire)
	}

	this.update = function(frames,tileList){
		// 引用自身
		var that = this;
		var state = Tanks.myTank.state,
			moveState = Tanks.myTank.moveState;
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
									state.y = ele.state.y + (ele.graph.height/2) + (Style.tank/2);
									break;
								case 1:
									state.x = ele.state.x - (ele.graph.height/2) - (Style.tank/2);
									break;
								case 2:
									state.y = ele.state.y - (ele.graph.height/2) - (Style.tank/2);
									break;
								case 3:
									state.x = ele.state.x + (ele.graph.height/2) + (Style.tank/2);
									break;
							}
						}
					})
					// switch(Tanks.myTank.state.direction){
					// 	case 0:
					// 		state.y = ele.state.y + (ele.graph.height);
					// 		break;
					// 	case 1:
					// 		state.x = ele.state.x - (ele.graph.height);
					// 		break;
					// 	case 2:
					// 		state.y = ele.state.y - (ele.graph.height);
					// 		break;
					// 	case 3:
					// 		state.x = ele.state.x + (ele.graph.height);
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
