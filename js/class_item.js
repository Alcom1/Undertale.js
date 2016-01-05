var Item = function(name, textDefault, action)
{
    this.name = name;
    this.textDefault = textDefault;
    this.action = action;
}

Item.prototype.activate = function()
{
    this.action();
}