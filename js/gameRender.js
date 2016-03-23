//游戏模块，将游戏各类对象的渲染，添加帧模块化
Game = {};
Game.Tank = {};
Game.Tile = {};
Game.Bullet = {};
Game.Boom = {};
Game.Thumbnail = {};
Game.Logic = {};
Game.Music = {};

Game.Thumbnail.render =function(ctx){
	ctx.save();
	ctx.fillStyle ='gray';
	ctx.fillRect(Style.canvas,0,2*Style.canvas,Style.canvas);
	ctx.restore();
	var dy = 0;
	var enemyLength = Game.Logic.enemyServive;
	for(var i = 0;i < enemyLength;i++){
		if(!(i%2)){
			ctx.drawImage(miscImg,0,16,14,16,Style.tile*13.4,Style.tile+dy,Style.enemyThumb,Style.enemyThumb);
		}else{
			ctx.drawImage(miscImg,0,16,14,16,Style.tile*14,Style.tile+dy,Style.enemyThumb,Style.enemyThumb);
			dy += Style.tile * 0.6;
		}
	}
	ctx.drawImage(miscImg,16,16,14,16,Style.tile*13.4,Style.tile*8,Style.enemyThumb,Style.enemyThumb);
	ctx.drawImage(miscImg,128,0,64,64,Style.tile*13.4,Style.tile*9,Style.tile,Style.tile);
	ctx.save();
	ctx.font = "32px prstartk";
    ctx.fillStyle = "black";
	ctx.fillText('1P',Style.tile*13.4,Style.tile*7.8);	    
	ctx.fillText(Game.Logic.heroHp,Style.tile*14,Style.tile*8.5);
	ctx.fillText(1,Style.tile*14,Style.tile*10);
	ctx.restore();

}

Game.Tank.addFrames = function(){
	//0普通英雄坦克
	Tank.prototype.addFrame(tankImg,0,0,32,32);
	Tank.prototype.addFrame(tankImg,448,0,32,32);

	//1灰色敌方坦克
	Tank.prototype.addFrame(tankImg,128,0,32,32);
	Tank.prototype.addFrame(tankImg,576,0,32,32);
	//2红色敌方坦克	
	Tank.prototype.addFrame(tankImg,160,0,32,32);
	Tank.prototype.addFrame(tankImg,608,0,32,32);

	//3灰色敌方坦克升级1
	Tank.prototype.addFrame(tankImg,192,0,32,32);
	Tank.prototype.addFrame(tankImg,640,0,32,32);
	//4红色敌方坦克升级1
	Tank.prototype.addFrame(tankImg,224,0,32,32);
	Tank.prototype.addFrame(tankImg,672,0,32,32);

	//5灰色敌方坦克升级2
	Tank.prototype.addFrame(tankImg,256,0,32,32);
	Tank.prototype.addFrame(tankImg,704,0,32,32);
	//6红色敌方坦克升级2
	Tank.prototype.addFrame(tankImg,288,0,32,32);
	Tank.prototype.addFrame(tankImg,736,0,32,32);

	//出生动画
	Tank.prototype.addFrame(tankImg,3584,0,32,32);
	Tank.prototype.addFrame(tankImg,3616,0,32,32);
	Tank.prototype.addFrame(tankImg,3648,0,32,32);
	Tank.prototype.addFrame(tankImg,3680,0,32,32);

}

Game.Tank.render = function(ctx,frame){
	TanksClear()
	Tanks.teamList.forEach(function(team){
		team.forEach(function tankupdate(ele){
			// ele.remove(tankCtx);
			ele.update(frame);
			ele.draw(ctx);			
		})
	})
}

Game.Tile.addFrames = function(){
	Tile.prototype.addFrame(tileImg,1120,0,32,32);
	Tile.prototype.addFrame(tileImg,640,0,32,32);
	Tile.prototype.addFrame(tileImg,0,0,32,32);
	Tile.prototype.addFrame(tileImg,96,0,32,32);
	Tile.prototype.addFrame(tileImg,128,0,32,32);
	Tile.prototype.addFrame(tileImg,32,0,32,32);
	Tile.prototype.addFrame(tileImg,64,0,32,32);
	Tile.prototype.addFrame(tileImg,160,0,32,32);	
}

Game.Tile.renderBg = function(ctx){
	ctx.fillRect(0,0,Style.canvas,Style.canvas);
	App.ctx.tile.save();
	App.ctx.tile.fillStyle = 'gray';
	App.ctx.tile.fillRect(Style.canvas,0,2*Style.canvas,Style.canvas);
	App.ctx.tile.restore();
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
}

Game.Tile.renderGrass = function(ctx){
	map.grassArray.forEach(function(tile){
		tile.update();
		tile.draw(ctx);
		tile.drawDestory(ctx);		
	})

}

Game.Tile.renderRiver = function(ctx,frame){
	map.riverArray.forEach(function(river){
		river.state.frame = Math.floor(frame/20)%2  + 3;
		river.draw(ctx);
	})	
}
	
