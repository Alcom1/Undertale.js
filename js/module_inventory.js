//Inventory module
var Inventory = (function()
{
    var items = [];
    
    function init()
    {
        items = 
        [
            new ItemHealing("Food.js", "* Test item sentence. 10 health restored.", 10),
            new ItemHealing("Food.js", "* Test item sentence. 10 health restored.", 10),
            new ItemHealing("Food.js", "* Test item sentence. 10 health restored.", 10)
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
    
    function removeItem(index)
    {
        items.splice(index, 1);
    }
    
    return{
        init : init,
        getNames : getNames,
        getText : getText,
        removeItem : removeItem
    }
}());