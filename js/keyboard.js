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

	return {
		bind: function(state,keyChar,handle){
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
		},
		deBind: function(keyChar){
			var keyCode = keyChar.charCodeAt();
			eventDownList.forEach(function(ele,index){
				if(ele.keyCode === keyCode)
					eventDownList.splice(index,1);
			})
			eventUpList.forEach(function(ele,index){
				if(ele.keyCode === keyCode)
					eventUpList.splice(index,1);
			})
		},
		clear: function(){
			eventDownList = [];
			eventUpList = [];
		}
	}
})()



