/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};

window.onload = function()
{
	console.log("window.onload called");
    
    //Modules.
    Flash.init();
    Player.init();
    Inventory.init();
    Soul.init();
    Cbbox.init();
    Cwriter.init();
    Cattack.init();
    Chp.init();
    Cmenu.init();
	Combat.init();
	Sound.init(0.4);
	
	//Main
	main.init();
}