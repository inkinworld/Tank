var Tiles = {};
// 地砖素材图片，在load模块中加载；；
var tileImg;

function Tile(x,y,rota,direction,frame){
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
	this.frame = [];
	this.frame.push(new Sprite(tileImg,1120,0,32,32));


	this.graph = {
		width: Style.tank,
		height: Style.tank,
	}
	//	 一块大砖块的最小构成单位为16个小方块
	//	为了碰撞检测的效率，原版游戏将16个小方块分为四组，每四个小方块共用一个碰撞体积
	// 	coll.state 		0 --> 地砖已损毁，无碰撞体积
	//	      	   		1 --> 地砖存在， 有碰撞体积
	//  coll.complete   0 --> 该区域部分损毁,drawDestory方法进行重绘
	//                  1 --> 未损毁
	//               ----- -----
	//	一块大砖块：| L1 |  R1 |
	//		 		 ----- -----
	//				| L2 |  R2 | 
	//		 		 ----- -----
	//             0 --> 不显示
	//             1 --> 显示
	//  大砖块的四分之一，由四个小方块构成
	//	只有当四个小砖块都被摧毁，
	// 	coll.list: 表示如下图地砖示意图形
	//             数字代表数组对应的下标
	// 		         ----- -----
	//				|  0  |  1  |
	//		 		 ----- -----
	//				|  2  |  3  |
	//		 		 ----- -----
	this.coll = {
		L1: {
			collState: 1,
			complete : 1,
			list: [1,1,1,1] 
		},
		L2: {
			collState: 1,
			complete : 1,
			list: [1,1,1,1] 
		},
		R1: {
			collState: 1,
			complete : 1,
			list: [1,1,1,1] 
		},
		R2: {
			collState: 1,
			complete : 1,
			list: [1,1,1,1] 
		}
	}

	this.createChildColl = function(){
		var list = [];
		var that =this;
		var quenue = ['L1','R1','L2','R2'];
		quenue.forEach(function(ele,index){
			var item = that.coll[ele];
			if(item.collState){
				var result = {
					state:{
						x: (index%2)? that.state.x + Style.tank/4 : that.state.x - Style.tank/4,
						y: (index < 2)? that.state.y - Style.tank/4 : that.state.y + Style.tank/4
					},
					graph:{
						width: Style.tank/2,
						height: Style.tank/2
					}
				}
				// console.log(result);
				list.push(result);
			}
		})
		// console.log(list);
		return list;

	}

	this.draw = function(ctx){
		this.frame[this.state.frame].draw(ctx,this.state.x,this.state.y,Style.title,Style.title,this.state.rota);
		this.drawDestory(ctx);
	}

	// 损毁的地砖处理
	this.drawDestory =function(ctx){
		var that = this;
		var quenue = ['L1','R1','L2','R2'];
		quenue.forEach(function(ele,index){ 
			var item = that.coll[ele];
			if(!item.complete){
				// console.log(ele);
				var x = (index%2)? that.state.x : that.state.x - Style.tank/2;
				var y = (index < 2)? that.state.y - Style.tank/2: that.state.y; 
				// console.log(x);
				item.list.forEach(function(ele,index){
					if(!ele){
						// console.log(index);
						var drawx = (index%2)? x + Style.tank/4 : x;
						var drawy = ((index < 2)? 0 : Style.tank/4) +y;
						// ctx.fillStyle = 'red';
						ctx.fillRect(drawx,drawy,16,16);
					}
				})
			}
		})
	}
}