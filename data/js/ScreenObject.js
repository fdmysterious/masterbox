/*********************
 *-=ScreenObject.js=-*
 *********************
 
 Auteur : Florian Dupeyron (My?terious)
 Description : Objet que l'on dessine à l'écran.
*/

define(["BaseObject"], function(BaseObject)
{
	function ScreenObject()
	{
		//-=Appel constructeur=-//
		BaseObject.call(this); //Appel du constructeur parent
		//-=Fin de la section=-//
	}
	
	//-=Héritage=-//
	ScreenObject.prototype = Object.create(BaseObject.prototype);
	ScreenObject.prototype.constructor = ScreenObject;
	//-=Fin de la section=-//
	
	ScreenObject.prototype.drawBackground = function(screen)
	{
		//à implémenter par l'utilisateur
	};
	
	ScreenObject.prototype.drawStatic = function(screen)
	{
		//à implémenter par l'utilisateur
	};
	
	ScreenObject.prototype.drawDynamic = function(screen)
	{
		//à implémenter par l'utilisateur
	};
	
	return ScreenObject;
});