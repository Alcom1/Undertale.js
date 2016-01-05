//Inventory module
var Inventory = (function()
{
    var items = [];
    
    function init()
    {
        items = 
        [
            new Item(
                "Food.js", 
                "* Test item sentence. 10 health restored.",
                function(){Player.heal(10)}),
        ]
    }
    
    function getNames()
    {
        var names = [];
        for(var i = 0; i < items.length; i++)
        {
            names.push(items[i].name);
        }
        return names;
    }
    
    function getText(index)
    {
        return items[index].textDefault;
    }
    
    function getLength()
    {
        return items.length;
    }
    
    function removeItem(index)
    {
        items.splice(index, 1);
    }
    
    function activate(index)
    {
        items[index].activate();
    }
    
    return{
        init : init,
        getNames : getNames,
        getText : getText,
        getLength : getLength,
        removeItem : removeItem,
        activate : activate
    }
}());