/*********************
 *-=BoardDisplay.js=-*
 *********************

 Auteur : Florian Dupeyron (My?terious)
 Description : S'occupe de l'affichage du plateau.
*/

define(["ScreenObject", "DrawableObject", "Board", "Size", "Position", "NumberSquare", "Penner"], function(ScreenObject, DrawableObject, Board, Size, Position, NumberSquare, Penner)
{
	"use strict";
	function BoardDisplay(b)
	{
		//-=Appel constructeur parent=-//
		ScreenObject.call(this);
		//-=Fin de la section=-//

		//-=Position dans le canvas=-//
		this.rect.pos.x = 0;
		this.rect.pos.y = 0;
		//-=Fin de la section=-//

		//-=Récupération du plateau=-//
		this.b = b;
		//-=Fin de la section=-//
		
		//-=Paramètres d'affichage=-//
		this.dParam = {}; // = new Object(); (il paraît que la syntaxe {} est préférable)
		this.moves	= null;
		//-=Fin de la section=-//
		
		//-=Objets de dessin=-//
		//--Dessin du fond
		function DrawStaticImpl(b, dParam)
		{
			DrawableObject.call(this);
			this.dParam = dParam; //Contient les paramètres d'affichage
			this.b		= b;
		}
				
		DrawStaticImpl.prototype = Object.create(DrawableObject.prototype);
		DrawStaticImpl.prototype.constructor = DrawStaticImpl;
		
		DrawStaticImpl.prototype.drawObject = function(canvas)
		{	
			for(var i = 0; i < this.b.size.width; i++)
			for(var j = 0; j < this.b.size.height; j++)
			{
				//-=Calcul position dans le plateau=-//
				var pos = BoardDisplay.getPos(i, j, this.dParam);
				//-=Fin de la section=-//
				
				//-=Sauvegarde contexte=-//
				canvas.ctx.save();
				//-=Fin de la section=-//
				
				//-=Décalage canvas=-//
				BoardDisplay.translateCanvas(canvas, pos, this.dParam);
				//-=Fin de la section=-//
				
				//-=Dessin des cases=-//
				canvas.ctx.strokeStyle	= "black";
				canvas.ctx.fillStyle	= "black";
				canvas.ctx.lineWidth	= "2px";
				
				if(this.b.data[i][j] === -2) canvas.ctx.fillRect(0, 0, this.dParam.cSize.width, this.dParam.cSize.height);	//Case remplie
				canvas.ctx.strokeRect(0, 0, this.dParam.cSize.width, this.dParam.cSize.height);					//Affichage des contours
				//-=Fin de la section=-//
				
				//-=Restoration paramètres contexte=-//
				canvas.ctx.restore();
				//-=Fin de la section=-//
			}
			
			//-=Affichage côté ouvert=-//
			canvas.ctx.save();
			BoardDisplay.translateCanvas(canvas, new Position(this.dParam.offset.width, this.dParam.offset.height), this.dParam);
			canvas.ctx.strokeStyle="red";
			canvas.ctx.lineWidth="2px";

			var x = [
				-2,
				this.dParam.dSize.width - 2,
				-2,
				-2
			];

			var y = [
				-2,
				-2,
				this.dParam.dSize.height - 2,
				-2
			];

			var w = [
				this.dParam.dSize.width + 4,
				4,
				this.dParam.dSize.width + 4,
				4
			];

			var h = [
				4,
				this.dParam.dSize.height + 4,
				4,
				this.dParam.dSize.height + 4
			];

			var i = this.b.openSide - 1;

			canvas.ctx.strokeRect(x[i], y[i], w[i], h[i]);

			canvas.ctx.restore();
			//-=Fin de la section=-//
		};
		
		this.drawStaticObj = new DrawStaticImpl(this.b, this.dParam);
		
		//--Dessin du jeu
		function DrawDynamicImpl(b, dParam)
		{
			DrawableObject.call(this);
			this.dParam = dParam; //Contient les paramètres d'affichage
			this.b		= b;
			
			this.canvas = null;

			this.canUpdateDraw = true;
			
			this.moves = null;
			
			//-=Liste des objets à afficher=-//
			//this.drawList = new Array();
			this.drawList = [];
			//-=Fin de la section=-//
		}
				
		DrawDynamicImpl.prototype = Object.create(DrawableObject.prototype);
		DrawDynamicImpl.prototype.constructor = DrawDynamicImpl;

		//--Création dessin case nombre
		DrawDynamicImpl.prototype.createSquareDrawable = function(value, pos, dParam, destPos, out)
		{
			var posCopy = JSON.parse(JSON.stringify(pos)); //Dirty dirty way !!! (Copie d'objet)
			var posArray = [posCopy.x, posCopy.y];
			
			var r = new NumberSquare(value, posCopy, dParam.cSize);

			//--On force les valeurs d'animation pour être sur qu'elles soient correctes
			r.animation.position.force(posArray);
			r.animation.opacity.force([1]);
			
			if(destPos !== null) //Il y a animation à créer
			{
				var destPosCopy = JSON.parse(JSON.stringify(destPos));
				var destPosArray = new Array(destPosCopy.x, destPosCopy.y);
				console.log(destPosCopy);
				
				r.animation.position.animate(posArray, destPosArray, BoardDisplay.animTime);

				var op = out == 0; //Si l'objet sort, on change enlève l'opacité : donc si 1 => 0 ; 0 => 1

				r.animation.opacity.animate([1], [op], BoardDisplay.animTime); //Lancement de l'animation
			}
		
			this.drawList.push(r); //Ajout à la drawList

			return r;
		};
		
		DrawDynamicImpl.prototype.drawObject = function(canvas)
		{
			//-=Variables=-//
			var i, j;
			var obj;
			var out;
			var originalPos, destPos;
			var value;
			//-=Fin de la section=-//

			//-=On désactive la mise a jour de l'affichage=-//
			this.canUpdateDraw = false;	
			//-=Fin de la section=-//

			//-=Vidage s'il le faut de la liste d'animation=-//
			if(this.drawList.length) this.drawList = [];
			//-=Fin de la section=-//
			
			
			if(this.moves !== null) //Déplacements effectués : Préparation de l'animation
			{
				for(i = 0; i < this.moves.length; i++)
				{
					//-=Récupération des informations=-//
					obj		= this.moves[i];
					originalPos	= BoardDisplay.getPos(obj.from.x, obj.from.y, this.dParam);
					destPos		= BoardDisplay.getPos(obj.to.x, obj.to.y, this.dParam);
					value		= obj.value;
					out		= obj.out;
					//-=Fin de la section=-//
					
					//-=Création de l'objet animé=-//
					this.createSquareDrawable(value, originalPos, this.dParam, destPos, out);
					//-=Fin de la section=-//
				}	
				
				//-=Réinitialisation tableau mouvements=-//
				this.moves = null;
				//-=Fin de la section=-//
			}

			else //Affichage standard
			{
				for(i = 0; i < this.b.size.width; i++)
				for(j = 0; j < this.b.size.height; j++)
					if((value = this.b.data[i][j]) >= 0)
						this.createSquareDrawable(value, BoardDisplay.getPos(i, j, this.dParam), this.dParam, null, false);
			}
			
			//-=On réactive la mise a jour de l'affichage=-//
			this.canUpdateDraw = true;
			//-=Fin de la section=-//

			//-=Lancement de la mise a jour de l'animation=-//
			this.canvas = canvas;

			var t = this;
			requestAnimationFrame(function(tstamp){t.updateDraw(tstamp);});
			//-=Fin de la section=-//
			
		};
		
		DrawDynamicImpl.prototype.updateDraw = function(timestamp)
		{
			console.log("updateDraw");

			//-=Variables=-//
			var i;
			var obj;
			var finished = true;
			//-=Fin de la section=-//

			if(this.drawList.length) this.canvas.clear();

			for(i = 0; i < this.drawList.length; i++)
			{
				obj = this.drawList[i];

				//-=Mise a jour de l'animation de l'objet=-//
				if(!obj.animation.position.done())
				{
					this.drawList[i].animation.position.update(timestamp);
					if(finished !== false) 
					{
						finished = this.drawList[i].animation.position.done();
					}
				}

				if(!obj.animation.opacity.done())
				{
					this.drawList[i].animation.opacity.update(timestamp);
				}
				//-=Fin de la section=-//
				
				//-=Affichage de l'objet=-//
				this.canvas.draw(obj);
				//-=Fin de la section=-//
			}

			//-=Faut-il mettre à jour l'animation de nouveau ?=-//
			if(!finished && this.canUpdateDraw)
			{
				var t = this;
				requestAnimationFrame(function(tstamp){t.updateDraw(tstamp);});
			}

			else this.drawList = [];
			//-=Fin de la section=-//
		};

		DrawDynamicImpl.prototype.ready = function()
		{
			return !this.drawList.length;
		};

		this.drawDynamicObj = new DrawDynamicImpl(this.b, this.dParam);
		//-=Fin de la section=-//
	}
	
	//-=CONFIGURATION=-//
	//--Temps d'animation en ms
	BoardDisplay.animTime = 300;
	//-=Fin de la section=-//
	
	//-=Fonctions auxiliaires=-//
	//--Fonction calcul paramètres dessin
	BoardDisplay.getDispParameters = function(b, s)
	{
		var r = {};
		
		//-=Calcul de la taille du canvas=-//
		//Processus :
		//	-> calcul du rapport largeur / hauteur
		//  	-> Cacul de l'échelle
		//	-> Détermination de la dimension minimale
		//	-> On Détermine l'autre dimension avec le rapport calculé
		
		r.ratio = b.size.width / b.size.height;

		//--Valeur mini
		var min = Math.min(s.size.width, s.size.height);
		
		//--Détermination de la taille
		function computeDsize()
		{
			r.dSize = new Size(
				min === s.size.width	? min : min * r.ratio,
				min === s.size.height	? min : min / r.ratio
			);
		}

		computeDsize();

		if(r.dSize.width > s.size.width || r.dSize.height > s.size.height) // NOOOOOON
		{
			min = Math.max(s.size.width, s.size.height);
			computeDsize();
		}
		//-=Fin de la section=-//

		//-=Calcul de la taille d'une case en pixel=-//
		r.cSize = new Size(
			r.dSize.width / b.size.width,
			r.dSize.height / b.size.height
		);
		//-=Fin de la section=-//
		
		//-=Calcul offset=-//
		r.offset = new Size(
			s.size.width / 2 - r.dSize.width / 2,
			s.size.height / 2 - r.dSize.height / 2
		);
		//-=Fin de la section=-//
		
		return r;
	};
	
	//--Fonction d'obtention de la position d'affichage dans le tableau
	BoardDisplay.getPos = function(i, j, dParam)
	{
		var r = new Position();
		
		r.x = i * dParam.cSize.width  + dParam.offset.width;
		r.y = j * dParam.cSize.height + dParam.offset.height;
		
		return r;
	};
	
	//--Décalage canvas
	BoardDisplay.translateCanvas = function(canvas, pos, dParam)
	{
			canvas.ctx.translate(pos.x, pos.y);
	};
	
	//-=Fin de la section=-//

	//-=Héritage=-//
	BoardDisplay.prototype = Object.create(ScreenObject.prototype);
	//-=Fin de la section=-//

	BoardDisplay.prototype.drawBackground = function(screen)
	{
	};
	
	BoardDisplay.prototype.drawStatic = function(screen)
	{
		//-=Calcul des paramètres d'affichage=-//
		this.dParam = BoardDisplay.getDispParameters(this.b, screen);
		console.log(this.dParam);
		//-=Fin de la section=-//
		
		//-=Affichage du fond=-//
		this.drawStaticObj.b = this.b;
		this.drawStaticObj.dParam = this.dParam;
		
		screen.layer.static.clear();
		screen.layer.static.draw(this.drawStaticObj);
		//-=Fin de la section=-//
	};
	
	BoardDisplay.prototype.drawDynamic = function(screen)
	{
		//-=Calcul des paramètres d'affichage=-//
		this.dParam = BoardDisplay.getDispParameters(this.b, screen);
		//-=Fin de la section=-//
		
		//-=Affichage du plateau de jeu=-//
		//this.drawDynamicObj.b = this.b;
		this.drawDynamicObj.dParam = this.dParam;
		this.drawDynamicObj.moves = this.moves;
		
		//screen.layer.dynamic.clear();
		screen.layer.dynamic.draw(this.drawDynamicObj);
		//-=Fin de la section=-//
	};

	BoardDisplay.prototype.canMove = function()
	{
		return this.drawDynamicObj.ready();
	}

	return BoardDisplay;
});
