var Collision = {};
Collision.isColl = function(a,b){
	// rigth -->0
	// left  -->1
	// down  -->0
	// up    -->1
	var dx = a.state.x - b.state.x;
	var dy = a.state.y - b.state.y;
	var positionX = (dx>0)? 0:1;
	var positionY = (dy>0)? 0:1;
	var width = (a.graph.width + b.graph.width)/2; 
	var height = (a.graph.height + b.graph.height)/2; 
	var coll = (Math.abs(dx)<width && Math.abs(dy)<height)? true:false; 

	return {
		position: {
			dx: dx,
			dy: dy
		},
		isColl: coll, 
	}
}