function main(){

	//获得个图层
	var tileCtx = document.getElementById('canvas').getContext('2d');
	var boomCtx = document.getElementById('boomLayer').getContext('2d');
	var grassCtx = document.getElementById('grassLyer').getContext('2d');
	var tankCtx = document.getElementById('tankLayer').getContext('2d');
	
	Tanks.myTank = new MyTank(96,800,0,0,0,0);
	Tanks.myTank.keyBoard();
	Tanks.teamList[0].push(Tanks.myTank);
	// Tanks.teamList[1].push(new AiTank(96,32,0,0,2,1));
	// Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));
	// Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));
	// Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));
	// Tanks.teamList[1].push(new AiTank(0,0,0,0,2,1));

	App.prepare(tileCtx,boomCtx,grassCtx,tankCtx);
	App.begin();
	// App.beignMission();
	// App.renderGame();

}
