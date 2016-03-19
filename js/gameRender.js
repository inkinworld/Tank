Game = {};
Game.Tank = {};
Game.Tile = {};
Game.Bullet = {};
Game.Boom = {};

Game.Tank.addFrames = function(){
	Tank.prototype.addFrame(tankImg,0,0,32,32);
	Tank.prototype.addFrame(tankImg,448,0,32,32);
	Tank.prototype.addFrame(tankImg,128,0,32,32);
	Tank.prototype.addFrame(tankImg,576,0,32,32);	
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

Game.Tank.createHero = function(){
	Tanks.myTank = new MyTank(96,800,0,0,0,0);
	Tanks.myTank.keyBoard();
	Tanks.teamList[0].push(Tanks.myTank);
}

Game.Tank.createEnemy = function(){
	Tanks.teamList[1].push(new AiTank(96,32,0,0,2,1));
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