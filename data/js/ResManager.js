/*******************
 *-=ResManager.js=-*
 *******************

 Auteur : Florian Duperyon (My?terious)
 Description : Permet de gérer les ressources du jeu.
*/

define(["jquery", "res"], function($, res) 
{
	function ResManager()
	{
		//-=Callbacks=-//
		this.loaded = function(){console.log("Chargement terminé");};
		//-=Fin de la section=-//

		//-=Gestion des ressources=-//
		this.srcs = res;
		//-=Fin de la section=-//
	}

	//Permet de charger une image de manière asynchrone, en préservant s'il le faut l'utilisation du cache.
	ResManager.prototype.loadImageAsync = function(path)
	{
		//Voir : https://stackoverflow.com/questions/4285042/can-jquery-ajax-load-image, réponse tout en bas.
		return $.Deferred(function(t)
		{
			var img		= new Image();
			img.onload	= function () {t.resolve(img);}
			img.onerror	= function () {t.reject();}
			img.src=source;
		}).promise();
	}

	ResManager.prototype.loadSVGAsync = function(path)
	{
		return $.Deferred(function(t)
		{
			var r = $.ajax(
			{
				url: path,
			    	dataType: "xml" //Utiliser le type XML ici permet de pouvoir par la suite manipuler le SVG
			});

			r.done(function(svg)
			{
				t.resolve(svg); //On accepte et on renvoie le truc
			});

			r.fail(function()
			{
				t.reject();
			});
		});
	};

	//Fonction de chargement des ressources
	//Algorithme de chargemetn des ressources :
	//	-> Pour chaque type parcouru :
	//		-> On vérifie la présence de chemins de ressources à charger
	//		-> On tente le chargement de la ressource
	ResManager.prototype.load = function()
	{
		console.log("Loading resources...");

		for(var type in this.srcs) //Parcours des différents types de ressources disponibles
		{
			console.log(type);

			//if(this.srcs.hasOwnProperty(type) && type.hasOwnProperty("paths"))
			if(type.hasOwnProperty("paths")) //Présence d'éventuelles ressources à charger
			{
				console.log("-> Resource type : " + type.constructor.name);

				for(var i = 0; i < type.paths.length; i++)
				{
					console.log("Ressource trouvée : " + type.paths[i]);
					//-=On charge la ressource=-//
					if(type.constructor.name == "img") //On doit charger une image.
					{
						$.when(this.loadImageAsync(type.paths[i])).done(function(img)
						{
							console.log("Ressource chargée" + type.paths[i]);
						}).fail(function()
						{
							console.log("Ressource non chargée " + type.paths[i]);
						});
					}

					else if(type.constructor.name == "svg") //Chargement des fichiers svg
					{
						$.when(this.loadSVGAsync(type.paths[i])).done(function(img)
						{
							console.log("C'est cool");

							//-=Création de la balise=-//
							var svgNode = $("svg", img);
							var docNode = document.adoptNode(svgNode[0]);

							$(body).append(docNode);
							//-=Fin de la section=-//
						}).fail(function()
						{
							console.log("Erreur lors du chargement de l'image ! :(");
						});
					}
					//-=Fin de la section=-//
				}
			}
		}
	};

	return ResManager;
});
