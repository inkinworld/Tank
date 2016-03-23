function Music(name){
	var audio = document.createElement("audio");
	audio.src = "./source/music/" + name + ".wav";
	return audio;
}