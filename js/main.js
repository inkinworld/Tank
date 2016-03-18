function main(){
	var ctx,
	iframes;
	map = readMapData(mapData);
	//添加帧图片
	Tank.prototype.addFrame(tankImg,0,0,32,32);
	Tank.prototype.addFrame(tankImg,448,0,32,32);
	Tank.prototype.addFrame(tankImg,128,0,32,32);
	Tank.prototype.addFrame(tankImg,576,0,32,32);
	Tile.prototype.addFrame(tileImg,1120,0,32,32);
	Tile.prototype.addFrame(tileImg,640,0,32,32);
	Tile.prototype.addFrame(tileImg,0,0,32,32);
	Tile.prototype.addFrame(tileImg,96,0,32,32);
	Tile.prototype.addFrame(tileImg,128,0,32,32);
	Tile.prototype.addFrame(tileImg,32,0,32,32);
	Tile.prototype.addFrame(tileImg,64,0,32,32);
	Bullet.prototype.addFrame(miscImg,0,0,8,8);	

	ctx = document.getElementById('canvas').getContext('2d');
	boomCtx = document.getElementById('boomLayer').getContext('2d');
	grassCtx = document.getElementById('grassLyer').getContext('2d');
	tankCtx = document.getElementById('tankLayer').getContext('2d');
	Tanks.myTank = new MyTank(96,800,0,0,0,0);
	Tanks.myTank.keyBoard();
	Tanks.teamList[0].push(Tanks.myTank);
	Tanks.teamList[1].push(new AiTank(96,32,0,0,2,1));
	Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));
	Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));
	Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));
	Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));


	var iframes = 0;

	// 每帧绘制流程
	// 绘制顺序  背景 -》 地砖 -》 坦克 -》 子弹 -》 爆炸
	// 状态更新顺序： 地砖与坦克状态依赖子弹与之的碰撞，故子弹更新早于地砖和坦克

	//绘制背景
	ctx.fillRect(0,0,Style.canvas,Style.canvas);
	map.mapArray.forEach(function(col,index){
		col.forEach(function(tile,i){
			if(!tile) return;	
			// console.log(index,i)
			// console.log(tile);
			tile.update();
			tile.draw(ctx);
			tile.drawDestory(ctx);
		})
	})
	map.grassArray.forEach(function(tile){
		tile.update();
		tile.draw(grassCtx);
		tile.drawDestory(grassCtx);		
	})

	function draw(){
		iframes = (iframes + 1)%60;

		//改变河流状态
		map.riverArray.forEach(function(river){
			river.state.frame = Math.floor(iframes/20)%2  + 3;
			river.draw(ctx);
		})
		//清除坦克图层
		tankCtx.clearRect(0,0,832,832);
		//子弹状态更新
		Bullets.teamList.forEach(function(team,index){
			team.forEach(function bulletupdate(ele){
				// ele.remove(ctx);
				ele.update(ctx,index);
			})
			//无效子弹剔除子弹数l组
			BulletsClear();
		})
		
		// 子弹绘制
		Bullets.teamList.forEach(function(team){
			team.forEach(function bulletupdate(ele){
				ele.draw(tankCtx);
			})
		})

		TanksClear()
		Tanks.teamList.forEach(function(team){
			team.forEach(function tankupdate(ele){
				// ele.remove(tankCtx);
				ele.update(iframes);
				ele.draw(tankCtx);			
			})
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

		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
}

function createAitank(){

}