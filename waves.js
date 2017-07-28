var waves = {
    name: "Perlin Wave",
    state : {particleAmount : 1000, width : 1000, height: 1000, period: 1/400},
    tick : function(circles){
	for(particle in this.particles){
	    p = this.particles[particle]
	    alpha = noise.simplex2( p.x * this.state.period, p.y * this.state.period);
	    //p.x += Math.cos(alpha);
	    //p.y += Math.sin(alpha);
	    if (p.x > (this.state.width/ 3)){
		p.x = 0;
		p.y = p.ytemp
		p.d *= -1;
		if (p.d == 1){
		    p.y = Math.random() * (this.state.height/3);
		    p.ytemp = p.y
		}
	    }
	}
    },
    drawCircles : function(ctx){
	for(particle in this.particles){
	    p = this.particles[particle]
	    if ( p.d == 1){
		ctx.fillStyle = p.fill; // "hsla(" + (Math.floor(alpha * 360 )) + ", 95%, 50%, 0.20)";
	    }else{
		ctx.fillStyle = "black";
	    }
	    ctx.fillRect(p.x * 3, p.y * 3 , 3,3);
	}
    },
    coloring: function(sounds){
	for (sound = 0; sound < (sounds.length * 4) - 1; sound += 4){
	    s = sounds[sound / 4];
	    this.particles[sound].fill ="hsla(" +(Math.floor( (s/255) * 360 )) + ", 95%, 50%, 0.20)"
	    this.particles[sound + 1].fill ="hsla(" +(Math.floor( (s/255) * 360 )) + ", 95%, 50%, 0.20)"
	    this.particles[sound + 2].fill ="hsla(" +(Math.floor( (s/255) * 360 )) + ", 95%, 50%, 0.20)"
	    this.particles[sound + 3].fill ="hsla(" +(Math.floor( (s/255) * 360 )) + ", 95%, 50%, 0.20)"
	}
    },
    layout : function(sounds){
	for (sound = 0; sound < (sounds.length * 4) - 1; sound += 4){	    
	    s = sounds[sound/4];
	    p = this.particles[sound];
	    p1 = this.particles[sound + 1];
	    p2 = this.particles[sound + 2]; 
	    p3 = this.particles[sound + 3];
	    alpha = noise.simplex2( p.x * this.state.period   , p.y * this.state.period * s);
	    alpha2 = noise.simplex2( p1.x * this.state.period  , p1.y * this.state.period  * s);
	    alpha3 = noise.simplex2( p2.x * this.state.period  , p2.y * this.state.period  * s);
	    alpha4 = noise.simplex2( p3.x * this.state.period   , p3.y * this.state.period * s);
	    p.y += Math.sin(alpha);
	    p1.y += Math.sin(alpha2);
	    p2.y += Math.sin(alpha3);
	    p3.y += Math.sin(alpha4);

	    p.x += Math.cos(alpha);
	    p1.x += Math.cos(alpha2);
	    p2.x += Math.cos(alpha3);
	    p3.x += Math.cos(alpha4);


	}
    },
    setup: function(circles, info){
	noise.seed(Math.random());
	this.particles = [];
	ctx.fillRect(0,0,canvas.width + 600,canvas.height + 600);
	for ( i = 0 ; i < this.state.particleAmount ; i++){
	    this.particles.push(
		{ 
		    x: 0,
		    d: 1,
		    y: Math.random() * this.state.height,
		    ytemp : this.y,
		    a: 0, //amplitude of the current traveling particle
		    fill: "black"
		}
	    );
	    this.particles[i].ytemp = this.particles[i].y;
	};
    },
    deinit: function(){

    }
}
