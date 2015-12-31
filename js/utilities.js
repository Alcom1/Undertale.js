// All of these functions are in the global scope
		
"use strict";

//constrained between min and max (inclusive)
function clamp(val, min, max)
{
	return Math.max(min, Math.min(max, val));
}

 // FULL SCREEN MODE
function requestFullscreen(element)
{
	if (element.requestFullscreen)
	{
		element.requestFullscreen();
	}
	else if (element.mozRequestFullscreen)
	{
		element.mozRequestFullscreen();
	}
	else if (element.mozRequestFullScreen) // camel-cased 'S' was changed to 's' in spec
	{
		element.mozRequestFullScreen();
	}
	else if (element.webkitRequestFullscreen)
	{
		element.webkitRequestFullscreen();
	}
	// .. and do nothing if the method is not supported
};

//Modified mod for negative numbers.
Number.prototype.mod = function(n)
{
	return ((this % n) + n) % n;
}


