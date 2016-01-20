//Module that displays the speech bubbles and text spoken by enemies.
var Cbubble = (function()
{
    var duration;          //Duration of events.
    var durationCounter;   //Duration counter.
    
    //Setup
    function setup()
    {
        duration = 0;
        durationCounter = 0;
    }
    
    //Update
    function update(dt)
    {
        durationCounter += dt;
        return durationCounter > duration;
    }
    
    //Draw
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
    
    //Return
    return {
        setup : setup,
        update : update,
        draw : draw,
    }
}());