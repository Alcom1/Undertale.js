var ItemHealing = function(name, textDefault, health)
{
    Item.call(
        this,
        name,
        textDefault
    )
    
    this.health = health;
}

ItemHealing.prototype = Object.create(Item.prototype);