// main.js
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// .main is an object literal that is a property of the app global
// This object literal has its own properties and methods (functions)
app.main =
{
    WIDTH : 640, 				// Canvas width
    HEIGHT : 480,				// Canvas height
    canvas : undefined,			// Canvas
    ctx : undefined,			// Canvas context
   	lastTime : 0, 				// used by calculateDeltaTime() 
    debug : true,				// debug
	reset : true,
	animationID : 0,			//ID index of the current frame.
	
	//Modules
    combat : undefined,         //Combat
	sound : undefined,			//Sound
	
	//Game state enum
	gameState : undefined,
	GAME_STATE: Object.freeze
	({
		COMBAT : 1,
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
        this.gameState = this.GAME_STATE.COMBAT;
        
        //Setup combat module.
        this.combat.setup(
            this.ctx, 
            20, 
            20,
            ["* JavaScript is a high-level,  dynamic,  \nuntyped,  and interpreted programming \nlanguage.  -Wikipedia"],
            ["Enemy"],
            [["Check", "Beep", "Boop"]],
            ["Item A", "Item B", "Item C", "Item D"],
            ["Mercy", "Flee"]);
		
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
            case this.GAME_STATE.COMBAT:
                this.combat.update(dt);
                break;
        }
	},
	
	//Draw the main scene
	draw : function(ctx)
	{
        switch(this.gameState)
        {
            case this.GAME_STATE.COMBAT:
                this.combat.draw(ctx);
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