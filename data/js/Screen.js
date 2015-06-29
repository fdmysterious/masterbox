/***************
 *-=Screen.js=-*
 ***************
 
 Auteur : Florian Dupeyron
 Description : Gestion de l'affichage : Ecran du jeu.
*/

define(["Canvas", "Size", "ScreenObject"], function(Canvas, Size, ScreenObject)
{
	function Screen(div)
	{
		console.log("Cr�ation �cran");
		
		//-=Initialisation des canvas d'affichage=-//
		function createCanvas(zIndex)
		{
			//-=Cr�ation de l'�l�ment HTML=-//
			var c = $("<canvas>Votre navigateur n'est pas support�</canvas>");
			var cTrad = c[0]; //permet de r�cup�rer le handler DOM de base (acc�s � getContext notamment).
			//-=Fin de la section=-//
			
			//-=Ajout � la page=-//
			$(div).append(c);
			//-=Fin de la section=-//
			
			//-=Positionnement=-//
			cTrad.width = $(div).width();
			cTrad.height = $(div).height();
			
			$(c).offset($(div).offset());
			//-=Fin de la section=-//
			
			//-=D�finition z-index=-//
			$(c).css("position", "absolute"); //sinon le z-index ne fonctionnera pas.
			$(c).css("z-index", zIndex);
			//-=Fin de la section=-//
			
			//-=On retourne le handler du canvas=-//
			return new Canvas(cTrad);
			//-=Fin de la section=-//
		}
		//-=Fin de la section=-//
		
		//-=Couches d'affichage=-//
		this.layer = 
		{
			background: createCanvas(0),
			static:		createCanvas(1),
			dynamic:	createCanvas(2)
		};
		//-=Fin de la section=-//
		
		//-=Propri�t�s=-//
		this.size	= new Size($(div).width(), $(div).height());
		//-=Fin de la section=-//
	}

	Screen.layerID =
	{
		background: 0,
		static: 1,
		dynamic: 2
	};
	
	Screen.prototype.draw = function(obj, l)
	{
		var fnc = //Tableau des fonctions de dessin
		[
			obj.drawBackground,
			obj.drawStatic,
			obj.drawDynamic
		];
		
		var d = fnc[l];		//On r�cup�re la fonction de dessin appropri�e.
		d.call(obj, this);	//On appelle la fonction de dessin
	};
	
	Screen.prototype.clear = function()
	{
		this.layer.background.clear();
		this.layer.static.clear();
		this.layer.dynamic.clear();
	};
	return Screen;
});