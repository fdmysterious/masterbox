/**************
 *-=Board.js=-*
 **************

 Auteur : Florian Dupeyron (My?terious) et Jérémy Forgereau (UltraBill)
 Description : Permet la création du plateau
*/

define(["Size"], function(Size)
{
	//Pour la création du plateau :
	//	-> La taille du plateau bSize en cases (type Size)
	function Board(bSize, openSide)
	{
		this.sides =
		{
			top: 1,
			right: 2,
			bottom: 3,
			left: 4
		};

		this.opposite = [40, 37, 38, 39];
		
		//-=Initialisation taille du plateau=-//
		if(bSize == null)
		{
			console.warn("Aucune taille fournie pour le plateau.");
			this.size = new Size(0, 0);
		}

		else
		{
			this.size = bSize;
		}
		//-=Fin de la section=-//
		
		//-=Contenu du plateau=-//
		this.data = new Array(this.size.width);

		//--Initialisation contenu cases
		for(var i = 0; i < this.data.length; i++)
		{
			//--Création du tableau
			this.data[i] = new Array(this.size.height);

			//--Remplissage du tableau avec des -1 (case vide)
			for(var j = 0; j < this.data[i].length; j++)
			{
				var rnd = Math.floor(Math.random() * 101); //Entre 0 et 100
				
				if(rnd <= 20)	//20 % de chances d'avoir une case avec un nombre
				{
					this.data[i][j] = Math.floor(Math.random() * 10) + 1;
				}
				
				else if(rnd <= 30) //10 % de chances d'avoir une case remplie
				{
					this.data[i][j] = -2;
				}
				
				else	//70% de chances d'avoir du vide
				{
					this.data[i][j] = -1;
				}
			}
		}
		//-=Fin de la section=-//
		
		//-=Memorisation côté ouvert=-//
		this.openSide = openSide;
		this.oppositeSide = this.opposite[this.openSide - 1];
		//-=Fin de la section=-//

		//-=Console=-//
		console.log(this.data);
		//-=Fin de la section=-//
	};

	return Board;
});
