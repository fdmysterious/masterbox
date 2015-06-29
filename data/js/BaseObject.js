/*******************
 *-=BaseObject.js=-*
 *******************

 Auteur : Florian Dupeyron (My?terious)
 Description : Gestionde base d'un objet.
*/

define(["BoxRect"], function(BoxRect)
{
	function BaseObject()
	{
		this.rect = new BoxRect();
	}

	return BaseObject;
});
