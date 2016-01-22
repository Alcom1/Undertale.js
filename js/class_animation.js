var Animation = function(text, name)
{
    var anim = JSON.parse(text);
    this.active = true;
    this.image = document.getElementById(anim.image_id);
    if(anim.image_id == "drone_2")
    {
        this.subCanvas = document.createElement("canvas");
        this.subCanvas.width = this.image.width;
        this.subCanvas.height = this.image.height;
        this.subCtx = this.subCanvas.getContext('2d');
        this.subCtx.fillStyle = "#000";
        this.subCtx.font = "9px arial";
        this.subCtx.translate(45, 53);
        var num = name.substr(name.indexOf("-") + 1);
        if(num.length < 3)
            this.subCtx.translate(1, -3);    
        this.subCtx.rotate(285 * Math.PI / 180);
        this.subCtx.fillText(num, 0, 0);
        this.subCtx.fillRect(50, 50, 10, 10);
        var tempData = this.subCtx.getImageData(
            0,
            0,
            this.subCanvas.width,
            this.subCanvas.height);
        for(var i = 3; i < tempData.data.length; i += 4)
        {
            if(tempData.data[i] > 50)
                tempData.data[i] = 255;
            else
                tempData.data[i] = 0;
        }
        this.subCtx.putImageData(
            tempData,
            0,
            0);
    }
    this.length = anim.length;
    this.rotate = anim.rotate;
    this.scale = anim.scale;
    this.translate = anim.translate;
    this.zindex = anim.zindex;
    this.time = 0;
}

Animation.prototype.update = function(dt)
{
    this.time += dt;
}

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
    if(this.subCtx)
    {
        ctx.drawImage(
            this.subCanvas,
            0,
            0);
    }
    ctx.restore();
}

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