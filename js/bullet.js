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
	this.addFrame(miscImg,0,0,8,8);
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