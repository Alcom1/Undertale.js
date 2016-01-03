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
    
    //Non-central modules.
    Soul.init();
    Cwriter.init();
    Cattack.init();
    Chp.init();
    Cmenu.init();
	
	//Sound module
	app.sound.init(0.4);
	app.main.sound = app.sound;
    
	//Combat module
	app.combat.init();
	app.main.combat = app.combat;
	
	//Main module
	app.main.init();
}
	
window.onblur = function()
{

}

window.onfocus = function()
{

}