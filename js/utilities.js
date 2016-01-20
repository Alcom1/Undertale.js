// All of these functions are in the global scope
		
"use strict";

//constrained between min and max (inclusive)
function clamp(val, min, max)
{
	return Math.max(min, Math.min(max, val));
}

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
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r, d)
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
    this.lineTo(x, y + 10 + d);
    this.lineTo(x - 12, y + 5 + d);
    this.lineTo(x, y + d);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}