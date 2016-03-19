//应用对象
var App = {
	state :{
		begin :0,
		play :1,
		socre :0,
		construct :0
	},
	ctx :{}
};



App.prepare = function(tileCtx,boomCtx,grassCtx,tankCtx){
	map = readMapData(mapData);
	//添加帧图片
	Game.Tank.addFrames();
	Game.Tile.addFrames();
	Game.Bullet.addFrames();
	Game.Boom.addFrames();

	// 每帧绘制流程
	// 绘制顺序  背景 -》 地砖 -》 坦克 -》 子弹 -》 爆炸
	// 状态更新顺序： 地砖与坦克状态依赖子弹与之的碰撞，故子弹更新早于地砖和坦克
	App.ctx.tileCtx = tileCtx;
	App.ctx.boomCtx = boomCtx;
	App.ctx.grassCtx = grassCtx;
	App.ctx.tankCtx = tankCtx;	
}

App.begin = function(){
	// context.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);
	App.ctx.tileCtx.fillRect(0,0,Style.canvas,Style.canvas);
	App.ctx.boomCtx.font = "60px Geometric";
    //设置字体填充颜色
    App.ctx.boomCtx.fillStyle = "white";
    //从坐标点(50,50)开始绘制文字
	var offsetBottom = 0; 
	var width = Style.canvas *0.8;
	var height = parseInt(0.36*width);
	var x = Style.canvas *0.1;
	function draw(){
		if(offsetBottom < Style.canvas*0.8) offsetBottom += 5;
		var y = Style.canvas - offsetBottom;
		App.ctx.boomCtx.clearRect(0,0,Style.canvas,Style.canvas);
		App.ctx.boomCtx.drawImage(uiImg,0,0,375,138,x,y,width,height);
		App.ctx.boomCtx.fillText("1 PLAYER", 50, y+400);
		window.requestAnimationFrame(draw)
	}
	window.requestAnimationFrame(draw);
}
App.beignMission = function(){
	//绘制背景
	Game.Tile.renderBg(App.ctx.tileCtx);
	//绘制草地
	Game.Tile.renderGrass(App.ctx.ctxgrassCtx);
}

App.renderGame = function(){
	var frame = 0;
	function draw(){
		frame = (frame + 1)%60;

		//改变河流状态
		Game.Tile.renderRiver(App.ctx.tileCtx,frame);
		//清除坦克图层
		App.ctx.tankCtx.clearRect(0,0,832,832);

		//子弹渲染
		Game.Bullet.render(App.ctx.tileCtx,App.ctx.tankCtx);

		//坦克渲染
		Game.Tank.render(App.ctx.tankCtx,frame);

		//爆炸渲染
		Game.Boom.render(App.ctx.boomCtx);

		// if(App.state.play)
			window.requestAnimationFrame(draw);
	}
	window.requestAnimationFrame(draw);	
}