/**************
 *-=GoalManager.js=-*
 **************

 Auteur : Florian Dupeyron (My?terious) et Jérémy Forgereau (UltraBill)
 Description : Permet la gestion de l'objectif
*/
define(["Board","BoardManager", "Size"], function(Board,BoardManager,Size)
{
	"use strict";
	function GoalManager(b)
	{
		//-= Copie du tableau =-//
		this.bt = b;
		this.bc = JSON.parse(JSON.stringify(this.bt)); //Copie d'objet sale
		this.goal = [];
		this.numbers	= [];

		this.score = 0;
		//-= Fin de la section =-//
	}
	
	GoalManager.operations = ["+", "-", "*", "/"];
	
	GoalManager.prototype.generate = function()
	{
		//-= Génération de l'objectif que doit atteindre le joueur =-//
		var gb = new BoardManager(this.bc);	//BoardManager temporaire qui va jouer silencieusement.
		var dirTemp = 0;			//Direction temporaire
		var depMax = 10;			//Nombre de déplacements maximum
		var compteur = 0;			//Compteur du nombre de coups joués par l'ordinateur.
		var tabOutput = [];			//Tableau de sortie.

		var i; //i comme Incontournable.
		//-= Fin de Section =-//
		
		//-= Deplacemennts et gestions output
		while(gb.testMovableObject())
		{
			if (compteur >= depMax)
			{
				this.bt = new Board(new Size(Math.floor(Math.random() * 10) + 2, Math.floor(Math.random() * 10) + 2), 4); //Recréation d'un nouveau tableau
				this.bc = JSON.parse(JSON.stringify(this.bt));

				compteur = 0;
			}

			dirTemp = Math.floor(Math.random()*4)+37;
			tabOutput.push(gb.move(dirTemp).sum);
			compteur++;
		}

		for(i = 0; i < tabOutput.length; i++)
		if (tabOutput[i] == -1)
		{
			tabOutput.splice(i, 1);
			i--;
		}

		this.numbers = tabOutput;
		//-= Fin de la section =-//

		////-=Création Objectif signes=-//
		//this.result = this.numbers[0];
		//for(i = 1; i < this.numbers.length; i++)
		//{
		//	//-=On décide de l'opération=-//
		//	var op = GoalManager.operations[Math.floor(Math.random() * GoalManager.operations.length)];
		//	//-=Fin de la section=-//
		//	
		//	//-=On stocke=-//
		//	//--Stockage signe
		//	this.sign.push(op);

		//	//--Calcul result
		//	var opStr = this.result.toString() + op + this.numbers[i].toString();
		//	this.result = eval(opStr);
		//	//-=Fin de la section=-//
		//}
		////-=Fin de la section=-//

		return {
			"numbers": this.numbers,
			"coup": compteur
		};
	};

	//La fonction follow permet de suivre l'évolution du jeu.
	GoalManager.prototype.follow = function(sum,moveable)
	{
		if (sum !== -1)
			this.goal.push(sum);

		if (!moveable) //Il n'y a plus d'objet déplaceable, la partie est terminée.
		{
			if (this.goal.length === this.numbers.length) //Pour que l'on fasse la vérification, il faut que les deux tableaux soient de la même longueur.
			{
				for(var i; i < this.numbers.length; i++)
				if (this.goal[i] !== this.numbers[i])
					return  0;
			}
			else return 0;
			
			return 1; 
		}
		return -1;
	};

	//Simple fonction de mise à jour du score.
	GoalManager.prototype.updateScore = function()
	{
		this.score++;
		return this.score;
	};

	return GoalManager;
});
