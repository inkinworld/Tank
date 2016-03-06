	ctx = document.getElementById('canvas').getContext('2d');
	Tanks.myTank = new MyTank();
	Tanks.myTank.keyBoard();
	var iframes = 0;
	function draw(){
		iframes = (iframes + 1)%60
		ctx.clearRect(0,0,Style.canvas,Style.canvas);
		TankDraw(iframes);
		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);