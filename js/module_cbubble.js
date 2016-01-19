var Cbubble = (function()
{
    var delay;
    var delayCounter;
    
    function init()
    {
        
    }
    
    function setup()
    {
        delay = 0;
        delayCounter = 0;
    }
    
    function update(dt)
    {
        delayCounter += dt;
        return delayCounter > delay;
    }
    
    function draw(ctx)
    {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        ctx.roundRect(
            Cgroup.getBubblePos(Combat.getSelectStateEnemy()).x, 
            Cgroup.getBubblePos(Combat.getSelectStateEnemy()).y, 
            100, 
            100, 
            15, 
            Cgroup.getBubbleOff(Combat.getSelectStateEnemy()));
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    
    return {
        init : init,
        setup : setup,
        update : update,
        draw : draw,
    }
}());