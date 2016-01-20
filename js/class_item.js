//Item class.
var Item = function(name, textDefault, action)
{
    this.name = name;                   //Name of the item.
    this.textDefault = textDefault;     //Text that displays when the item is used.
    this.action = action;               //Action of the item.
}

//Perform the action of the object.
Item.prototype.activate = function()
{
    this.action();
}