//Animation constructor
var Animation = function(anim)
{
    this.active = true;
    this.image = document.getElementById(anim.image_id);
    this.length = anim.length;
    this.rotate = anim.rotate;
    this.scale = anim.scale;
    this.translate = anim.translate;
    this.zindex = anim.zindex;
    this.time = 0;
}

//Update
Animation.prototype.update = function(dt)
{
    this.time += dt;
}

//Draw
Animation.prototype.draw = function(ctx)
{
    ctx.save();
    var step = (this.time * 1000) % this.length;
    
    this.transform(ctx, step, this.rotate, 2);
    this.transform(ctx, step, this.scale, 1);
    this.transform(ctx, step, this.translate, 0);
    
    ctx.drawImage(
        this.image,
        0,
        0);
    ctx.restore();
}

//Perform a transformation based on its type
Animation.prototype.transform = function(ctx, step, form, type)
{
    for(var i = 0; i < form.length - 1; i++)
    {
        if(step > form[i].time && step < form[i + 1].time)
        {
            switch(type)
            {
                case 0:
                    ctx.translate(
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[0], 
                            form[i + 1].move[0]),
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[1], 
                            form[i + 1].move[1]));
                    break;
                case 1:
                    ctx.scale(
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[0], 
                            form[i + 1].move[0]),
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[1], 
                            form[i + 1].move[1]));
                    break;
                case 2:
                    ctx.rotate(
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move * Math.PI / 180, 
                            form[i + 1].move * Math.PI / 180));
                    break;
            }
        }
    }    
}