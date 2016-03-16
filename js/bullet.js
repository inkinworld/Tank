var Bullets = {};
Bullets.list = [];
function BulletsClear(){
	var newList = [];
	Bullets.list.forEach(function(ele){
		if(ele.exist)
			newList.push(ele);
	})
	Bullets.list = newList;
}

// 子弹图片load模块
var miscImg;

Bullet.prototype = new Sprite(Style.bullet ,Style.bullet ,Style.bullet/2 ,Style.bullet/2);

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

	this.exist = 1;

	this.remove =function(ctx){
		ctx.fillRect(this.state.x -8,this.state.y -8,16,16);
	}	

	this.update = function(tileList,ctx){
		var collTestList = [];
		var that =this;
		var state = this.state;
		switch(state.direction){
			case 0:
				state.y -= Style.bulletSpeed;
				break;
			case 1:
				state.x += Style.bulletSpeed;
				break;
			case 2:
				state.y += Style.bulletSpeed;
				break;
			case 3:
				state.x -= Style.bulletSpeed;
				break;
		}

		if(state.direction === 0 || state.direction ===2){
			isMidd = (state.x/32)%2;
			if(state.direction ===0){
				var row = Math.floor((state.y-8)/64);
			}else{
				var row = Math.floor((state.y+8)/64);
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
				var col = Math.floor((state.x+8)/64);
			}else{
				var col = Math.floor((state.x-8)/64);
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

		collTestList.forEach(function bulletCollTest(ele){
			if(!ele) return;
			var childList = []; 
			childList = ele.createChildColl();
			if(!childList.length) return;
			childList.forEach(function bulletCollTest1(ele){
				var isBoom = false;
				var collResult = Collision.isColl(that,ele);
				if(collResult.isColl){
					var item = ele.tile;
					switch(state.direction){
						case 0:
							if(collResult.position.dx < 0 ){
								//射中小砖块的左侧区域
								if( collResult.position.dy >= (Style.bullet/2) ){
									// console.log( collResult.position.dy );
									//射中小砖块的左下角区域，[小方块][2]
									if(item.list[2]){
										//小砖块的左下角( [小方块][2] )存在，摧毁小砖块的左下角和右下角
										item.list[2] = 0;
										item.list[3] = 0;
										that.exist = 0;
										isBoom = true;
									}
									//否则无影响
								}else{
									//射中小砖块的左上角区域, [小方块][0]
									// console.log( collResult.position.dy );
									if(item.list[0]){
										//小砖块的左上角( [小方块][0] )存在，摧毁小砖块的左上角和右上角
										item.list[0] = 0;
										item.list[1] = 0;
										that.exist = 0;
										isBoom = true;
									}
									//否则无影响
								}
							}else{
								//射中小砖块的右侧
								if( collResult.position.dy >= (Style.bullet/2) ){
									//射中小砖块的右下角区域，[小方块][3]
									if(item.list[3]){
										//小砖块的右下角( [小方块][2] )存在，摧毁小砖块的左下角和右下角
										item.list[2] = 0;
										item.list[3] = 0;
										that.exist = 0;
										isBoom = true;
									}
									//否则无影响
								}else{
									//射中小砖块的右上角区域, [小方块][1]
									if(item.list[1]){
										//小砖块的左上角( [小方块][1] )存在，摧毁小砖块的左上角和右上角
										item.list[0] = 0;
										item.list[1] = 0;
										that.exist = 0;
										isBoom = true;
									}
									//否则无影响
								}
							}
							item.complete = 0;
							break;
						case 1:
							if(collResult.position.dy < 0 ){
								//射中小砖块的上侧区域
								if( collResult.position.dx <= -(Style.bullet/2) ){
									if(item.list[0]){
										item.list[0] = 0;
										item.list[2] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}else{
									if(item.list[1]){
										item.list[1] = 0;
										item.list[3] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}
							}else{
								if( collResult.position.dx <= -(Style.bullet/2) ){
									if(item.list[2]){
										item.list[0] = 0;
										item.list[2] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}else{
									if(item.list[3]){
										item.list[1] = 0;
										item.list[3] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}
							}
							item.complete = 0;
							break;
						case 2:
							if(collResult.position.dx < 0 ){
								//射中小砖块的左侧区域
								if( collResult.position.dy <= -(Style.bullet/2) ){
									if(item.list[0]){
										item.list[0] = 0;
										item.list[1] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}else{
									if(item.list[2]){
										item.list[2] = 0;
										item.list[3] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}
							}else{
								if( collResult.position.dy <= -(Style.bullet/2) ){
									if(item.list[1]){
										item.list[1] = 0;
										item.list[0] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}else{
									if(item.list[3]){
										item.list[3] = 0;
										item.list[2] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}
							}
							item.complete = 0;
							break;
						case 3:
							if(collResult.position.dy < 0 ){
								//射中小砖块的上侧区域
								if( collResult.position.dx >= (Style.bullet/2) ){
									if(item.list[1]){
										item.list[1] = 0;
										item.list[3] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}else{
									if(item.list[0]){
										item.list[0] = 0;
										item.list[2] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}
							}else{
								if( collResult.position.dx >= (Style.bullet/2) ){
									if(item.list[3]){
										item.list[1] = 0;
										item.list[3] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}else{
									if(item.list[2]){
										item.list[0] = 0;
										item.list[2] = 0;
										that.exist = 0;
										isBoom = true;
									}
								}
							}
							item.complete = 0;
							break;
					}
					if(isBoom) Booms.list.push(new Boom(that.state.x,that.state.y,0,0,0))	
				}
			})
			// 与子弹发生作用的地砖进行状态更新与损毁绘制
			ele.update();	
			ele.drawDestory(ctx);
			return;
		})

		if((state.x < Style.bullet/2) || (state.x > Style.canvas-Style.bullet/2) || (state.y < Style.bullet/2) || (state.y > Style.canvas-Style.bullet/2) ) 
			this.exist = 0;

		function addCollTest(col,row){
			if(0<=row && row <13 &&  0 <= col && col <13) collTestList.push(map[col][row]);
		}
	}


	this.updateBackup = function(tileList,ctx){
		var that =this;
		var state = this.state;
		switch(state.direction){
			case 0:
				state.y -= Style.bulletSpeed;
				break;
			case 1:
				state.x += Style.bulletSpeed;
				break;
			case 2:
				state.y += Style.bulletSpeed;
				break;
			case 3:
				state.x -= Style.bulletSpeed;
				break;
		}

		tileList.forEach(function bulletCollTest(ele){
			var collResult = Collision.isColl(that,ele);
			var childList = []; 
			if( collResult.isColl ){
				childList = ele.createChildColl();
				if(!childList.length) return;
				childList.forEach(function bulletCollTest1(ele){
					var isBoom = false;
					var collResult = Collision.isColl(that,ele);
					if(collResult.isColl){
						var item = ele.tile;
						switch(state.direction){
							case 0:
								if(collResult.position.dx < 0 ){
									//射中小砖块的左侧区域
									if( collResult.position.dy >= (Style.bullet/2) ){
										// console.log( collResult.position.dy );
										//射中小砖块的左下角区域，[小方块][2]
										if(item.list[2]){
											//小砖块的左下角( [小方块][2] )存在，摧毁小砖块的左下角和右下角
											item.list[2] = 0;
											item.list[3] = 0;
											that.exist = 0;
											isBoom = true;
										}
										//否则无影响
									}else{
										//射中小砖块的左上角区域, [小方块][0]
										// console.log( collResult.position.dy );
										if(item.list[0]){
											//小砖块的左上角( [小方块][0] )存在，摧毁小砖块的左上角和右上角
											item.list[0] = 0;
											item.list[1] = 0;
											that.exist = 0;
											isBoom = true;
										}
										//否则无影响
									}
								}else{
									//射中小砖块的右侧
									if( collResult.position.dy >= (Style.bullet/2) ){
										//射中小砖块的右下角区域，[小方块][3]
										if(item.list[3]){
											//小砖块的右下角( [小方块][2] )存在，摧毁小砖块的左下角和右下角
											item.list[2] = 0;
											item.list[3] = 0;
											that.exist = 0;
											isBoom = true;
										}
										//否则无影响
									}else{
										//射中小砖块的右上角区域, [小方块][1]
										if(item.list[1]){
											//小砖块的左上角( [小方块][1] )存在，摧毁小砖块的左上角和右上角
											item.list[0] = 0;
											item.list[1] = 0;
											that.exist = 0;
											isBoom = true;
										}
										//否则无影响
									}
								}
								item.complete = 0;
								break;
							case 1:
								if(collResult.position.dy < 0 ){
									//射中小砖块的上侧区域
									if( collResult.position.dx <= -(Style.bullet/2) ){
										if(item.list[0]){
											item.list[0] = 0;
											item.list[2] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}else{
										if(item.list[1]){
											item.list[1] = 0;
											item.list[3] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}
								}else{
									if( collResult.position.dx <= -(Style.bullet/2) ){
										if(item.list[2]){
											item.list[0] = 0;
											item.list[2] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}else{
										if(item.list[3]){
											item.list[1] = 0;
											item.list[3] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}
								}
								item.complete = 0;
								break;
							case 2:
								if(collResult.position.dx < 0 ){
									//射中小砖块的左侧区域
									if( collResult.position.dy <= -(Style.bullet/2) ){
										if(item.list[0]){
											item.list[0] = 0;
											item.list[1] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}else{
										if(item.list[2]){
											item.list[2] = 0;
											item.list[3] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}
								}else{
									if( collResult.position.dy <= -(Style.bullet/2) ){
										if(item.list[1]){
											item.list[1] = 0;
											item.list[0] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}else{
										if(item.list[3]){
											item.list[3] = 0;
											item.list[2] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}
								}
								item.complete = 0;
								break;
							case 3:
								if(collResult.position.dy < 0 ){
									//射中小砖块的上侧区域
									if( collResult.position.dx >= (Style.bullet/2) ){
										if(item.list[1]){
											item.list[1] = 0;
											item.list[3] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}else{
										if(item.list[0]){
											item.list[0] = 0;
											item.list[2] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}
								}else{
									if( collResult.position.dx >= (Style.bullet/2) ){
										if(item.list[3]){
											item.list[1] = 0;
											item.list[3] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}else{
										if(item.list[2]){
											item.list[0] = 0;
											item.list[2] = 0;
											that.exist = 0;
											isBoom = true;
										}
									}
								}
								item.complete = 0;
								break;
						}
						if(isBoom) Booms.list.push(new Boom(that.state.x,that.state.y,0,0,0))	
					}
				})
				// 与子弹发生作用的地砖进行状态更新与损毁绘制
				ele.update();	
				ele.drawDestory(ctx);
				return;
			}

		})

		if((state.x < Style.bullet/2) || (state.x > Style.canvas-Style.bullet/2) || (state.y < Style.bullet/2) || (state.y > Style.canvas-Style.bullet/2) ) 
			this.exist = 0;
	}

}