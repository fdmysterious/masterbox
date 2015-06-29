/*********************
 *-=NumberSquare.js=-*
 *********************
 
 Auteur : Florian Dupeyron (My?terious)
 Description : Affiche un objet case.
*/

define(["AnimableDrawableObject", "Size"], function(AnimableDrawableObject, Size)
{
	function NumberSquare(value, position, size)
	{
		//-=Appel constructeur parent=-//
		AnimableDrawableObject.call(this);
		//-=Fin de la section=-//
		
		//-=Propriétés de la case=-//
		this.value = value;	//Valeur à afficher
		
		this.rect.pos = position;
		this.rect.size = size;
		//-=Fin de la section=-//
	}
	
	//-=Héritage=-//
	NumberSquare.prototype = Object.create(AnimableDrawableObject.prototype);
	NumberSquare.prototype.constructor = NumberSquare;
	//-=Fin de la section=-//
	
	NumberSquare.prototype.drawObject = function(canvas)
	{
		//-=Dessin=-//
		//--Case
		canvas.ctx.fillStyle = "#6e8ce6";
		canvas.ctx.fillRect(0, 0, this.rect.size.width, this.rect.size.height);
		
		canvas.ctx.fillStyle = "#f7f5ff";
		canvas.ctx.fillRect(6, 6, this.rect.size.width - 12, this.rect.size.height - 12);
		
		//--Texte
		var txt = this.value.toString();
		canvas.ctx.font = "20px Comfortaa";
		canvas.ctx.fillStyle = "black";
		canvas.ctx.textAlign = 'center';
		canvas.ctx.textBaseline = 'middle';
		canvas.ctx.fillText(txt, this.rect.size.width / 2, this.rect.size.height / 2);
		//-=Fin de la section=-//
	};
	
	return NumberSquare;
});
