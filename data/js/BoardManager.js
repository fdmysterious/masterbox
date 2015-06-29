/**************
 *-=BoardManager.js=-*
 **************

 Auteur : Florian Dupeyron (My?terious) et Jérémy Forgereau (UltraBill)
 Description : Permet la gestion du plateau
*/
define(["Board", "Position"], function(Board, Position)
{
	function BoardManager(b)
	{
		//-=Memorisation du modele=-//
		this.b = b;
		//-=Fin de la section=-//
	}
	
	BoardManager.prototype.testMovableObject = function()
	{
		//-= Detection des objets déplacables =-//
		for (var x = 0; x < this.b.size.width; x++)
		for (var y = 0; y < this.b.size.height; y++)
			if (this.b.data[x][y] >= 0) return true;

		return false;
		//-=Fin de la section=-//
	};
		
	BoardManager.prototype.move = function(variableTouche)
	{
		//-=définition de la direction=-//
		var vdir, hdir;
		var tabVdir = [0,-1,0,1];
		var tabHdir = [-1,0,1,0];
		
		if ((variableTouche >= 37) && (variableTouche <= 40))
		{
			vdir = tabVdir[variableTouche - 37];
			hdir = tabHdir[variableTouche - 37];
		}
		else vdir = hdir = 0;
		//-=Fin de la section=-//

		//-=Création du tableau des id=-//
		var tabID = new Array(this.b.size.width);
		for(var i = 0; i < this.b.size.width; i++)
		{
			var tmpArray = new Array(this.b.size.height);
			for(var j = 0; j < this.b.size.height; j++)
			{
				var id = null;
				
				if(this.b.data[i][j] >= 0)
				{
					//-=Création ID=-//
					id = new Position(i, j);
					//-=Fin de la section=-//
				}
				tmpArray[j] = id;
			}

			//-=Ajout du tableau temporaire=-//
			tabID[i] = tmpArray;
			//-=Fin de la section=-//
		}

		console.log(tabID);
		//-=Fin de la section=-//

		//-=Création tableau des déplacements=-//
		var tabMoves = [];
		function saveMove(from, to, value, out)	//Enregistrement d'un mouvement d'une case dans le tableau
		{
			move = {
				"from": from,
				"to": to,
				"value": value,
				"out": out
			};

			tabMoves.push(move);
		}
		//-=Fin de la section=-//

		//-=Variables=-//
		var somme = -1;
		//-=Fin de la section=-//

		//-=Gestion déplacements-=//
		if(vdir + hdir)
		{
			var temp = 1;
			
			var dataTemp	= this.b.data;
			var dataTempID	= tabID;
			
			while(temp)
			{
				temp = 0;
				// parcour du tableau
				for (var x = 0; x < this.b.size.width; x++)
				{
					for (var y = 0; y < this.b.size.height; y++)
					{
						var valeurTab = this.b.data[x][y];
						var valeurTabID = tabID[x][y];
						
						function popCase()	//gestion valeurs sortantes 
						{
							somme = somme < 0 ? 0 : somme;
							dataTemp[x][y] = -1;
							dataTempID[x][y] = null;
							somme += valeurTab;

							saveMove(valeurTabID, new Position(x2, y2), valeurTab, true);
						}
						
						if (valeurTab >= 0)	//On a rencontré un nombre
						{
							var x2 = x + hdir;
							var y2 = y + vdir;
							switch(this.b.openSide)
							{
								case this.b.sides.top:
									if(y2 < 0) popCase();
								break;
								
								case this.b.sides.bottom:
									if(y2 >= this.b.size.height) popCase();
								break;
								
								case this.b.sides.left:
									if(x2<0) popCase();
								break;
								
								case this.b.sides.right:
								if(x2 >= this.b.size.width) popCase();
								break;
								
								default: break;
							}
							
							if ((x2 >= 0) && (x2 < this.b.size.width) && (y2 >= 0) && (y2 < this.b.size.height))
							if (this.b.data[x2][y2] === -1)
							{
								dataTemp[x2][y2] = valeurTab;
								dataTemp[x][y] = -1;
								temp = 1;
								
								//-=Enregistrement déplacement=-//
								dataTempID[x2][y2]	= valeurTabID;
								dataTempID[x][y]	= null;
								//-=Fin de la section=-//
							}
						}
					}
				}
				this.b.data = dataTemp;
				tabID		= dataTempID;
			}

			//-=Enregistrement déplacements=-//
			for(var x = 0; x < this.b.size.width; x++)
			for(var y = 0; y < this.b.size.height; y++)
				if(tabID[x][y] != null)     saveMove(tabID[x][y], new Position(x, y), this.b.data[x][y], false);
			//-=Fin de la section=-//
		}
		//-=Fin de la section=-//

		return {
			sum: somme,
			moves: tabMoves,
			moveable: this.testMovableObject()
		};
	};
	return BoardManager;
});
