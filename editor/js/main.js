function main(){
	Tile.prototype.addFrame(tileImg,1120,0,32,32);
	Tile.prototype.addFrame(tileImg,640,0,32,32);
	Tile.prototype.addFrame(tileImg,0,0,32,32);
	Tile.prototype.addFrame(tileImg,96,0,32,32);
	Tile.prototype.addFrame(tileImg,128,0,32,32);
	Tile.prototype.addFrame(tileImg,32,0,32,32);
	Tile.prototype.addFrame(tileImg,64,0,32,32);
	var initType = 0;
	var tileType = 0;
	var mapTiles = [];
	var choiceList = [];
	var data = [];
	var datainput = document.getElementById('data');
	var map = document.getElementById('map');
	mapCtx = map.getContext('2d');
	var typeChoice = document.getElementById('typeChoice');
	typeChoiceCtx = typeChoice.getContext('2d');

	var isDelete = 0;
	var deleteButton = document.getElementById('delete');
	deleteButton.addEventListener('click',function(){
		if(isDelete){
			this.style.backgroundColor = 'red';
			isDelete = 0;
		}else{
			this.style.backgroundColor = 'black';
			isDelete = 1;
		}
	})
	map.addEventListener('click',function(e){
		var corrd = corrdinate(this,e);
		var nX = corrd.nX;
		var nY = corrd.nY;
		var x = (nX-1)*64 + 32;
		var y = (nY-1)*64 + 32;
		// console.log(x + ',' + y);
		if(isDelete){
			var testElement = new Sprite(0,0,5,5);
			testElement.state.x = x;
			testElement.state.y = y;
			mapTiles.forEach(function(tile,index){
				var collResult = Collision.isColl(testElement,tile);
				if(collResult.isColl){
					mapTiles.splice(index,1);
				}
			})
			drawMap(mapCtx);
			creatMapData();
			return;
		}
		mapTiles.push(new Tile(x,y,0,0,tileType,initType));
		drawMap(mapCtx);
		creatMapData();
	})

	typeChoice.addEventListener('click',function(e){
		var corrd = corrdinate(this,e);
		var nX = corrd.nX;
		var nY = corrd.nY;
		var x = (nX-1)*64 + 32;
		var y = (nY-1)*64 + 32;
		var testElement = new Sprite(0,0,5,5);
		testElement.state.x = x;
		testElement.state.y = y;
		choiceList.forEach(function(tile,index){
			var collResult = Collision.isColl(testElement,tile);
			if(collResult.isColl){
				initType = tile.state.initType;
				tileType = tile.type;
				console.log(tileType)
			}
		})
	})

	drawMap(mapCtx);

	renderChoiceType();
	drawLine(typeChoiceCtx)

	function drawLine(ctx){
		ctx.strokeStyle = 'red';
		ctx.lineWidth = '2px';
		for(var i = 1; i<13; i++){
			ctx.beginPath();
			ctx.moveTo(i*64,0);
			ctx.lineTo(i*64,832);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0,i*64);
			ctx.lineTo(832,i*64);
			ctx.stroke()
		}
	}

	function renderChoiceType(){
		choiceList = []
		for(var i = 0; i < 34 ; i++){
			if(i<13){
				choiceList.push(new Tile(32,32+(i*64),0,0,0,i));
			}else if(i < 26){
				if(i <15){	
					choiceList.push(new Tile(96,32+((i-13)*64),0,0,0,i));
				}else{			
					choiceList.push(new Tile(96,32+((i-13)*64),0,0,1,i-15));
				}
			}else{
				if(i < 30) choiceList.push(new Tile(160,32+((i-26)*64),0,0,1,i-15));
				if(i === 30) choiceList.push(new Tile(160,32+((i-26)*64),0,0,2,14));
				if(i === 31) choiceList.push(new Tile(160,32+((i-26)*64),0,0,3,14));
				if(i === 32) choiceList.push(new Tile(160,32+((i-26)*64),0,0,5,14));		
				if(i === 33) choiceList.push(new Tile(160,32+((i-26)*64),0,0,6,14));

			}
		}   
		choiceList.forEach(function(ele){
			ele.draw(typeChoiceCtx);
			ele.drawDestory(typeChoiceCtx);
		})
	}

	function corrdinate(element,event){
		var dx = element.offsetLeft;
		var dy = element.offsetTop;
		var nX = Math.ceil( (event.clientX + document.body.scrollLeft -dx)/64 );
		var nY = Math.ceil( (event.clientY + document.body.scrollTop -dy)/64 );
		return {
			nX: nX,
			nY: nY
		}
	}

	function drawMap(ctx){
		//绘制背景
		ctx.fillRect(0,0,Style.canvas,Style.canvas);
		mapTiles.forEach(function(ele){
			ele.draw(ctx);
			ele.drawDestory(ctx);
		})
		drawLine(ctx);
	}

	function creatMapData(){
		data = new Array();
		mapTiles.forEach(function(ele){
			var state = ele.state;
			x = state.x;
			y = state.y;
			initType = state.initType;
			type = ele.type;
			data.push({
				x: x,
				y: y,
				initType: initType,
				type: type
			})
		})

		datainput.value = JSON.stringify(data);
		// console.log(datainput);	
	}
}