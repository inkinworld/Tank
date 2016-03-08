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

	this.coll = {
		L1: {
			state: 1,
			list: [1,1,1,1] 
		},
		L2: {
			state: 1,
			list: [1,1,1,1] 
		},
		R1: {
			state: 1,
			list: [1,1,1,1] 
		},
		R2: {
			state: 1,
			list: [1,1,1,1] 
		}
	}

	this.draw = function(ctx){
		this.frame[this.state.frame].draw(ctx,this.state.x,this.state.y,Style.title,Style.title,this.state.rota);
		this.drawDestory(ctx);
	}

	// 损毁的地砖处理
	this.drawDestory =function(ctx){
		var that = this;
		var quenue = ['L1','L2','R1','R2'];
		quenue.forEach(function(ele,index){ 
			var item = that.coll[ele];
			if(!item.state){
				// console.log(ele);
				var x = (index%2)? that.state.x : that.state.x - Style.tank/2;
				var y = (index < 2)? that.state.y - Style.tank/2: that.state.y; 
				console.log(x);
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