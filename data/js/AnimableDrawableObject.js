/*******************************
 *-=AnimableDrawableObject.js=-*
 *******************************
 
 Auteur : Florian Dupeyron
 Description : Gère un objet pouvant être dessiné et animé.
*/

define(["DrawableObject", "Animation", "BoxRect"], function(DrawableObject, Animation, BoxRect)
{
	"use strict";
	function AnimableDrawableObject()
	{
		DrawableObject.call(this);
		
		this.rect = new BoxRect();
		
		//-=Propriétés d'animation=-//
		this.animation = 
		{
			position: new Animation(2),
			opacity: new Animation(1)
		};
		//-=Fin de la section=-//
	}
	
	//-=Héritage=-//
	AnimableDrawableObject.prototype = Object.create(DrawableObject.prototype);
	AnimableDrawableObject.prototype.constructor = AnimableDrawableObject;
	//-=Fin de la section=-//
	
	//-=Implémentation fonction de dessin=-//
	AnimableDrawableObject.prototype.draw = function(canvas)
	{
		//-=Mise a jour position=-//
		this.rect.pos.x = this.animation.position.currentValues[0];
		this.rect.pos.y = this.animation.position.currentValues[1];

		canvas.ctx.globalAlpha = this.animation.opacity.currentValues[0];
		//-=Fin de la section=-//
		
		//-=Affichage objet=-//
		DrawableObject.prototype.draw.call(this, canvas);
		//-=Fin de la section=-//
	};
	//-=Fin de la section=-//
	
	//-=Fonction de mise a jour des animations=-//
	AnimableDrawableObject.prototype.update = function(dt)
	{
		for(var i in this.animation)
			this.animation[i].update(dt);
	};
	//-=Fin de la section=-//
	
	return AnimableDrawableObject;
});
