function newCounter(type,limit){
	var num = 0;
	var upLimit = limit? limit:0;

	function add0(){
		num += 1;
		if(num > upLimit) num = 0;
		return num;
	}

	function reduce0(){
		num -= 1;
		if(num <0) num = upLimit;
		return num;
	}

	function add1(){
		return ++num;
	}

	function reduce1(){
		return --num;
	}

	function n(){
		return num;
	}

	function clear(){
		num = 0;
	}

	switch(type){
		case 0:
			return {
				add :add0,
				reduce :reduce0,
				n :n,
				clear :clear
			}
		case 1:
			return {
				add :add1,
				reduce :reduce1,
				n :n,
				clear :clear
			}
	}
}