
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var circles = [];
var fps, startTime, now, next, elasped;
var nextCircle;
var interationchange = false;
var anchorCircle;
var interation; 
var verticescount = 0;
var defaultvector = {x : 0, y: 0};
var currentvectorheading = [0,2];

//Various Settings for changing the visual properties of the shape.
//Framerate - How fast you want to refresh
//MaxCircles - an integer of your choice. Use the section function to generate full rows.
//Animation- the animation effect you want to apply.
//layers - Note change this for now to the amount of layers you think should be worked on.

var settings = {
    circleRadius: 2,
    frameRate: 20,
    gencircle: 0,
    animation: bloomAnimation,
    layers: 70,
    pid: 0
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

function settingsChanged(){
    
}

function generatelife(){
    circles = [];
    circle = newCircle();
    circle.position.x = center.x;
    circle.position.y = center.y;
    interation = 1;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    circles.push(circle);
    anchorCircle = circle;

    
    maxCircles =  section(settings.layers) - 1 ;
    while ( circles.length < maxCircles){

	if (circles.length >= section(interation) - 1){
	    interation ++ ;
	    interationchange = true;	    
	}

	circle = newCircle();
	circle.radius = settings.circleRadius;
	pos = calpos( circles, interation, anchorCircle);
	circle.position.x = Math.round(pos.x);
	circle.position.y = Math.round(pos.y);
	//circle.position.x = pos.x;
	//circle.position.y = pos.y;
	circles.push(circle);
    }
    
}x

function fireworkTick(){ 
    now = Date.now();
    elasped = now - then;
    lastgen = now - nextCircle;
    if(elasped > fps){
	then = now - (elasped % fps);
	settings.animation.tick(circles);
	settings.animation.drawCircles(ctx);
    }

    settings.pid = window.requestAnimationFrame(fireworkTick);
    console.log(settings.pid);
}

function setup(){
    fps = (1000/settings.frameRate);
    setCanvas(window.innerWidth,window.innerHeight);
    then = Date.now();
    center = centerofCanvas();
    startTime = then;
    nextCircle = then;
    generatelife();
    settings.animation.setup(circles, {layers: settings.layers, sectfunc: section});
    
}

function calpos(circles,interation,anchorCircle){

    position = {  x : 0, y: 0};
    
    radius = interation * 25;

    if ( interationchange){
	interationchange = false;
	lastCirclePos = circles[circles.length -1 ].position;
	position.x = lastCirclePos.x + currentvectorheading[0] ;
	position.y = lastCirclePos.y + currentvectorheading[1]  ;
	rotatevector = rotate(0,0,currentvectorheading[0], currentvectorheading[1], 60 );
	currentvectorheading = rotatevector;
    }
    else if  ( circles.length  % interation == 0 ){
	lastCirclePos = circles[circles.length -1 ].position;
	rotatevector = rotate(0,0,currentvectorheading[0], currentvectorheading[1], 60 );
	currentvectorheading = rotatevector;
	position.x = lastCirclePos.x + currentvectorheading[0] ;
	position.y = lastCirclePos.y + currentvectorheading[1]  ;

    }else{
	lastCirclePos = circles[circles.length-1].position;
	position.x = lastCirclePos.x + (currentvectorheading[0]);
	position.y = lastCirclePos.y + (currentvectorheading[1]);
    }
    
    
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
    temp1 = Math.pow(number + 1,3);
    temp2 = Math.pow(number,3);
    return temp1 - temp2;
}

function numOfCircles(tier){
    return section(tier) - section(tier - 1) ;
}


function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
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



