//Inventory module
var Inventory = (function()
{
    var items = []; //List of items.
    
    //Init
    function init()
    {
        items = 
        [
            new Item(
                "Food.js", 
                "* Test item sentence.\n10 health restored.",
                function(){Player.heal(10)}),
            new Item(
                "Test.js", 
                "* Test item sentence.",
                function(){console.log("TEST!")}),
        ]
    }
    
    //Getter for a list of item names.
    function getNames()
    {
        var names = [];
        for(var i = 0; i < items.length; i++)
        {
            names.push(items[i].name);
        }
        return names;
    }
    
    //Getter for the text of an item at an index.
    function getText(index)
    {
        return items[index].textDefault;
    }
    
    //Getter for the number of items.
    function getLength()
    {
        return items.length;
    }
    
    //Remove an item at an index.
    function removeItem(index)
    {
        items.splice(index, 1);
    }
    
    //Activate an item at an index.
    function activate(index)
    {
        items[index].activate();
    }
    
    //Return
    return{
        init : init,
        getNames : getNames,
        getText : getText,
        getLength : getLength,
        removeItem : removeItem,
        activate : activate
    }
}());