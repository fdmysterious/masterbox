/******************
 *-=Animation.js=-*
 ******************

 Auteur : Florian Dupeyron (My?terious)
 Description : Permet de gérer les animations
*/

define(["Penner"], function(Penner)
{
	"use strict"; //Mode strict = sécurité
	function Animation(size)
	{
		//-=Propriétés=-//
		this.startValues	= new Array(size);
		this.currentValues	= new Array(size);
		this.goalValues		= new Array(size);
		this.changeValues 	= new Array(size);
		this.values		= size; //Nombre de variables à animer.
		//-=Fin de la section=-//

		//-=Gestion du temps=-//
		this.st = -1;
		this.dt = 0; //Temps écoulé depuis le début
		this.gt = 0; //Goal time
		//-=Fin de la section=-//

		//-=Fonction d'animation=-//
		this.easing = Penner.easeInOutSine;
		//-=Fin de la section=-//
	};

	Animation.prototype.animate = function(sValues, g, time)
	{
		console.log(sValues);
		console.log(g);

		//-=Réinitialisation animation=-//
		this.startValues = sValues;
		this.goalValues	 = g;
		this.st = -1;
		//-=FIn de la section=-//

		//-=Calcul des valeurs=-//
		this.gt = time;

		for(var i = 0; i < this.startValues.length; i++)
		{
			this.changeValues[i] = g[i] - this.startValues[i];
		}
		//-=Fin de la section=-//
	};

	Animation.prototype.force = function(values)
	{
		this.startValues	= values;
		this.currentValues	= JSON.parse(JSON.stringify(this.startValues));
	};

	//Fonction de mise à jour de l'animation.
	//tstamp le temps écoulé depuis la dernière frame
	Animation.prototype.update = function(tstamp)
	{
		if(!this.done())
		{
			//-=ST=-//
			if(this.st === -1)
			{
				this.st = tstamp;
			}
			//-=Fin de la section=-//

			//-=Mise a jour du temps de l'animation=-//
			this.dt = Math.floor(tstamp - this.st);
			this.dt = this.dt >= this.gt ? this.gt : this.dt;
			console.log(this.dt.toString() + " " + this.gt.toString());
			//-=Fin de la section=-//

			//-=Mise a jour de la valeur de l'animation=-//
			for(var i = 0; i < this.currentValues.length; i++)
			{
				this.currentValues[i] = this.easing(
					0,
					this.dt,
					this.startValues[i],
					this.changeValues[i],
					this.gt
				);

				//this.currentValues[i] = this.dt * this.changeValues[i] / this.gt + this.startValues[i]; //Fonction affine de dépannage
			}
			//-=Fin de la section=-//

			//-=Contrôle de fin de l'animation=-//
			if(this.dt >= this.gt)
			{
				this.dt = 0;
				this.gt = 0;
				this.st = -1;
			}
			//-=Fin de la section=-//
		}

		else
		{
			this.currentValues = this.goalValues;
		}
	};
	
	Animation.prototype.done = function()
	{
		//return this.dt > this.gt;
		return this.gt === 0;
	};

	return Animation;
});
