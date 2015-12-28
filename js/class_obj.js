//Base obj with position and scale
var Obj = function(x, y, scale)
{
	this.pos = new Vect(x, y, 0);	//Vector position of obj
	this.scale = scale;				//Relative scale of obj
}