function main(){
	var tileType = 0;
	var mapTiles = [];
	var data = [];
	var datainput = document.getElementById('data');
	var map = document.getElementById('map');
	mapCtx = map.getContext('2d');
	var typeChoice = document.getElementById('typeChoice');
	typeChoiceCtx = typeChoice.getContext('2d');

	map.addEventListener('click',function(e){
		var corrd = corrdinate(this,e);
		var nX = corrd.nX;
		var nY = corrd.nY;
		var x = (nX-1)*64 + 32;
		var y = (nY-1)*64 + 32;
		// console.log(x + ',' + y);

		mapTiles.push(new Tile(x,y,0,0,0,tileType));
		drawMap(mapCtx);
		creatMapData();
	})

	typeChoice.addEventListener('click',function(e){
		var corrd = corrdinate(this,e);
		var nX = corrd.nX;
		var nY = corrd.nY;
		if(nX<2){
			tileType = nY - 1;
		}else{
			tileType = nY - 1 +13;
		}
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
		for(var i = 0; i < 15; i++){
			if(i<13){
				choiceList.push(new Tile(32,32+(i*64),0,0,0,i));
			}else if(i < 26){			
				choiceList.push(new Tile(96,32+((i-13)*64),0,0,0,i));
			}else{
				choiceList.push(new Tile(160,32+((i-26)*64),0,0,0,i));
			}
		}   
		choiceList.push(new Tile(32,32,0,0,0,0))
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
			type = state.initType;
			data.push({
				x: x,
				y: y,
				initType: type
			})
		})

		datainput.value = JSON.stringify(data);
		// console.log(datainput);	
	}
}