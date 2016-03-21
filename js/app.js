function Sense(prepare){
	this.isPrepared =  0;
	this.isFinished = 0;
	this.isKeyBind = 0;
	this.prepare = prepare;
}
Sense.prototype.init = function(){
	this.isPrepared =  0;
	this.isFinished = 0;
	this.isKeyBind = 0;
}

//应用对象
var App = {
	canvas : {},
	ctx : {},
	frame :0
};
App.static = {
		loading: 0,
		choiceMission :1,
		game: 2,
		score :3,
		construct :0
	};

App.state = App.static.loading;
App.lastState = App.static.loading;

App.initAllSense = function(){
	App.load.init();
	App.choiceMission.init();
	App.game.init();
	App.score.init();
}
App.main = function(){
	switch(App.state){
		case  App.static.loading:
			App.currentSense = App.load;
			break;
		case App.static.choiceMission:
			App.currentSense = App.choiceMission;
			break;	
		case App.static.game:
			App.currentSense = App.game;
			break;		
		case App.static.score:
			App.currentSense = App.score;
			break;	
	}

	if(!App.currentSense.isPrepared){
		App.currentFunction = App.currentSense.prepare();
		App.currentSense.isPrepared = 1;
	}
	if(App.currentSense.isPrepared){
		App.currentFunction.render();
	}
	if(App.currentSense.isFinished && App.currentSense.isPrepared && !App.currentSense.isKeyBind){
		App.currentFunction.keyBind();
		App.currentSense.isKeyBind = 1;
	}
	window.requestAnimationFrame(App.main);
}

App.prepare = function(tile,boom,grass,tank,buffer){
	//添加帧图片
	Game.Tank.addFrames();
	Game.Tile.addFrames();
	Game.Bullet.addFrames();
	Game.Boom.addFrames();

	// 每帧绘制流程
	// 绘制顺序  背景 -》 地砖 -》 坦克 -》 子弹 -》 爆炸
	// 状态更新顺序： 地砖与坦克状态依赖子弹与之的碰撞，故子弹更新早于地砖和坦克
	App.canvas.tile = tile;
	App.canvas.boom = boom;
	App.canvas.grass = grass;
	App.canvas.tank = tank;
	App.canvas.buffer = buffer;	

	App.ctx.tile = tile.getContext('2d');
	App.ctx.boom = boom.getContext('2d');
	App.ctx.grass = grass.getContext('2d');
	App.ctx.tank = tank.getContext('2d');
	App.ctx.buffer = buffer.getContext('2d');	

}

App.load = new Sense(null);
App.load.prepare = function(){
	//初始化游戏状态
	Game.Logic.initGame();
	var that = this;
	var width = Style.canvasWidth *0.8;
	var height = parseInt(0.36*width);
	var x = Style.canvasWidth *0.1;
	var y = Style.canvas *0.2;
	var dy = Style.canvas;
	var word1 = "1 PLAYER";
	var word1_Y = Style.canvas * 0.65;
	var word1_X = Style.canvasWidth * 0.4;
	var word2 = "2 PLAYERS";
	var word2_Y = Style.canvas * 0.7;
	var word2_X = Style.canvasWidth * 0.4;
	var word3 = "纯属山寨，素材来自以太幻想前辈"
	var word3_Y = Style.canvas * 0.8;
	var word3_X = Style.canvasWidth * 0.25;
	var word4 = "I-   00 Hi-  20000";
	var word4_Y = Style.canvas * 0.15;
	var word4_X = Style.canvasWidth * 0.1;
	App.ctx.tile.fillRect(0,0,Style.canvasWidth,Style.canvas);
	App.ctx.buffer.font = "30px prstartk";
    App.ctx.buffer.fillStyle = "white";
	App.ctx.buffer.drawImage(uiImg,0,0,375,138,x,y,width,height);
	App.ctx.buffer.fillText(word1,word1_X,word1_Y);	
	App.ctx.buffer.fillText(word2,word2_X,word2_Y);	
	// App.ctx.buffer.fillText(word3,word3_X,word3_Y);	
	App.ctx.buffer.fillText(word4,word4_X,word4_Y);	
	var tankCusor = new Tank();	
	tankCusor.state.rota = 90;
	tankCusor.state.x = Style.canvasWidth * 0.35;
	tankCusor.state.y = 0.62 *Style.canvas;

	var counter = newCounter(0,1);
   
	function render(){
		App.frame = (App.frame + 1)%60;
		if(that.isFinished){
			tankCusor.state.frame = Math.floor(App.frame/4)%2 +tankCusor.type;
			tankCusor.draw(App.ctx.boom);
		}else{
			if(dy > 0) {
				dy -= 5;
				App.ctx.grass.clearRect(0,0,Style.canvas,Style.canvas);
				App.ctx.grass.drawImage(App.canvas.buffer,0,0,Style.canvasWidth,Style.canvas,0,dy,Style.canvasWidth,Style.canvas);
			}else{
				that.isFinished = 1;
				tankCusor.draw(App.ctx.boom);
			}
		}
	}

	function keyBind(){
		Action.keyBind.bind('down','S',function(){
			App.ctx.boom.clearRect(0,0,Style.canvas,Style.canvas);
			var y = (counter.reduce() * 0.05*Style.canvas) + (0.62 *Style.canvas);
			tankCusor.state.y = y;
		})
		Action.keyBind.bind('down','W',function(){
			App.ctx.boom.clearRect(0,0,Style.canvas,Style.canvas);
			var y = (counter.add() * 0.05*Style.canvas) + (0.62 *Style.canvas);
			tankCusor.state.y = y;
		})
		Action.keyBind.bind('down','J',function(){
			App.state = App.static.choiceMission;
		})
	}

	return {
		render : render,
		keyBind : keyBind
	}
}

