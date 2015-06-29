/*****************
 *-=keyboard.js=-*
 *****************

 Auteur : Florian Dupeyron (My?terious)
 Description : Permet de gérer le clavier. (visuel et non-visuel)
*/

define(["jquery"], function($)
{
	function Input(domBase)
	{
		//-=Initialisation attributs=-//
		this.enabled	= true;				//Permet de savoir si le clavier est activé ou non.
		this.domBase    = $(domBase); 			//Stocke l'élément DOM dans lequel le clavier visuel doit être mis.
		this.domElems   = [];				//Initialise le tableau qui va contenir les éléments DOM des lettres

		this.moveFired = function(ev) {};		//Callback qui doit être redéfini, quand une lettre est demandée.
		//-=Fin de la section=-//
		
		this.init();
	}

	Input.prototype.keyPressed = function(index)
	{
		if(this.enabled)
		{
			console.log("Evénement touche : " + index);
			this.moveFired(index);
		}
	};

	Input.prototype.setEnabled = function(e)
	{
		switch(e)
		{
			case true: //On active le clavier !
			//-=Afficahge clavier=-//
			for(var i = 0; i < this.domElems.length; i++)
				this.domElems[i].attr("disabled", false);
			//-=Fin de la section=-//
			
			break;

			case false:
			for(var i = 0; i < this.domElems.length; i++)
				this.domElems[i].attr("disabled", true);
			break;

			default:break; //Par défaut, on ne fait rien.
		}

		this.enabled = e;
	};

	//Fonction qui gère l'initialisation du clavier,
	//à savoir initialisation des éléments DOM,
	//Et des événements clavier.
	Input.prototype.init = function()
	{
		var thisInstance = this;

		//-=Initialisation clavier visuel=-//
		//-=Création élément DOM=-//
		function createButton(dir, code)
		{
			var newElem = $("<button>");

			//--Propriétés
			$(newElem).html(dir)
			$(newElem).click(function()
			{
				thisInstance.keyPressed(code);
			});

			$(thisInstance.domBase).append(newElem);
		}

		createButton("←", 37);
		createButton("↑", 38);
		createButton("→", 39);
		createButton("↓", 40);
		//-=Fin de la section=-//
		//-=Fin de la section=-//

		//-=Initialisation événement clavier non-visuel=-//
		//--Evenement
		$(document).keydown(function(e)
		{
			//-=Récupération du code de la touche=-//
			var code = e.which;
			//-=Fin de la section=-//

			//-=On appelle l'événement=-//
			if(code >= 37 && code < 41) thisInstance.keyPressed(code); //Il faut appeler l'événement que pour la touche à traiter !
			//-=Fin de la section=-//

			console.log("Touche matérielle préssée : " + e.which + " ; ");
		});
		//-=Fin de la section=-//
	};

	//Réinitialisation du clavier
	Input.prototype.reset = function()
	{
	};

	return Input;
});
