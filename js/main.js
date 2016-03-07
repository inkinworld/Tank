var ctx,
	iframes;

function main(){
	ctx = document.getElementById('canvas').getContext('2d');
	Tanks.myTank = new MyTank(32,32,0,0,0);
	Tanks.myTank.keyBoard();
	Tiles.test = new Tile(32,32,0,0,0);
	console.log(Tiles.test)
	var iframes = 0;
	function draw(){
		iframes = (iframes + 1)%60;
		ctx.clearRect(0,0,Style.canvas,Style.canvas);
		Tiles.test.draw(ctx);
		Tanks.myTank.update(iframes);
		Tanks.myTank.draw(ctx);
		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
}