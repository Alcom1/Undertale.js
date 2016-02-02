// main.js
"use strict";

// .main is an object literal that is a property of the app global
// This object literal has its own properties and methods (functions)
var main =
{
    WIDTH : 640, 				// Canvas width
    HEIGHT : 480,				// Canvas height
    canvas : undefined,			// Canvas
    ctx : undefined,			// Canvas context
   	lastTime : 0, 				// used by calculateDeltaTime() 
    debug : true,				// debug
	reset : true,
	animationID : 0,			//ID index of the current frame.
	
	//Game state enum
	gameState : undefined,
	GAME_STATE: Object.freeze
	({
        START : 0,
        FLASH : 1,
		COMBAT : 2,
	}),
	
    //Initialization
	init : function()
	{
		//Init log
		console.log("app.main.init() called");
		
		// init canvas
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;
        
        //Game State
        this.gameState = this.GAME_STATE.START;
        
        //Setup combat module.
        Combat.setup(this.ctx);
		
		// start the game loop
		this.frame();
	},
	
	//Core update
	frame : function()
	{
		//LOOP
	 	this.animationID = requestAnimationFrame(this.frame.bind(this));
	 	
	 	//Calculate Delta Time of frame
	 	var dt = this.calculateDeltaTime();
		
		//Clear
		this.ctx.save();
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
		this.ctx.restore();
		
		//Update
		this.update(dt);
		
		//Draw
		this.draw(this.ctx);
		
		//Draw debug info
		if (this.debug)
		{
			// draw dt in bottom right corner
			this.fillText(
				"dt: " + (100 / (60 * dt)).toFixed(1) + "%",
				this.WIDTH - 140,
				50,
				"24pt undertale",
				"white",
				false);
		}
	},
	
	//Update logic
	update : function(dt)
	{
        switch(this.gameState)
        {
            case this.GAME_STATE.START:
                if(true)
                    this.gameState = this.GAME_STATE.START;
                break;
            case this.GAME_STATE.FLASH:
                if(Flash.update(dt))
                    this.gameState = this.GAME_STATE.COMBAT;
                break;
            case this.GAME_STATE.COMBAT:
                Combat.update(dt);
                break;
        }
	},
	
	//Draw the main scene
	draw : function(ctx)
	{
        switch(this.gameState)
        {
            case this.GAME_STATE.START:
                break;
            case this.GAME_STATE.FLASH:
                Flash.draw(ctx);
                break;
            case this.GAME_STATE.COMBAT:
                Combat.draw(ctx);
                break;
        }
        
        ctx.save();
        ctx.globalAlpha = 0.0;
        ctx.drawImage(
            document.getElementById("guide"),
            0, 
            0);
        ctx.restore();
	},
	
	//Draw filled text
	fillText : function(string, x, y, css, color, centered)
	{
		this.ctx.save();
		if(centered)
		{
			this.ctx.textAlign = "center";
			this.ctx.textBaseline="middle"; 
		}
		this.ctx.font = css;
		this.ctx.fillStyle = color; 
		this.ctx.fillText(string, x, y);
		this.ctx.restore();
	},
	
	//Calculate delta-time
	calculateDeltaTime : function()
	{
		var now, fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
};