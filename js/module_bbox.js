//Inherits from Obj. Draws a bullet at a centered position with a width and height.
var Bbox = (function()
{
    var pos;
    var width;
    var height;
    var speed;
    var newWidth;
    var newHeight;
    
    function init()
    {
        console.log(this);
    }
    
    function setup(_pos, _width, _height)
    {
        pos = _pos;
        width = _width;			//Width of box
        height = _height;		//Height of box
        speed = 600;			//Speed at which box grows and shrinks.
        newWidth = _width;		//Width of box to transition to
        newHeight = _height;	//Height of box to transition to       
    }

    //Resize Bbox in case
    function update(dt)
    {
        if(width < newWidth)			//X Grow
        {
            width += speed * dt;
        }
        if(height < newHeight)		    //Y Grow
        {
            height += speed * dt;
        }
        if(width > newWidth)			//X Shrink
        {
            width -= speed * dt;
        }
        if(height > newHeight)		    //Y Shrink
        {
            height -= speed * dt;
        }
        if(Math.abs(width - newWidth) < speed * dt)		//X Snap when close
        {
            width = newWidth;
        }
        if(Math.abs(height - newHeight) < speed * dt)	//Y Snap when close
        {
            height = newHeight;
        }
        
        return width == newWidth && height == newHeight;
    }
    
    //Draw bullet box
    function draw(ctx)
    {	
        ctx.save();
        
        //White
        ctx.fillStyle = "#FFF";
        ctx.fillRect(
            pos.x - width / 2,
            pos.y - height / 2,
            width,
            height);
        
        //Black
        ctx.fillStyle = "#000";
        ctx.fillRect(
            pos.x + 5 - width / 2, 
            pos.y + 5 - height / 2, 
            width - 10, 
            height - 10);
            
        ctx.restore();
    }

    //Returns array of limiting coordinates.
    function getBound()
    {
        return [
            pos.x - width / 2 + 5,
            pos.y - height / 2 + 5,
            pos.x + width / 2 - 5,
            pos.y + height / 2 - 5];
    }
    
    //Sets the width and height of the Bbox
    function setSize(_newWidth, _newHeight, force)
    {
        if(force)
        {
            width = _newWidth;
            height = _newHeight;
        }
        else
        {
            newWidth = _newWidth;
            newHeight = _newHeight;
        }
    }
    
    return{
        init : init,
        setup : setup,
        update : update,
        draw : draw,
        getBound : getBound,
        setSize : setSize,
    }
}());

