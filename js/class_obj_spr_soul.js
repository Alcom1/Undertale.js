//Inherits from Spr. Draws a player soul.
function Soul(pos, sprite, spriteDmg)
{
	//Inherit from Spr
	ObjSpr.call(
		this,
		pos.x,
		pos.y,
		sprite,
		1);
	
	this.dmg = false;			//True when taking damage.
	this.spriteDmg = spriteDmg;	//Second sprite to display when taking damage.
	this.speed = 100;			//Soul speed on bullet board.
}

//Inherit from Spr
Soul.prototype = Object.create(ObjSpr.prototype);

//Draw the soul at its position.
Soul.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.drawImage(
		this.dmg ? this.spriteDmg : this.sprite,	//Draw damaged soul when taking damage.
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

//Draws a soul at the provided position.
Soul.prototype.drawAt = function(ctx, posForced)
{
	ctx.save();
	ctx.drawImage(
		this.sprite,
		0, 
		0,
		this.sprite.width,
		this.sprite.height,
		posForced.x,
		posForced.y,
		this.sprite.width * this.scale,
		this.sprite.height * this.scale);
	ctx.restore();
}

//Get a 1D array of pixel positions to check collision for.
Soul.prototype.getCollision = function(ctx)
{
	this.colData = [];	//Collision data
	
	//Draw player and get the data at its location.
	this.draw(ctx);
	var imgData = ctx.getImageData(
		this.pos.x,
		this.pos.y,
		this.sprite.width,
		this.sprite.height);
	
	//For each pixel at player position, if it's red, add that pixel to the collision data.
	for(var j = 0; j < imgData.height; j++)
	{
		for(var i = 0; i < imgData.width; i++)
		{
			if(imgData.data[(j * imgData.width + i) * 4])
			{
				this.colData.push((j * imgData.width + i) * 4);
			}
		}
	}
}

//Check collision for player
Soul.prototype.checkCollision = function(ctx)
{
	//Get image data at player position (Hopefully before the player is drawn).
	var imgData = ctx.getImageData(
		this.pos.x,
		this.pos.y,
		this.sprite.width,
		this.sprite.height);
	
	//For each index in collision data, check if the pixel has a non-0 red channel.
	for(var i = 0; i < this.colData.length; i++)
	{
		//If non-black pixel is detected, set damage to true and return true.
		if(imgData.data[this.colData[i]])
		{
			this.dmg = true;
			return;
		}
	}
	
	//No damage if no collision occured.
	this.dmg = false;
}

//Move soul based on key input
Soul.prototype.move = function(dt)
{
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP])
	{
		this.pos.y -= Math.round(this.speed * dt);	//Round positions for pixel-perfect positioning.
	}
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
	{
		this.pos.x += Math.round(this.speed * dt);
	}
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
	{
		this.pos.y += Math.round(this.speed * dt);
	}
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
	{
		this.pos.x -= Math.round(this.speed * dt);
	}
}

//Limit the soul to be within a box.
Soul.prototype.limit = function(bound)
{
	if(this.pos.x < bound[0])	//West limit.
	{
		this.pos.x = bound[0];
	}
	if(this.pos.y < bound[1])	//North limit.
	{
		this.pos.y = bound[1];
	}
	if(this.pos.x + this.sprite.width > bound[2])	//East limit
	{
		this.pos.x = bound[2] - this.sprite.width;
	}
	if(this.pos.y + this.sprite.height > bound[3])	//South limit
	{
		this.pos.y = bound[3] - this.sprite.height;
	}
}