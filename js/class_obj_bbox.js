//Inherits from Obj. Draws a bullet at a centered position with a width and height.
function Bbox(x, y, width, height, scale)
{
	//Inherit from Obj
	Obj.call(
		this,
		x, 
		y, 
		scale);
		
	this.width = width;			//Width of box
	this.height = height;		//Height of box
	this.speed = 200;			//Speed at which box grows and shrinks.
	this.newWidth = width;		//Width of box to transition to
	this.newHeight = height;	//Height of box to transition to
}

//Inherit from Obj
Bbox.prototype = Object.create(Obj.prototype);

//Draw bullet box
Bbox.prototype.draw = function(ctx)
{	
	ctx.save();
	
	//White
	ctx.fillStyle = "#FFF";
	ctx.fillRect(
		this.pos.x - this.width / 2,
		this.pos.y - this.height / 2,
		this.width,
		this.height);
	
	//Black
	ctx.fillStyle = "#000";
	ctx.fillRect(
		this.pos.x + 5 - this.width / 2, 
		this.pos.y + 5 - this.height / 2, 
		this.width - 10, 
		this.height - 10);
		
	ctx.restore();
}

//Returns array of limiting coordinates.
Bbox.prototype.getBound = function()
{
	return [
		this.pos.x - this.width / 2 + 5,
		this.pos.y - this.height / 2 + 5,
		this.pos.x + this.width / 2 - 5,
		this.pos.y + this.height / 2 - 5];
}

//Resize Bbox in case
Bbox.prototype.transition = function(dt)
{
	if(this.width < this.newWidth)			//X Grow
	{
		this.width += this.speed * dt;
	}
	if(this.height < this.newHeight)		//Y Grow
	{
		this.height += this.speed * dt;
	}
	if(this.width > this.newWidth)			//X Shrink
	{
		this.width -= this.speed * dt;
	}
	if(this.height > this.newHeight)		//Y Shrink
	{
		this.height -= this.speed * dt;
	}
	if(Math.abs(this.width - this.newWidth) < this.speed * dt)		//X Snap when close
	{
		this.width = this.newWidth;
	}
	if(Math.abs(this.height - this.newHeight) < this.speed * dt)	//Y Snap when close
	{
		this.height = this.newHeight;
	}
}