function newCircle(){
    return {
	radius: 25,
	color: "#fff",
	position:{
	    x: null,
	    y: null,
	}
    }
}

function drawCircle(circle, context){

    context.beginPath();
    context.strokeSyle = 'black';
    context.arc(circle.position.x, circle.position.y, circle.radius, 0, 2 * Math.PI);
    context.stroke();

}   
