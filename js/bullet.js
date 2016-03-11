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
		width: Style.bullet,
		height: Style.bullet
	}

	this.exist = 1;
	this.frame = [];
	this.frame.push(new Sprite(miscImg,0,0,8,8));
	
	this.update = function(tileList){
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

		tileList.forEach(function(ele){
			var collResult = Collision.isColl(that,ele);
			var childList = []; 
			if( collResult.isColl ){
				childList = ele.createChildColl();
				if(!childList.length) return;
				childList.forEach(function(ele){
					var collResult = Collision.isColl(that,ele);
					if(collResult.isColl){
						var item = ele.tile;
						switch(state.direction){
							case 0:
								if(item.complete){
									item.list = [1,1,0,0];
									item.complete = 0;
								}else{
									item.list = [0,0,0,0];
									item.collState = 0;
								}
								break;
							case 1:
								if(item.complete){
									item.list = [0,1,0,1];
									item.complete = 0;
								}else{
									item.list = [0,0,0,0];
									item.collState = 0;
								}
								break;
							case 2:
								if(item.complete){
									item.list = [0,0,1,1];
									item.complete = 0;
								}else{
									item.list = [0,0,0,0];
									item.collState = 0;
								}
								break;
							case 3:
								if(item.complete){
									item.list = [1,0,1,0];
									item.complete = 0;
								}else{
									item.list = [0,0,0,0];
									item.collState = 0;
								}
								break;
						}
						that.exist = 0;
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



		if((state.x < Style.bullet/2) || (state.x > Style.canvas-Style.bullet/2) || (state.y < Style.bullet/2) || (state.y > Style.canvas-Style.bullet/2) ) 
			this.exist = 0;

	}
	this.draw = function(ctx){
		this.frame[this.state.frame].draw(ctx,this.state.x,this.state.y,Style.bullet,Style.bullet,this.state.rota);
	}

}