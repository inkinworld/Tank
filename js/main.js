function main(){

	//获得个图层
	var tile = document.getElementById('canvas')
	var boom = document.getElementById('boomLayer')
	var grass = document.getElementById('grassLyer')
	var tank = document.getElementById('tankLayer')
	var buffer = document.getElementById('buffer')
	
	App.prepare(tile,boom,grass,tank,buffer);
	window.requestAnimationFrame(App.main);	
	// App.beignMission();
	// App.renderGame();

}