Game.Bullet.addFrames	 = function(){
	Bullet.prototype.addFrame(miscImg,0,0,8,8);		
}

Game.Bullet.render = function(ctx,tankCtx){
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
}

Game.Boom.addFrames = function(){
	Boom.prototype.addFrame(boomImg,0,0,64,64);
	Boom.prototype.addFrame(boomImg,64,0,64,64);
	Boom.prototype.addFrame(boomImg,128,0,64,64);
	Boom.prototype.addFrame(boomImg,192,0,64,64);	
	Boom.prototype.addFrame(boomImg,256,0,64,64);	
}

Game.Boom.render = function(ctx){
	// 爆炸绘制；
	//清除爆炸图层
	ctx.clearRect(0,0,832,832);
	Booms.list.forEach(function(ele){
		ele.update();
	})
	BoomClear();
	Booms.list.forEach(function(ele){
		ele.draw(ctx);
	})	
}

//游戏逻辑状态变量
//当前的关卡
Game.Logic.currentMission = 0;
//未登场敌人数量
Game.Logic.enemyNum = 20;
//存活敌人数量
Game.Logic.enemyServive = 20;
//英雄坦克HP
Game.Logic.heroHp = 3;
//英雄坦克是否存活
Game.Logic.isHero1Servive = 0;
//游戏是否失败
Game.Logic.isGameOver = 0;
//游戏是否开始
Game.Logic.isBegin = 0;
//当前关卡是否通关
Game.Logic.isSuccess = 0;
//游戏是否暂停
Game.Logic.isPause = 0;
//坦克产生的计时器
Game.Logic.heroCounter = newCounter(1);
Game.Logic.enemyCounter = newCounter(0,400);

//游戏逻辑的初始化
Game.Logic.initGame = function(){
	Game.Logic.currentMission = 0;
	Game.Logic.enemyNum = 20;
	Game.Logic.enemyServive = 20;
	Game.Logic.heroHp = 3;
	Game.Logic.enemyTime = 0;
	Game.Logic.isHero1Servive = 0;
	Game.Logic.isGameOver = 0;
	Game.Logic.isBegin = 0;
	Game.Logic.isSuccess = 0;
	Game.Logic.isPause = 0;
	Game.Logic.heroCounter = newCounter(1);
	Game.Logic.enemyCounter = newCounter(0,200);

	//重置坦克数组，子弹数组，爆炸数组；
	Tanks.teamList = [[],[]];
	Bullets.teamList = [[],[]];
	Booms.list = [];
}

//判断游戏逻辑的状态
Game.Logic.gameStatae = function(){
	var logic = Game.Logic;
	if(logic.heroHp === 0){
		logic.isGameOver = 1;
		return;
	}
	if(logic.enemyServive === 0) logic.isSuccess = 1;
}

//创建英雄坦克
Game.Logic.createHero = function(){
	var hero;
	var logic = Game.Logic;
	if(logic.isGameOver) return;
	if(logic.isHero1Servive) return;
	if(Game.Logic.heroCounter.n()<50){
		Game.Logic.heroCounter.add();
	}else{
		Game.Music.add.play();
		//解除WASDJ的按键绑定
		Action.keyBind.deBind('W');
		Action.keyBind.deBind('A');
		Action.keyBind.deBind('S');
		Action.keyBind.deBind('D');
		Action.keyBind.deBind('J');
		logic.isHero1Servive = 1;
		hero = new MyTank(320,800,0,0,0,0);
		hero.keyBoard();
		Tanks.teamList[0].push(hero);
		Game.Logic.heroCounter.clear();
	}
}

//创建敌军
Game.Logic.createEnemy = function(){
	if(Game.Logic.enemyCounter.n() === 150){
		Game.Logic.enemyCounter.add();
		if(Game.Logic.enemyNum === 0) return;
		var logic = Game.Logic;
		var team = Tanks.teamList[1];
		var n = 5 - team.length; 
		if(n === 0) return;
		Game.Music.add.play();
		if( (n >= 3) && (Game.Logic.enemyNum >= 3) ){
			Tanks.teamList[1].push(new AiTank(32,32,180,2,2,1));
			Tanks.teamList[1].push(new AiTank(416,32,180,2,5,3));
			Tanks.teamList[1].push(new AiTank(800,32,180,2,1,2));
			Game.Logic.enemyNum -= 3;
		}
		if(n === 2 && (Game.Logic.enemyNum >= 2)){
			Tanks.teamList[1].push(new AiTank(32,32,180,2,2,1));
			Tanks.teamList[1].push(new AiTank(416,32,180,2,5,3));
			Game.Logic.enemyNum -= 2;
		}
		if(n === 1 && (Game.Logic.enemyNum >= 1)){
			Tanks.teamList[1].push(new AiTank(416,32,180,2,2,1));	
			Game.Logic.enemyNum -= 1;	
		}
	}else{
		Game.Logic.enemyCounter.add();
	}

}

