// All of these functions are in the global scope
		
"use strict";

// returns mouse position in local coordinate system of element
function getMouse(e, xOff, yOff)
{
	var mouse = new Vect(
		e.pageX - e.target.offsetLeft - xOff,
		e.pageY - e.target.offsetTop - yOff,
		0);
	return mouse;
}

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

// This gives Array a randomElement() method
Array.prototype.randomElement = function()
{
	return this[Math.floor(Math.random() * this.length)];
}

//Modified mod for negative numbers.
Number.prototype.mod = function(n)
{
	return ((this % n) + n) % n;
}

//Global square loop.
var squareLoop = [
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1],
	[-1, 0],
	[-1, 1]];