App.choiceMission = new Sense(null);
App.choiceMission.prepare = function(){
	that = this;
	Action.keyBind.clear();
	App.ctx.grass.clearRect(0,0,Style.canvasWidth,Style.canvas);
	App.ctx.boom.clearRect(0,0,Style.canvasWidth,Style.canvas);
	// 幕布是否正在关闭
	var isClose = 1;
	//幕布是否正在打开
	var isOpen = 0; 
	var missionNum = 0;
	var offset = 0;
	var width = Style.canvasWidth;
	var height = 0;
	var dy = 0;
	App.ctx.grass.fillStyle = 'gray';
	App.ctx.boom.font = "40px prstartk";
    App.ctx.boom.fillStyle = "black";

	var counter = newCounter(0,34)

	function render(){
		if(isClose){
			//绘制银幕关闭
			if(height < Style.canvas/2){
				height +=5;
				dy = Style.canvas - height;
				App.ctx.grass.fillRect(0,0,width,height);
				App.ctx.grass.fillRect(0,dy,width,height);
			}else{
				isClose = 0;
				that.isFinished = 1;
			}
		}else{
			App.ctx.boom.clearRect(0,0,width,width);
			App.ctx.boom.fillText('STAGE '+counter.n(),width*0.4,Style.canvas/2);
		}
	}

	function keyBind(){
		// consoel.log('has binded')
		Action.keyBind.bind('down','S',function(){
			counter.reduce();	
		})
		Action.keyBind.bind('down','W',function(){
			counter.add();
		})
		Action.keyBind.bind('down','J',function(){
			App.state = App.static.game;
			Game.Logic.currentMission = counter.n();
		})
	}
	return {
		render : render,
		keyBind : keyBind
	}
}

