//Inherits from Obj. Draws a sprite image.
function ObjSpr(x, y, sprite, scale)
{
	//Inherit from Obj
	Obj.call(
		this,
		x,
		y,
		scale);
	
	this.sprite = sprite;	//Sprite to draw.
}

//Inherit from Obj
ObjSpr.prototype = Object.create(Obj.prototype);

//Draws the sprite to scale.
ObjSpr.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.drawImage(
		this.sprite, 
		0, 
		0,
		this.sprite.width,
		this.sprite.height,
		this.pos.x,
		this.pos.y,
		this.sprite.width * this.scale,
		this.sprite.height * this.scale);
	ctx.restore();
}