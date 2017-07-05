
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var circles = [];
var fps, startTime, now, next, elasped;

var settings = {
    maxCircles : 100,
    frameRate: 60
}

//fetch the browsers animation frame function. 
window.requestAnimFrame= function(callback){
    window.requestAnimationFrame(callback);
}

function setCanvas(width,height){
    canvas.width = width;
    canvas.height = height;
}

function resize(width,height){

}

//returns the center of the canvas
function centerofCanvas(){
    return {
	x: ( canvas.width/2),
	y:(canvas.height/2)
    };
    
}

function fireworkTick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);


    
    requestAnimFrame(fireworkTick);

    now = Date.now()
    
    elasped = now - then;

    if(elasped > fps){
	then = now - (elasped % fps);


	gencircle = now / 3000
	
	if(circles.length < gencircle){
	    
	    
	}

	for (circle in circles){
	    drawCircle(circles[circle],ctx);
	}

	
    }
}

function setup(){
    fps = (1000/settings.frameRate);
    setCanvas(window.innerWidth,window.innerHeight);
    then = Date.now();
    center = centerofCanvas()
    startTime = then;
    circle = newCircle();
    circle.position.x = center.x;
    circle.position.y = center.y;
    circles.push(circle);
    
    
    
}
function  update(){

}
function render(){
    
}



window.onresize = function(event) {
    setCanvas(window.innerWidth,window.innerHeight);
};


setup();
fireworkTick();



