
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var circles = [];
var fps, startTime, now, next, elasped;
var nextCircle;
var interationchange = false;
var anchorCircle;
var interation; 
var verticescount = 0;
//Various Settings for changing the visual properties of the shape.
//Framerate - How fast you want to refresh
//MaxCircles - an integer of your choice. Use the section function to generate full rows.
//Animation- the animation effect you want to apply.
//layers - Note change this for now to the amount of layers you think should be worked on.

var settings = {
    circleRadius: 0,
    frameRate: 60,
    gencircle: 0,
    animation: waves,
    layers: 100,
    pid: 0,
    rotationAngle: 60,
    currentvectorheading: [0,10],
    analyser: null
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

function attachAnalyser(analyser){
    settings.analyser = analyser;
}
function generatelife(){
    circles = [];
    ctx.fillRect(0,0,canvas.width + 600,canvas.height + 600);
    circle = newCircle();
    circle.position.x = center.x;
    circle.position.y = center.y;
    interation = 1;
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
//	circle.position.x = pos.x;
//	circle.position.y = pos.y;
	circles.push(circle);
    }
    
}

function fireworkTick(){
    now = Date.now();
    elasped = now - then;
    lastgen = now - nextCircle;
    if(elasped > fps){
	then = now - (elasped % fps);
	settings.analyser.fetchdata();
//	ctx.fillStyle = "black";
//        ctx.fillRect(0,0,canvas.width + 600,canvas.height + 600);
	settings.animation.layout(settings.analyser.dataArray);
	settings.animation.coloring(settings.analyser.dataArray);
	settings.animation.tick(circles);
	settings.animation.drawCircles(ctx);
    }

    settings.pid = window.requestAnimationFrame(fireworkTick);

}

function setup(){
    fps = (1000/settings.frameRate);
    setCanvas(window.innerWidth,window.innerHeight);
    then = Date.now();
    center = centerofCanvas();
    startTime = then;
    nextCircle = then;
    generatelife();
    settings.animation.state.width = canvas.width;
    settings.animation.state.height = canvas.height;
    settings.animation.setup(circles, {layers: settings.layers, sectfunc: section});
    
}
//calculate the posistion of the next circle to layout by using the last one
//the shapes can be determined by the number of vertices a shape has and dividing
//by 360.
//settings.rotationAngle allows to determine when to 
function calpos(circles,interation,anchorCircle){
    position = {  x : 0, y: 0};
    if ( interationchange){
	interationchange = false;
	lastCirclePos = circles[circles.length -1 ].position;
	position.x = lastCirclePos.x + settings.currentvectorheading[0] ;
	position.y = lastCirclePos.y + settings.currentvectorheading[1]  ;
	rotatevector = rotate(0,0,settings.currentvectorheading[0], settings.currentvectorheading[1], settings.rotationAngle );
	settings.currentvectorheading = rotatevector;
    }
    else if  ( circles.length  % interation == 0 ){
	lastCirclePos = circles[circles.length -1 ].position;
	rotatevector = rotate(0,0,settings.currentvectorheading[0], settings.currentvectorheading[1], settings.rotationAngle );
	settings.currentvectorheading = rotatevector;
	position.x = lastCirclePos.x + settings.currentvectorheading[0] ;
	position.y = lastCirclePos.y + settings.currentvectorheading[1]  ;
    }else{
	lastCirclePos = circles[circles.length-1].position;
	position.x = lastCirclePos.x + (settings.currentvectorheading[0]);
	position.y = lastCirclePos.y + (settings.currentvectorheading[1]);
    }
    return position;
}

//calculate the rotation vetices of a hexagon.
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

//rotate a point around another given point
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





