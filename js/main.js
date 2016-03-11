var ctx,
	iframes;

function main(){
	ctx = document.getElementById('canvas').getContext('2d');
	Tanks.myTank = new MyTank(96,32,0,0,0);
	Tanks.myTank.keyBoard();
	t1 = new Tile(32,32,0,0,0);
	t2 = new Tile(320,384,0,0,0);
	t3 = new Tile(32,32,0,0,0);
	t4 = new Tile(160,160,0,0,0);
	t = [];
	t.push(t1);
	t.push(t2);
	// t.push(t3);
	t.push(t4);
	var iframes = 0;
	function draw(){
		iframes = (iframes + 1)%60;

		ctx.fillRect(0,0,Style.canvas,Style.canvas);

		Bullets.list.forEach(function(ele){
			ele.update(t);
			ele.draw(ctx);
		})

		t.forEach(function(ele){
			ele.update();
			ele.draw(ctx);
		})

		BulletsClear();
		Tanks.myTank.update(iframes,t);
		Tanks.myTank.draw(ctx);
		// console.log(Collision.isColl(Tanks.myTank,Tiles.test).isColl)
		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
}


function drawBackground(){
	var bac = []
}
