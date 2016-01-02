//Group of enemies. D:
var Cgroup = function()
{
    this.enemies = [new Cenemy(), new Cenemy()];
    this.mercies = ["Mercy", "Flee"];
}

Cgroup.prototype.update = function(dt)
{
    for(var i = 0; i < this.enemies.length; i++)
    {
        this.enemies.update(dt);
    }
}

Cgroup.prototype.draw = function(ctx)
{
    for(var i = 0; i < this.enemies.length; i++)
    {
        this.enemies.draw(ctx);
    }   
}

Cgroup.prototype.getNames = function()
{
    var names = [];
    for(var i = 0; i < this.enemies.length; i++)
    {
        names.push(this.enemies[i].name);
    }
    return names;
}

Cgroup.prototype.getText = function()
{
    return this.enemies[0].texts[0];
}

Cgroup.prototype.getActs = function()
{
    var acts = [];
    for(var i = 0; i < this.enemies.length; i++)
    {
        acts.push(this.enemies[i].acts);
    }
    return acts;
}

Cgroup.prototype.getMercies = function()
{
    return this.mercies;
}