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

//Maps x within range a-b to range c-d
function map(x, a, b, c, d)
{
    return (x - a) / (b - a) * (d - c) + c;
}

//Canvas rounded rectangle.
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r)
{
    if (w < 2 * r)
        r = w / 2;
    if (h < 2 * r)
        r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}