function newCircle(){
    return {
	radius: 10,
	color: "#fff",
	life : {color : 'red'},
	position:{
	    x: null,
	    y: null,
	}
    }
}

var cycleAnimation = {
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
//	console.log(this.state.circleCount);
	this.state.circleCount += this.state.flipped;
    },
    state:{ circleCount : 0 ,flipped : 1, color: 'black'},
    setup: function(circles,options){
	
    }
}
//Animation radially from inward to outwards
var bloomAnimation = {
    tick: function(circles){
	var color = getRandomColor();
	//increment tier colors outward. The inner most tier will start with a random color
	
	    for(i = 1 ; i < this.sections.length; i++){
		this.state.detailsforSection[this.sections.length - i].color = this.state.detailsforSection[this.sections.length - i - 1].color ;
		this.state.detailsforSection[0].color = color;
		this.sections[0][0].life.color = color;
		
		
	    }
    },
    state:{ cycleI : 0 ,cycle : 1, detailsforSection: []},
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
		this.state.detailsforSection.push({color: getRandomColor()});
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
    sections: []
    
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


function drawCircle(circle, context){

    context.beginPath();
    context.strokeStyle = circle.life.color;
    context.arc(circle.position.x, circle.position.y, circle.radius, 0, 2 * Math.PI);
    context.stroke();

}   
