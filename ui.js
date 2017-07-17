


window.onload = function(){

    var animationform = document.getElementById("animationsettings");

    var animationTypeMenu = document.getElementById("animationType");
    var angleForm = document.getElementById("angleNumber");
    var radiusForm = document.getElementById("radius");
    var spacingForm = document.getElementById("spacing");
    
    for (animation in Flower.animations){
	var option = document.createElement("option");
	option.text = Flower.animations[animation].name;
	option.value = animation;
	animationTypeMenu.add(option);	
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
	console.log(settings.animation);
	settings.animation.deinit();
	settings.animation =  Flower.animations[animationTypeMenu.selectedIndex];
	setup();

    }
    
    
    

}
