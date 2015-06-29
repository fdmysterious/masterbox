/**************
 *-=size.js=-*
 **************

 Auteur : Florian Dupeyron (My?terious) et Jérémy Forgereau (UltraBill)
 Description : Permet de stocker la taille du tableau
*/
define(function()
{
	function Size(width, height)
	{
		this.width = width;
		this.height = height;
	}

	Size.prototype.set = function(width, height)
	{
		this.width = width;
		this.height = height;
	}

	return Size;
});
