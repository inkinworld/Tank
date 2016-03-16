var ctx,
	iframes;

function main(){
	map = readMapData(mapData);
	// console.log(map)
	//添加帧图片
	Tank.prototype.addFrame(tankImg,0,0,32,32);
	Tank.prototype.addFrame(tankImg,448,0,32,32);
	Tile.prototype.addFrame(tileImg,1120,0,32,32);
	Bullet.prototype.addFrame(miscImg,0,0,8,8);	
	ctx = document.getElementById('canvas').getContext('2d');
	boomCtx = document.getElementById('boomLayer').getContext('2d');
	tankCtx = document.getElementById('tankLayer').getContext('2d');
	Tanks.myTank = new MyTank(96,32,0,0,0);
	Tanks.myTank.keyBoard();
	Tanks.list.push(Tanks.myTank);
		Tanks.list.push(new AiTank(96,32,0,0,0));
		Tanks.list.push(new AiTank(0,0,0,0,0));
		Tanks.list.push(new AiTank(0,0,0,0,0));
		Tanks.list.push(new AiTank(0,0,0,0,0));
		Tanks.list.push(new AiTank(0,0,0,0,0));
		// Tanks.list.push(new AiTank(0,0,0,0,0));
		// Tanks.list.push(new AiTank(0,0,0,0,0));
		// Tanks.list.push(new AiTank(0,0,0,0,0));
	// Tanks.list.push(new AiTank(0,0,0,0,0));
	// Tanks.list.push(new AiTank(0,0,0,0,0));
	// Tanks.list.push(new AiTank(0,0,0,0,0));
	// // Tanks.list.push(new Tank(0,0,0,0,0));	
	// // Tanks.list.push(new Tank(0,0,0,0,0));

	// mapData.forEach(function(ele){
	// 	var x = ele.x;
	// 	var y = ele.y;
	// 	var type  = ele.initType;
	// 	Tiles.list.push(new Tile(x,y,0,0,0,type));
	// })

	var iframes = 0;

	// 每帧绘制流程
	// 绘制顺序  背景 -》 地砖 -》 坦克 -》 子弹 -》 爆炸
	// 状态更新顺序： 地砖与坦克状态依赖子弹与之的碰撞，故子弹更新早于地砖和坦克

	//绘制背景
	ctx.fillRect(0,0,Style.canvas,Style.canvas);

	// Tiles.list.forEach(function(ele){
	// 		ele.update();
	// 		ele.draw(ctx);
	// 		ele.drawDestory(ctx);
	// 	})

	map.forEach(function(col,index){
		col.forEach(function(tile,i){
			if(!tile) return;	
			// console.log(index,i)
			// console.log(tile);
			tile.update();
			tile.draw(ctx);
			tile.drawDestory(ctx);
		})
	})
	function draw(){
		iframes = (iframes + 1)%60;

		//清除坦克图层
		tankCtx.clearRect(0,0,832,832);
		//子弹状态更新
		Bullets.list.forEach(function bulletupdate(ele){
			// ele.remove(ctx);
			ele.update(Tiles.list,ctx);
		})
		//无效子弹剔除子弹数组
		BulletsClear();
		
		// 子弹绘制
		Bullets.list.forEach(function bulletDraw(ele){
			ele.draw(tankCtx);
		})

		// Tanks.myTank.remove(ctx);
		// Tanks.myTank.update(iframes,Tiles.list);
		// Tanks.myTank.draw(ctx);


		Tanks.list.forEach(function tankupdate(ele){
			// ele.remove(tankCtx);
			ele.update(iframes,Tiles.list);
			// ele.updateTest(iframes);
			ele.draw(tankCtx);			
		})
		// 爆炸绘制；

		//清除爆炸图层
		boomCtx.clearRect(0,0,832,832);
		Booms.list.forEach(function(ele){
			ele.update();
		})
		BoomClear();
		Booms.list.forEach(function(ele){
			ele.draw(boomCtx);
		})

		// console.log(Collision.isColl(Tanks.myTank,Tiles.test).isColl)
		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
}


function drawBackground(){
	var bac = []
}
