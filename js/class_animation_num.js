var AnimationNum = function(anim, name)
{
    Animation.call(this, anim);
        
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

AnimationNum.prototype = Object.create(Animation.prototype);

AnimationNum.prototype.draw = function(ctx)
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
    ctx.drawImage(
        this.subCanvas,
        0,
        0);
    ctx.restore();
}