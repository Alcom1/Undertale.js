//Module that displays, updates, and manages the bullet box.
var Cbbox = (function()
{
    var pos;                 //Centered position of the bullet box.
    var width;               //Width of the bullet box.
    var height;              //Height of the bullet box.
    var speed;			     //Speed at which box grows and shrinks.
    var newWidth;            //Bullet box width to transition to.
    var newHeight;           //BUllet box height to transition to.
    
    //Init
    function init()
    {
        pos = new Vect(320, 320, 0);
        speed = 600;
    }
    
    //Setup with position, width
    function setup(_width, _height)
    {
        width = _width;
        height = _height;
        newWidth = _width;
        newHeight = _height;     
    }

    //Update with box resizing
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
        ctx.globalAlpha = 1;
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
    
    //Return
    return{
        init : init,
        setup : setup,
        update : update,
        draw : draw,
        getBound : getBound,
        setSize : setSize,
    }
}());