var Bullets = {};
Bullets.teamList = [[],[]];
function BulletsClear(){
	Bullets.teamList.forEach(function(list){
		list.forEach(function(ele,index){
			if(!ele.exist) list.splice(index,1);
		})
	})
}

// 子弹图片load模块
var miscImg;

Bullet.prototype = new Sprite(Style.bullet ,Style.bullet ,Style.bullet/2 ,Style.bullet/2);

function Bullet(x,y,rota,direction,frame,type){
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
	this.type = type? type:0; 	
}

Bullet.prototype.update = function(ctx,teamNum){
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
			var col = Math.floor((state.x-32)/64);
			// console.log(col + ',' + row);
			addCollTest(col,row)
		}else{
			var col1 = Math.floor((state.x-64)/64);
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
			var row = Math.floor((state.y-32)/64);
			// console.log(col + ',' + row);
			addCollTest(col,row);
		}else{
			var row1 = Math.floor((state.y-64)/64);
			var row2 = row1 + 1;
			addCollTest(col,row1);
			addCollTest(col,row2);
			// console.log(col + ',' + row1 + '|' + row2);

		}
	}

	collTestList.forEach(function bulletCollTest(tile){
		if(!tile) return;
		var isBoom = false;
		var boomType = 0;
		var childList = []; 
		var tileType = tile.type;
		childList = tile.createChildColl();
		if(!childList.length) return;
		childList.forEach(function bulletCollTest1(ele){
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
									// item.list[2] = 0;
									// item.list[3] = 0;
									var result = handleDestory(tile,tileType,item.list,[2,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
								//否则无影响
							}else{
								//射中小砖块的左上角区域, [小方块][0]
								// console.log( collResult.position.dy );
								if(item.list[0]){
									//小砖块的左上角( [小方块][0] )存在，摧毁小砖块的左上角和右上角
									// item.list[0] = 0;
									// item.list[1] = 0;
									var result = handleDestory(tile,tileType,item.list,[0,1])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
								//否则无影响
							}
						}else{
							//射中小砖块的右侧
							if( collResult.position.dy >= (Style.bullet/2) ){
								//射中小砖块的右下角区域，[小方块][3]
								if(item.list[3]){
									//小砖块的右下角( [小方块][2] )存在，摧毁小砖块的左下角和右下角
									// item.list[2] = 0;
									// item.list[3] = 0;
									var result = handleDestory(tile,tileType,item.list,[2,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
								//否则无影响
							}else{
								//射中小砖块的右上角区域, [小方块][1]
								if(item.list[1]){
									//小砖块的左上角( [小方块][1] )存在，摧毁小砖块的左上角和右上角
									// item.list[0] = 0;
									// item.list[1] = 0;
									var result = handleDestory(tile,tileType,item.list,[0,1])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
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
									// item.list[0] = 0;
									// item.list[2] = 0;
									var result = handleDestory(tile,tileType,item.list,[0,2])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}else{
								if(item.list[1]){
									// item.list[1] = 0;
									// item.list[3] = 0;
									var result = handleDestory(tile,tileType,item.list,[1,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}
						}else{
							if( collResult.position.dx <= -(Style.bullet/2) ){
								if(item.list[2]){
									// item.list[0] = 0;
									// item.list[2] = 0;
									var result = handleDestory(tile,tileType,item.list,[0,2])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}else{
								if(item.list[3]){
									// item.list[1] = 0;
									// item.list[3] = 0;
									var result = handleDestory(tile,tileType,item.list,[1,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
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
									// item.list[0] = 0;
									// item.list[1] = 0;
									var result = handleDestory(tile,tileType,item.list,[0,1])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}else{
								if(item.list[2]){
									// item.list[2] = 0;
									// item.list[3] = 0;
									var result = handleDestory(tile,tileType,item.list,[2,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}
						}else{
							if( collResult.position.dy <= -(Style.bullet/2) ){
								if(item.list[1]){
									// item.list[1] = 0;
									// item.list[0] = 0;
									var result = handleDestory(tile,tileType,item.list,[1,0])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}else{
								if(item.list[3]){
									// item.list[3] = 0;
									// item.list[2] = 0;
									var result = handleDestory(tile,tileType,item.list,[2,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
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
									// item.list[1] = 0;
									// item.list[3] = 0;
									var result = handleDestory(tile,tileType,item.list,[1,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}else{
								if(item.list[0]){
									// item.list[0] = 0;
									// item.list[2] = 0;
									var result = handleDestory(tile,tileType,item.list,[0,2])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}
						}else{
							if( collResult.position.dx >= (Style.bullet/2) ){
								if(item.list[3]){
									// item.list[1] = 0;
									// item.list[3] = 0;
									var result = handleDestory(tile,tileType,item.list,[1,3])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}else{
								if(item.list[2]){
									// item.list[0] = 0;
									// item.list[2] = 0;
									var result = handleDestory(tile,tileType,item.list,[0,2])
									isBoom = result.isBoom;
									boomType = result.boomType;
							
								}
							}
						}
						item.complete = 0;
						break;
				}
			}
		})
	
		if(isBoom){
			switch(boomType){
				case 0:
					Booms.list.push(new Boom(that.state.x,that.state.y,0,0,0,0));
					break;
				case 1:
					Booms.list.push(new Boom(tile.state.x,tile.state.y,0,0,0,1));

			}
		}
		// 与子弹发生作用的地砖进行状态更新与损毁绘制
		tile.update();	
		tile.drawDestory(ctx);
		return;
	})

	Tanks.teamList.forEach(function(team,index){
		if(index === teamNum) return;
		team.forEach(function(tank){
			var collResult = Collision.isColl(that,tank);
			if(collResult.isColl){ 
				Game.Music.blast.play();
				Booms.list.push(new Boom(tank.state.x,tank.state.y,0,0,0,1));
				if(index === 0) {
					Game.Logic.isHero1Servive =0;
					Game.Logic.heroHp --;
				}
				if(index === 1) Game.Logic.enemyServive --;
				that.exist = 0;
				tank.exist = 0;
				Game.Thumbnail.render(App.ctx.tile);
			}				
		})
	})

	Bullets.teamList.forEach(function(team,index){
		if(index === teamNum) return;	
		team.forEach(function(bullet){
			var collResult = Collision.isColl(that,bullet);
			if(collResult.isColl){ 
				that.exist = 0;
				bullet.exist = 0;
			}				
		})
	})
	

	if((state.x < Style.bullet/2) || (state.x > Style.canvas-Style.bullet/2) || (state.y < Style.bullet/2) || (state.y > Style.canvas-Style.bullet/2) ) 
		this.exist = 0;

	function addCollTest(col,row){
		if(0<=row && row <13 &&  0 <= col && col <13) collTestList.push(map.mapArray[col][row]);
	}

	function handleDestory(tile,tileType,item,destoryList){
		switch(that.type){
			case 0:
				return bullet0Handle(tile,tileType,item,destoryList);
			case 1:
				return bullet1Handle(tile,tileType,item,destoryList);
		}
	}

	function bullet0Handle(tile,tileType,item,destoryList){
		switch(tileType){
			case 0:
				destoryList.forEach(function(num){
					item[num] = 0;
				})
				that.exist = 0;
				return {
					isBoom: true,
					boomType: 0
				};
			case 1:
				that.exist = 0;
				return {
					isBoom: true,
					boomType: 0
				};
			case 3:
				return {
					isBoom: false
				};
			case 5:
				Game.Music.blast.play();
				that.exist = 0;
				tile.state.frame = 6;
				tile.remove(ctx);
				tile.draw(ctx);
				Game.Logic.isGameOver = 1;
				return {
					isBoom:true,
					boomType: 1
				};
			case 7:
				return {
					isBoom:false
				}
		}
	}
}// end of this.update;
