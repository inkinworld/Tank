var Tiles = {};
Tiles.list = [];
// 地砖素材图片，在load模块中加载；；
var tileImg;

Tile.prototype = new Sprite(Style.tile ,Style.tile ,Style.tile ,Style.tile);
function Tile(x,y,rota,direction,type,initType){
	this.state = {
		x : x,
		y : y,
		rota : rota,
		// 0 --> up
		// 1 --> right
		// 2 --> down
		// 3 --> left 
		direction : direction,
		frame : type,
		initType : initType
		}

	//	 一块 [大砖块] 由四个 [小砖块] 构成（L1,R1,L2,R2）,
	//   每个 [小砖块] 由四个 [小方块] 小方块（0,1,2,3）构成
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
	this.coll = initColl(initType);

	// 完整的大砖块的coll
	// {
	// 	L1: {
	// 		collState: 1,
	// 		complete : 1,
	// 		list: [1,1,1,1] 
	// 	},
	// 	L2: {
	// 		collState: 1,
	// 		complete : 1,
	// 		list: [1,1,1,1] 
	// 	},
	// 	R1: {
	// 		collState: 1,
	// 		complete : 1,
	// 		list: [1,1,1,1] 
	// 	},
	// 	R2: {
	// 		collState: 1,
	// 		complete : 1,
	// 		list: [1,1,1,1] 
	// 	}
	// }	

	this.type = type;
	this.createChildColl = function(){
		var list = [];
		var that =this;
		var quenue = ['L1','R1','L2','R2'];
		quenue.forEach(function(ele,index){
			var item = that.coll[ele];
			if(item.collState){
				var result = {
					tile: item,
					state:{
						x: (index%2)? that.state.x + Style.tank/4 : that.state.x - Style.tank/4,
						y: (index < 2)? that.state.y - Style.tank/4 : that.state.y + Style.tank/4
					},
					volume:{
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

	this.update = function(frames){
		var that = this;
		var quenue = ['L1','R1','L2','R2'];
		quenue.forEach(function(ele){
			var ele = that.coll[ele];
			var list = ele.list;
			if( !(list[0] || list[1] || list[2] || list[3]) )
				ele.collState = 0;
		})
	}

	// 损毁的地砖绘制
	this.drawDestory =function(ctx){
		var that = this;
		var quenue = ['L1','R1','L2','R2'];
		quenue.forEach(function drawDestory1(ele,index){ 
			var item = that.coll[ele];
			if(!item.complete){
				// console.log(ele);
				var x = (index%2)? that.state.x : that.state.x - Style.tank/2;
				var y = (index < 2)? that.state.y - Style.tank/2: that.state.y; 
				// console.log(x);
				item.list.forEach(function drawDestory2(ele,index){
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

	function initColl(initType,type){
		var collTypeList = [
			[1,0,0,0],
			[0,1,0,0],
			[1,1,0,0],
			[0,0,1,0],
			[1,0,1,0],
			[0,1,1,0],
			[1,1,1,0],
			[0,0,0,1],
			[1,0,0,1],
			[0,1,0,1],
			[1,1,0,1],
			[0,0,1,1],
			[1,0,1,1],
			[0,1,1,1],
			[1,1,1,1]
		];
		var collType = collTypeList[initType]; 
		var L1 = returnColl(collType[0]);
		var R1 = returnColl(collType[1]);
		var L2 = returnColl(collType[2]);
		var R2 = returnColl(collType[3]);
		return {
			L1: L1,
			L2: L2,
			R1: R1,
			R2: R2
		}

		function returnColl(isTrue){
			return isTrue ?  {collState: 1, complete: 1, list: [1,1,1,1]} :  {collState: 0, complete: 0, list: [0,0,0,0]} ;
		}
	}

}