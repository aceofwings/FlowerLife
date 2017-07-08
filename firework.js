
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var circles = [];
var fps, startTime, now, next, elasped;
var nextCircle;
var anchorCircle;
var interation; 
var verticescount = 0;

var settings = {
    maxCircles : 36,
    frameRate: 60,
    gencircle: 1000
};

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

xDegrees = function(loca){ return Math.cos((loca * Math.PI / 180));};
yDegrees = function(loca){ return Math.sin((loca*Math.PI /180));};
function fireworkTick(){
    
    if (circles.length > settings.maxCircles){
	return ;
    } 
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimFrame(fireworkTick);
    now = Date.now();
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
	      
	    theta = 360 / numOfCircles(interation);
	    offset = theta * circles.length;
	    
	    if (offset % 60 == 0){
		verticescount ++ ;
		console.log(verticescount);
		if(vertices.length == 6){
		    verticescount = 0;
		}

		
	    }

	    pos = calpos(verticescount, circles, interation, anchorCircle);
	    console.log(pos);
	    circle.position.x = pos.y ;
	    circle.position.y = pos.x ;
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

function calpos(current, circles,interation,anchorCircle){
    position = {  x : 0, y: 0};
    verts = vertices(interation, anchorCircle);
    vert1 = verts[current % 6];
    vert2 = verts[(current + 1) % 6];
    out = (circles.length ) % interation;
    t = .50
    position.x = ((1- t) * vert1.x) + (t * vert2.x)  ;
    position.y = ((1- t) * vert1.y) + (t * vert2.y)  ;
    return position;
}

function vertices(interation, anchorCircle){
    points = [];

    
    x = anchorCircle.position.x;
    y = anchorCircle.position.y;

    radius = anchorCircle.radius * (interation - 1);

    for ( i = 0 ; i < 360; i += 60){
	point = {x: 0 , y: 0 };
	point.x = x + radius * xDegrees(i);
	point.y = y + radius * yDegrees(i);
	points.push(point);
    }
    
    return points;
}
function section(number){
    temp1 = Math.pow(number,3);
    temp2 = Math.pow(number-1,3);
    return temp1 - temp2
}

function numOfCircles(tier){
    return section(tier) - section(tier - 1);
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



