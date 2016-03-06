//键盘事件管理
//keyBind([key],[handle])
var Action = {};
Action.keyBind = (function(){
	var eventDownList = [],
		eventUpList = [];

	document.onkeydown = function(e){
		eventDownList.forEach(function(ele,index){
			if(e.keyCode === ele.keyCode) ele.handle();
		})
	}

	document.onkeyup = function(e){
		eventUpList.forEach(function(ele,index){
			if(e.keyCode === ele.keyCode) ele.handle();
		})
	}

	return function(state,keyChar,handle){
		var keyCode = keyChar.charCodeAt();
		var ele = {
			keyCode : keyCode,
			handle : handle
		}	
		switch(state){
			case 'down': 
				eventDownList.push(ele);
				break;
			case 'up':
				eventUpList.push(ele);
				break;
		}
	}
})()


	// Action.keyBind('W',function(){
	// 	console.log('w')
	// })

	// Action.keyBind('S',function(){
	// 	console.log('s')
	// })

	// Action.keyBind('A',function(){
	// 	console.log('a')
	// })

	// Action.keyBind('D',function(){
	// 	console.log('d')
	// })


