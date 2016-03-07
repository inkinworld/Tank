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

	this.draw = function(ctx){
		this.frame[this.state.frame].draw(ctx,this.state.x,this.state.y,Style.title,Style.title,this.state.rota);
	}
}