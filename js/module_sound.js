// Sound
var Sound = (function()
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
    
    function pauseSound(id)
    {
        var sound = document.querySelector("#" + id);
        sound.pause();        
    }
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return {
		init : init,
        playSound : playSound,
        pauseSound : pauseSound
	}
}());