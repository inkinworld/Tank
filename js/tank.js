var Tanks = {};
Tanks.teamList = [[],[]];
function TanksClear(){
	Tanks.teamList.forEach(function(list){
		list.forEach(function(ele,index){
			if(!ele.exist) list.splice(index,1);
		})
	})
}
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

	// 坦克类型
	this.type = 0;
	this.exist = 1;

	this.team;

	this.fire = function(){
		switch(this.state.direction){
			case 0:
				Bullets.teamList[this.team].push(new Bullet(this.state.x,this.state.y - Style.tank/2,0,0,0));
				break;
			case 1:
				Bullets.teamList[this.team].push(new Bullet(this.state.x + Style.tank/2,this.state.y,90,1,0));
				break;
			case 2:
				Bullets.teamList[this.team].push(new Bullet(this.state.x,this.state.y + Style.tank/2,180,2,0));
				break;
			case 3:
				Bullets.teamList[this.team].push(new Bullet(this.state.x - Style.tank/2,this.state.y,270,3,0));
				break;
		}
	}
	
	this.remove =function(ctx){
		ctx.fillRect(this.state.x -32,this.state.y -32,64,64);
	}

	this.update = function(frames){
		var collTestList = [];
		// 引用自身
		var that = this;
		var state = that.state,
			moveState = that.moveState;
		var isMidd;
		moveState.isMove = moveState.w || moveState.a || moveState.s || moveState.d;
		if(moveState.isMove){
			state.frame = Math.floor(frames/4)%2  + (2*this.type);
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

			if(state.direction === 0 || state.direction ===2){
				isMidd = (state.x/32)%2;
				if(state.direction ===0){
					var row = Math.floor((state.y-32)/64);
				}else{
					var row = Math.floor((state.y+32)/64);
				}

				if(isMidd){
					var col = (state.x-32)/64;
					// console.log(col + ',' + row);
					addCollTest(col,row)
				}else{
					var col1 = (state.x-64)/64;
					var col2 = col1+1;
					addCollTest(col1,row);
					addCollTest(col2,row);
					// console.log(col1 + '|' + col2 + 	',' + row);
				}
			}else{
				isMidd = (state.y/32)%2;
				// console.log(isMidd);
				if(state.direction === 1){
					var col = Math.floor((state.x+32)/64);
				}else{
					var col = Math.floor((state.x-32)/64);
				}

				if(isMidd){
					var row = (state.y-32)/64;
					// console.log(col + ',' + row);
					addCollTest(col,row);
				}else{
					var row1 = (state.y-64)/64;
					var row2 = row1 + 1;
					addCollTest(col,row1);
					addCollTest(col,row2);
					// console.log(col + ',' + row1 + '|' + row2);

				}
			}
			// console.log(collTestList);

			collTestList.forEach(function(ele){
				if(!ele) return;
				var childList = []; 	
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
				return;
			})

			Tanks.teamList.forEach(function(team){
				team.forEach(function(tank){
					if(tank === that) return;
					var collResult = Collision.isColl(that,tank);
					if(collResult.isColl){
						switch(that.state.direction){
							case 0:
								state.y = tank.state.y + (tank.volume.height/2) + (Style.tank/2);
								break;
							case 1:
								state.x = tank.state.x - (tank.volume.height/2) - (Style.tank/2);
								break;
							case 2:
								state.y = tank.state.y - (tank.volume.height/2) - (Style.tank/2);
								break;
							case 3:
								state.x = tank.state.x + (tank.volume.height/2) + (Style.tank/2);
								break;
						}
					}
				 	return;
				})
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

		function addCollTest(col,row){
			if(0<=row && row <13 &&  0 <= col && col <13) collTestList.push(map.mapArray[col][row]);
		}

	}

}

MyTank.prototype = new Tank();
function MyTank(x,y,rota,direction,frame,type){
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

	this.type = type;
	this.team = 0;

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
function AiTank(x,y,rota,direction,frame,type){
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

	this.type = type;
	this.team = 1;

	this.update = function(frames,tileList){
		var times = this.counter.add();
		if(times > 60){
			this.moveState.d = 1;
			this.state.direction = parseInt((Math.random() * 4));
			// this.state.direction = 2;
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
			AiTank.prototype.update.call(this,frames,tileList);
			this.fire();
			this.counter.clear();
			return;
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