App.game = new Sense(null);
App.game.prepare = function(){
	//读取地图数据
	map = readMapData(mapData[Game.Logic.currentMission]);	
	var that = this;
	Action.keyBind.clear();
	var width = Style.canvas;
	var height = width/2;
	var dy = 0;
	var gameOverDy = Style.canvas;
	App.ctx.boom.clearRect(0,0,Style.canvasWidth,width);
	App.ctx.grass.clearRect(0,0,Style.canvasWidth,width);
	App.ctx.boom.fillStyle = 'gray';	
	//绘制背景
	Game.Tile.renderBg(App.ctx.tile);
	Game.Thumbnail.render(App.ctx.tile);
	//绘制草地
	Game.Tile.renderGrass(App.ctx.grass);
	var counter = (function(){
	var num = 0;
		var upLimit = 1;
		function add(){
			num += 1;
			if(num > upLimit) num = 0;
			return num;
		}
		function reduce(){
			num -= 1;
			if(num <0) num = upLimit;
			return num;
		}
		function n(){
			return num;
		}
		return {
			add :add,
			reduce :reduce,
			n :n
		}
	})()

	function renderGameOver(){
		if(gameOverDy > Style.canvas *0.4){
			gameOverDy -=4;
			var ctx = App.ctx.boom;
			ctx.save();
			ctx.fillStyle = 'red';
			ctx.font = "40px prstartk";
			ctx.fillText("GAME",Style.canvas*0.5,gameOverDy);	
			ctx.fillText("OVER",Style.canvas*0.5,gameOverDy+40);	
			ctx.restore();	
		}else{
			App.state = App.static.score;
		}
	}
	function render(){
		if(Game.Logic.isBegin){
			if(Game.Logic.isPause) {
				App.ctx.boom.fillText('PAUSE',Style.canvasWidth*0.4,width/2);	
			}else{
				Game.Logic.gameStatae();
				Game.Logic.createHero();
				Game.Logic.createEnemy();

				App.frame = (App.frame + 1)%60;
				//改变河流状态
				Game.Tile.renderRiver(App.ctx.tile,App.frame);
				//清除坦克图层
				App.ctx.tank.clearRect(0,0,832,832);

				//子弹渲染
				Game.Bullet.render(App.ctx.tile,App.ctx.tank);

				//坦克渲染
				Game.Tank.render(App.ctx.tank,App.frame);

				//爆炸渲染
				Game.Boom.render(App.ctx.boom);

				if(Game.Logic.isGameOver){
					renderGameOver();
				}
			}
		}else{
			//绘制银幕打开
			if(height > 0){
				App.ctx.boom.clearRect(0,0,Style.canvasWidth,width);
				height -=5;
				dy = width - height;
				App.ctx.boom.fillRect(0,0,Style.canvasWidth,height);
				App.ctx.boom.fillRect(0,dy,Style.canvasWidth,height);
			}else{
				Game.Logic.isBegin = 1;
				that.isFinished = 1;
			}
		}
	}
	function keyBind(){
		Action.keyBind.bind('down','K',function(){
			Game.Logic.isPause = counter.add();
		})
	}
	return {
		render : render,
		keyBind : keyBind
	}
}

App.score = new Sense(null);
App.score.prepare = function(){

	App.ctx.grass.clearRect(0,0,Style.canvasWidth,Style.canvas);
	App.ctx.boom.clearRect(0,0,Style.canvasWidth,Style.canvas);
	App.ctx.tile.clearRect(0,0,Style.canvasWidth,Style.canvas);
	App.ctx.tank.clearRect(0,0,Style.canvasWidth,Style.canvas);

	App.ctx.boom.save();
	App.ctx.boom.fillStyle = 'black';
	App.ctx.boom.fillRect(0,0,Style.canvasWidth,Style.canvas);
	App.ctx.boom.fillStyle = 'red';
	App.ctx.boom.font = "32px prstartk";
	App.ctx.boom.fillText("HI-SCOER",Style.canvas*0.3,Style.canvas*0.1);	
	App.ctx.boom.fillText("I-PLAYER",Style.canvas*0.1,Style.canvas*0.3);
	App.ctx.boom.fillStyle = 'white';
	App.ctx.boom.fillText("STAGE " + Game.Logic.currentMission,Style.canvas*0.5,Style.canvas*0.2);
	App.ctx.boom.fillText("抱歉施工中。。。" ,Style.canvas*0.3,Style.canvas*0.6);
	App.ctx.boom.fillText("功能逐步完善中。。。" ,Style.canvas*0.3,Style.canvas*0.65);

	App.ctx.boom.restore();	
	var counter = newCounter(1);
	function render(){
		if(counter.add() === 100 ){
			App.initAllSense();
			App.state = App.static.loading;
			App.ctx.grass.clearRect(0,0,Style.canvasWidth,Style.canvas);
			App.ctx.boom.clearRect(0,0,Style.canvasWidth,Style.canvas);	
			App.ctx.tile.clearRect(0,0,Style.canvasWidth,Style.canvas);
			App.ctx.tank.clearRect(0,0,Style.canvasWidth,Style.canvas);
		}
	}

	function keyBind(){

	}
	return {
		render :render,
		keyBind :keyBind 
	}
}