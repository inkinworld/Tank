function main(){
	var ctx,
	    iframes;
	map = readMapData(mapData);
	//添加帧图片
	Game.Tank.addFrames();
	Game.Tile.addFrames();
	Game.Bullet.addFrames();
	Game.Boom.addFrames();

	//获得个图层
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


	iframes = 0;

	// 每帧绘制流程
	// 绘制顺序  背景 -》 地砖 -》 坦克 -》 子弹 -》 爆炸
	// 状态更新顺序： 地砖与坦克状态依赖子弹与之的碰撞，故子弹更新早于地砖和坦克

	//绘制背景
	Game.Tile.renderBg(ctx);
	//绘制草地
	Game.Tile.renderGrass(grassCtx);

	function draw(){
		iframes = (iframes + 1)%60;

		//改变河流状态
		Game.Tile.renderRiver(ctx,iframes);
		//清除坦克图层
		tankCtx.clearRect(0,0,832,832);

		//子弹渲染
		Game.Bullet.render(ctx,tankCtx);

		//坦克渲染
		Game.Tank.render(tankCtx,iframes);

		//爆炸渲染
		Game.Boom.render(boomCtx);

		// if(App.state.play)
			window.requestAnimationFrame(draw);
	}
		window.requestAnimationFrame(draw);
}

function createAitank(){

}