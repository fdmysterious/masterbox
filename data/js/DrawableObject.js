define(['BaseObject', 'Canvas'], function(BaseObject, Canvas)
{
	function DrawableObject()
	{
		BaseObject.call(this); //Appel du constructeur parent
	}

	DrawableObject.prototype = Object.create(BaseObject.prototype);
	DrawableObject.prototype.constructor = DrawableObject;

	DrawableObject.prototype.clear = function(canvas)
	{
		canvas.ctx.clearRect(this.rect.pos.x, this.rect.pos.y, this.rect.size.width, this.rect.size.height);
	};
	
	DrawableObject.prototype.draw = function(canvas)
	{
		canvas.ctx.save();
		
		//-=Application transformations=-//
		canvas.ctx.translate(this.rect.pos.x, this.rect.pos.y);
		this.drawObject(canvas);	//Dessin personnalisé de l'objet.
		//-=Fin de la section=-//
		
		canvas.ctx.restore();
	};

	DrawableObject.prototype.drawObject = function(canvas)
	{
	};

	return DrawableObject;
});
