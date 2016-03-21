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
		lastDirection :0,
		frame : 0,
		isSlip : 0,
		lastIsControl : 0
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
}

Tank.prototype.fire = function(){
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

Tank.prototype.update = function(frames){
	//当前脚下的地砖
	var currentList = []
	var collTestList = [];
	// 引用自身
	var that = this;
	var state = that.state,
		moveState = that.moveState;
	var isMidd;
	var isControl;
	moveState.isMove = isControl = moveState.w || moveState.a || moveState.s || moveState.d;
	// console.log(moveState.d)

	currentList = onWhichTile(state.lastDirection);

	var isOnIce =1;
	currentList.forEach(function(tile){
		if(!tile){
			isOnIce = 0;
			return;
		}
		if(tile.type !== 7) isOnIce =0;
	})

	if(isOnIce && state.lastIsControl && !moveState.isMove) state.isSlip = 1;
	if(state.isSlip && isOnIce){
		if(that.slipCounter.add()<40){
			moveState.isMove = 1
		}else{
			that.slipCounter.clear();
			moveState.isMove = 0;
			state.isSlip = 0;
		}
	}else{
		that.slipCounter.clear();
		state.isSlip = 0;
	}

	state.lastIsControl = isControl;

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

		collTestList = onWhichTile(state.direction); 
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

	state.lastDirection = state.direction;
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

	function addTest(list,col,row){
		if(0<=row && row <13 &&  0 <= col && col <13) list.push(map.mapArray[col][row]);
	}

	function onWhichTile(direction){
		var list = [];
		if(direction === 0 || direction ===2){
			isMidd = (state.x/32)%2;
			if(direction ===0){
				var row = Math.floor((state.y-32)/64);
			}else{
				var row = Math.floor((state.y+32)/64);
			}

			if(isMidd){
				var col = (state.x-32)/64;
				// console.log(col + ',' + row);
				addTest(list,col,row)
			}else{
				var col1 = (state.x-64)/64;
				var col2 = col1+1;
				addTest(list,col1,row);
				addTest(list,col2,row);
				// console.log(col1 + '|' + col2 + 	',' + row);
			}
		}else{
			isMidd = (state.y/32)%2;
			// console.log(isMidd);
			if(direction === 1){
				var col = Math.floor((state.x+32)/64);
			}else{
				var col = Math.floor((state.x-32)/64);
			}

			if(isMidd){
				var row = (state.y-32)/64;
				// console.log(col + ',' + row + '_');
				addTest(list,col,row);
			}else{
				var row1 = (state.y-64)/64;
				var row2 = row1 + 1;
				addTest(list,col,row1);
				addTest(list,col,row2);
				// console.log(col + ',' + row1 + '|' + row2);

			}
		}// end of if
		return list;
	}//end of onWhichTile
}//end of update

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
	this.slipCounter = this.newCounter();

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
		Action.keyBind.bind('down','W',function(){
			that.state.direction = 0;
			that.moveState.w = 1;
			that.state.rota = 0;	
		})

		Action.keyBind.bind('down','S',function(){
			that.state.direction = 2;
			that.moveState.s = 1;
			that.state.rota = 180;
		})

		Action.keyBind.bind('down','A',function(){
			that.state.direction = 3;
			that.moveState.a = 1;	
			that.state.rota = 270;
		})

		Action.keyBind.bind('down','D',function(){
			that.state.direction = 1;
			that.moveState.d = 1;
			that.state.rota = 90;
		})

		//当按键抬起
		Action.keyBind.bind('up','W',function(){
			that.moveState.w = 0;
		})

		Action.keyBind.bind('up','S',function(){
			that.moveState.s = 0;
		})

		Action.keyBind.bind('up','A',function(){
			that.moveState.a = 0;	
		})

		Action.keyBind.bind('up','D',function(){
			that.moveState.d = 0;
		})

		Action.keyBind.bind('down','J',this.fire.bind(that));
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
	this.updateCounter = this.newCounter();
	this.slipCounter = this.newCounter();
}

AiTank.prototype.update = function(frames,tileList){
	var times = this.updateCounter.add();
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
		Tank.prototype.update.call(this,frames,tileList);
		this.fire();
		this.updateCounter.clear();
		return;
	}
	Tank.prototype.update.call(this,frames,tileList);
}