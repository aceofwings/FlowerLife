
function newCircle(){
    return {
	radius: 6,
	color: "#fff",
	life : {color : 'red'},
	position:{
	    x: null,
	    y: null,
	},
	currentpos:{
	    x: null,
	    y:null,
	}
    }
}

var cycleAnimation = {
    name: "Cycle",
    tick: function(circles){
	
	if (circles.length - 2 < Math.abs(this.state.circleCount)){
	    this.state.flipped *= -1;
	}
	if (this.state.flipped == -1 && this.state.circleCount > 0){//decreasing
	    this.state.color = getRandomColor();

	    }else if (this.state.flipped == -1 && this.state.circleCount < 0){// increasing
		this.state.color = 'black';

	    }else if ( this.state.flipped == 1 && this.state.circleCount < 0){// increasing
		this.state.color = getRandomColor();

	    }else if (this.state.flipped == 1 && this.state.circleCount > 0){// increasing
		this.state.color = 'black';
	    }else{
		this.state.color = 'black';
	    }
	circle = circles[Math.abs(this.state.circleCount)];
	circle.life.color = this.state.color;

	this.state.circleCount += this.state.flipped;
    },
    state:{ circleCount : 0 ,flipped : 1, color: 'black'},
    setup: function(circles,options){
	
    },
    deinit: function(){

    }
}
//Animation radially from inward to outwards
var bloomAnimation = {
    name: "Bloom",
    settings: {},
    tick: function(circles){
//	var color = getRandomColor();
	this.state.offset = (++this.state.cycle)%this.sections.length;
	
	if(this.state.cycle% this.state.cycleChange == 0) {
	    this.state.direction *= -1;
	}
    	
    },
    state:{ cycleI : 0 ,cycle : 1, offset: 0, direction:-1, detailsforSection: [], color: "#FFFFFF", cycleChange : 256},
    setup: function(circles, options){
	var temp = [];
	var section = 0;
	//group circles by each tier or section. 
	for ( var i = 0; i < circles.length; i++){
	    temp.push(circles[i]);
	    if ( i > options['sectfunc'](section) -3){		
		section ++ ;
		this.sections.push(temp);
		//Details for section holds state in between ticks for each tier.
		this.state.detailsforSection.push({color: getRandomColor(), mulitplier: 1});
		temp = [];
	    }
	}
	for(i = 1; i < this.sections.length; i++){
	    for (c = 0 ; c < this.sections[i].length; c++){
		//update the circles and their colors in a given section
		this.sections[i][c].life =  this.state.detailsforSection[i];
	    }
	}
    },
    sections: [],
    drawCircles : function(context){
	context.fillStyle = "black";
	context.fillRect(0,0,canvas.width + 600,canvas.height + 600);

	for (var i = 0 ; i < this.sections.length  ; i++){
	    context.beginPath();
		// This is bad, make this better
	    context.strokeStyle = this.state.detailsforSection[(this.sections.length + i + (this.state.direction * this.state.offset))%this.sections.length].color
	    for(var c = 0 ; c < this.sections[i].length  ; c ++){
		context.arc(this.sections[i][c].currentpos.x, this.sections[i][c].currentpos.y, circle.radius, 0, 2 * Math.PI);
	    }
	    context.stroke();
	}
    },
    deinit: function(){
	this.sections = [];
    },
    layout: function(sounds){
	for(i in this.sections){
	    temp  = this.sections[i].mulitplier = ((sounds[sounds.length - i] / 255.0));
	     for(var c = 0 ; c < this.sections[i].length  ; c ++){
		 this.sections[i][c].currentpos.x = centerofCanvas().x  + Math.round(( this.sections[i][c].position.x - centerofCanvas().x) * (temp) )  ;
		 this.sections[i][c].currentpos.y = centerofCanvas().y  + Math.round((this.sections[i][c].position.y - centerofCanvas().y)  * (temp ) );
            }
	}
    },coloring: function(sounds){
	if (this.state.direction == -1){
	    if (sounds[90] > 150 || sounds[65] > 240 || sounds[30] > 230){
		this.state.color = getRandomColor();
	    }
	    this.state.detailsforSection[this.state.offset].color = shadeColor(this.state.color, (this.state.cycle / this.state.cycleChange));//this.state.color;
	}else{
	    this.state.detailsforSection[this.state.offset].color = getRandomColor();

	}
	
    }
    
}

var ferrrisWheelAnimation ={
    name: "Ferris Wheel",
    tick: function(circles){
	var color = getRandomColor();
	//increment tier colors outward. The inner most tier will start with a random color
	for(i = 1 ; i < this.sections.length; i++){
	    //this.state.detailsforSection[0].color = this.state.detailsforSection[this.sections.length - 1 ].color;
	    this.state.detailsforSection[this.sections.length - i].color = this.state.detailsforSection[this.sections.length - i - 1].color ;
	    this.state.detailsforSection[0].color = color;
	    this.sections[0][0].life.color = color;
	}
    },
    state:{ cycleI : 0 ,cycle : 1, detailsforSection: []},
    setup: function(circles, options){
	var temp = [];
	var section = 0;
	for (var i =0 ; i < options['layers']   ; i++){
	    temp = [];
	    this.sections.push(temp);
	    this.state.detailsforSection.push({color: getRandomColor()});
	}
	//group circles by each tier or section. 
	for ( var i = 0; i < circles.length; i++){
	    if ( i > options['sectfunc'](section)){		
		section ++ ;
	    }
	    index = i % (options['layers'] -1)
	    this.sections[index].push(circles[i]);
	}


	    for(i = 1; i < this.sections.length; i++){
		for (c = 0 ; c < this.sections[i].length; c++){
		//update the circles and their colors in a given section
		    this.sections[i][c].life =  this.state.detailsforSection[i];
		}
	}
	
		
    },
    sections: [],
    drawCircles : function(context){
	for (var i = 0 ; i < this.sections.length  ; i++){
	    context.strokeStyle = this.state.detailsforSection[i].color
	    for(var c = 0 ; c < this.sections[i].length  ; c ++){
		context.beginPath();
		context.arc(this.sections[i][c].position.x, this.sections[i][c].position.y, circle.radius, 0, 2 * Math.PI);
		context.stroke();
	    }
	    
	}
    },
    deinit : function(){
	this.sections = [];
    },
    layout: function(sounds){
	for (var i = 0 ; i < this.sections.length  ; i++){
            for(var c = 0 ; c < this.sections[i].length  ; c ++){

            }
	}
    }
}

//Returns random color in the form of hex
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function shadeColor(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

//draws a circle given a circle object
function drawCircle(circle, context){
    context.beginPath();
    context.strokeStyle = circle.life.color;
    context.arc(circle.position.x, circle.position.y, circle.radius, 0, 2 * Math.PI);
    context.stroke();
}
//Types of animations 
var Flower = {
    animations :  [bloomAnimation, ferrrisWheelAnimation,waves]
};

