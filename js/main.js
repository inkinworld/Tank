var ctx,
	iframes;

function main(){
	ctx = document.getElementById('canvas').getContext('2d');
	Tanks.myTank = new MyTank(96,32,0,0,0);
	console.log(Tanks.myTank)
	Tanks.myTank.keyBoard();
	t1 = new Tile(32,32,0,0,0);
	t2 = new Tile(320,384,0,0,0);
	t3 = new Tile(32,32,0,0,0);
	t4 = new Tile(160,160,0,0,0);
	Tiles.list.push(t1);
	Tiles.list.push(t2);
	// Tiles.list.push(t3);
	Tiles.list.push(t4);
	console.log(Tiles.list);
	var iframes = 0;

	// 每帧绘制流程
	// 绘制顺序  背景 -》 地砖 -》 坦克 -》 子弹 -》 爆炸
	// 状态更新顺序： 地砖与坦克状态依赖子弹与之的碰撞，故子弹更新早于地砖和坦克
	function draw(){
		iframes = (iframes + 1)%60;
		//绘制背景
		ctx.fillRect(0,0,Style.canvas,Style.canvas);
		//子弹状态更新
		Bullets.list.forEach(function(ele){
			ele.update(Tiles.list);
		})
		//无效子弹剔除子弹数组
		BulletsClear();
		
		//地砖更新以及绘制
		Tiles.list.forEach(function(ele){
			ele.update();
			ele.draw(ctx);
			ele.drawDestory(ctx);
		})
		// 子弹绘制
		Bullets.list.forEach(function(ele){
			ele.draw(ctx);
		})

		Tanks.myTank.update(iframes,Tiles.list);
		Tanks.myTank.draw(ctx);

		//爆炸绘制；
		Booms.list.forEach(function(ele){
			ele.update();
		})
		BoomClear();
		Booms.list.forEach(function(ele){
			ele.draw(ctx);
		})

		// console.log(Collision.isColl(Tanks.myTank,Tiles.test).isColl)
		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
}


function drawBackground(){
	var bac = []
}
