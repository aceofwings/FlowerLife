
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var circles = [];
var fps, startTime, now, next, elasped;
var nextCircle;
var anchorCircle;
var interation; 


var settings = {
    maxCircles : 6,
    frameRate: 60,
    gencircle: 1000
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
    
    if (circles.length > settings.maxCircles){
	return ;
    } 
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimFrame(fireworkTick);

    now = Date.now()

   
    elasped = now - then;
    lastgen = now - nextCircle;
    if(elasped > fps){
	then = now - (elasped % fps);


	// lets add a circle
	if(settings.gencircle < lastgen){
	    if (circles.length >= section(interation)){
		interation ++ ;
	    }
	    
	    nextCircle = now;
	    
	    circle = newCircle();
	    

	    theta = 360.0 / section(interation)  ;
	    loca = (circles.length - 1)  * theta;

	    
	    addX = circle.radius *  Math.cos(loca);
	    addY = circle.radius *  Math.sin(loca);
	    console.log(circles.length)
	    console.log(theta)

	    circle.position.x = anchorCircle.position.x + addX;
	    circle.position.y = anchorCircle.position.y + addY;
	    circles.push(circle);
	   

	    
	
	    
	    
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
    nextCircle = then;
    circle = newCircle();
    circle.position.x = center.x;
    circle.position.y = center.y;
    interation = 1;
    circles.push(circle);
    anchorCircle = circle;
}

function section(number){
    temp1 = Math.pow(number,3);
    temp2 = Math.pow(number-1,3);

    return temp1 - temp2 
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



