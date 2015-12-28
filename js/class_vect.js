//Vector constructor
//Choice 0 takes x and y
//Choice 1 takes angle and magnitude
var Vect = function(a, b, choice)
{
	switch(choice)
	{
		case 0:
			this.x = a;
			this.y = b;
			break;
		case 1: 
			this.x = Math.sin(a) * b;
			this.y = Math.cos(a) * b;
			break;
	}
}

//Returns this vector
Vect.prototype.get = function()
{
	return new Vect(this.x, this.y, 0);
}

//Vector addition
Vect.prototype.add = function(vect)
{
	this.x += vect.x;
	this.y += vect.y;
}

//Vect get addition result
Vect.prototype.getAdd = function(vect)
{
	return new Vect(
		this.x + vect.x,
		this.y + vect.y,
		0);
}

//Vector subtraction
Vect.prototype.sub = function(vect)
{
	this.x -= vect.x;
	this.y -= vect.y;
}

//Vect get subtraction result
Vect.prototype.getSub = function(vect)
{
	return new Vect(
		this.x - vect.x,
		this.y - vect.y,
		0);
}

//Vector multiplication
Vect.prototype.mult = function(value)
{
	this.x *= value;
	this.y *= value;
}

//Vect get multiplication result
Vect.prototype.getMult = function(value)
{
	return new Vect(
		this.x * value,
		this.y * value, 
		0);
}

//Vector division
Vect.prototype.div = function(value)
{
	this.x /= value;
	this.y /= value;
}

//Vect get division result
Vect.prototype.getDiv = function(value)
{
	return new Vect(
		this.x / value,
		this.y / value, 
		0);
}

//Return dot product with another vector
Vect.prototype.getDot = function(value)
{
	return this.x * value.x + this.y * value.y;
}

//Return cross product with another vector
Vect.prototype.getCross = function(value)
{
	return this.x * value.y - this.y * value.x;
}

//Vector normalization
Vect.prototype.norm = function()
{
	var length = Math.sqrt(
		this.x * this.x + 
		this.y * this.y);
	this.x /= length;
	this.y /= length;
}

//Vector get normalization result
Vect.prototype.getNorm = function()
{
	var length = Math.sqrt(
		this.x * this.x + 
		this.y * this.y);
	return new Vect(
		this.x / length,
		this.y / length,
		0);
}

//Get magnitude of the vector.
Vect.prototype.getMagnitude = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
}