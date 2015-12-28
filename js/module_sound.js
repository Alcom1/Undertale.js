// Sound
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function()
{
	console.log("sound.js module loaded");
	
	//Init
	function init(volume)
	{
        //Set global volume.
        var sounds = document.querySelector("#audio").children;
        for(var i = 0; i < sounds.length; i++)
        {
            sounds[i].volume = volume;
        }
	}
    
    function playSound(id, disrupt)
    {
        var sound = document.querySelector("#" + id);
        if(disrupt)
        {
            sound.pause();
            sound.currentTime = 0;
        }
        sound.play();
    }
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return {
		init : init,
        playSound : playSound
	}
}());