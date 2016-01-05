// Sound
var Sound = (function()
{
	console.log("sound.js module loaded");
    var pauser;
	
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
    
    function update()
    {
        if(pauser != undefined)
        {
            var sound = document.querySelector("#" + pauser[0]);
            if(Math.floor(sound.currentTime * 1000) % pauser[1] > 50)
            {
                sound.pause();
                pauser = undefined;
            }
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
        pauser = undefined;
    }
    
    function pauseSound(id, step)
    {
        step = 70;
        pauser = [id, step];
    }
    
    function pauseSoundHard(id)
    {
        document.querySelector("#" + id).pause();
        pauser = undefined;
    }
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return {
		init : init,
        update : update,
        playSound : playSound,
        pauseSound : pauseSound,
        pauseSoundHard : pauseSoundHard,
	}
}());