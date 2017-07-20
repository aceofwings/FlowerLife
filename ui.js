


window.onload = function(){
    var animationform = document.getElementById("animationsettings");

    var animationTypeMenu = document.getElementById("animationType");
    var angleForm = document.getElementById("angleNumber");
    var radiusForm = document.getElementById("radius");
    var spacingForm = document.getElementById("spacing");
    var fileForm = document.getElementById("addMusic");
    var audio = document.getElementById('myAudio');

    //preload ui with default values
    angleForm.value = settings.rotationAngle;
    radiusForm.value = settings.circleRadius;
    spacingForm.value = settings.currentvectorheading[1];


    //file sources and other responsive UI
    var srcs = [];
    var songlist = document.getElementById("songlist");
    
    for (animation in Flower.animations){
	var option = document.createElement("option");
	option.text = Flower.animations[animation].name;
	option.value = animation;
	animationTypeMenu.add(option);	
    }

    fileForm.onchange = function(event){
	var immediatePlay = false;
	if (srcs.length == 0){
	    immediatePlay = true;
	}
	for (file in event.target.files){
	    if (typeof event.target.files[file] === 'object'){
		srcs.push(URL.createObjectURL(event.target.files[file]))
		var li = document.createElement("li");
		li.className = "song list-group-item";
		li.innerHTML = event.target.files[file].name;
		songlist.appendChild(li);
	    }
	}

	if (immediatePlay && audio.paused){
	    audio.src = srcs.shift();
	    audio.play();
	}
    }

    audio.onended = function(){
	if (srcs.length == 0){
	    console.log("no other files in playlist");
	}else{
	    var song = srcs.shift();
	    var elements = songlist.getElementsByTagName('li');
	    songlist.removeChild(elements[0]);
	    audio.src = song;
	    audio.play();
	}
	
    }
    
    spacingForm.onchange = function(){
	settings.currentvectorheading = [0, this.value];
	settings.animation.deinit();
	setup();
    }

    angleForm.onchange = function(){
	settings.rotationAngle = this.value;
	settings.animation.deinit();
	setup();
    }

    radiusForm.onchange = function(){
	settings.circleRadius = this.value;
	settings.animation.deinit();
	setup();
    }
    
    animationform.onsubmit = function(e){
	e.preventDefault();
    }
 
    animationTypeMenu.onchange = function(){	
	settings.animation.deinit();
	settings.animation =  Flower.animations[animationTypeMenu.selectedIndex];
	setup();

    }

    
    
    
    
    //Audio Visualizing
    var AudioContext = window.AudioContext || window.webkitAudioContext
    var audiocontext = new AudioContext();  
    
    var audioSrc = audiocontext.createMediaElementSource(audio);
    var analyser = audiocontext.createAnalyser();
    analyser.fftSize = 256
    audioSrc.connect(analyser);
    audioSrc.connect(audiocontext.destination);
    analyser.dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.fetchdata = function(){
	this.getByteFrequencyData(this.dataArray);
    }
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
//    audio.play();
    if (true){
	attachAnalyser(analyser);
    }else{
	//do something else
    }
    setup();
    fireworkTick();
    
}
