


window.onload = function(){

    var animationTypeMenu = document.getElementById("animationType");

    for (animation in Flower.animations){
	var option = document.createElement("option");
	option.text = Flower.animations[animation].name;
	option.value = animation;
	animationTypeMenu.add(option);	
    }

    animationTypeMenu.onchange = function(){
	window.cancelAnimationFrame(settings.pid);
	console.log(settings.animation);
	settings.animation.deinit();
	settings.animation =  Flower.animations[animationTypeMenu.selectedIndex];
	setup();
	window.requestAnimationFrame(fireworkTick);
    }
    
    
    

}
