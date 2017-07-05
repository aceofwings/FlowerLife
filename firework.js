
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
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
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
	    

	    theta = 360.0 / 6  ;
	    loca = (circles.length - 1)  * theta;

	    console.log(Math.cos() * (180/Math.PI))
	    
	    addX = circle.radius *  Math.cos((loca * Math.PI) /180 );
	    addY = circle.radius *  Math.sin((loca * Math.PI / 180));
	    console.log("Circle "  + circles.length + "  TransLate " +addX + " : " + addY + " Theta " + theta
			+ " Loca "  + loca );


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



