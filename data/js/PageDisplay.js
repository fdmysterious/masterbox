/*****************
 *-=PageDisplay=-*
 *****************

 Auteur : Florian Dupeyron (My?terious)
 Description : Gère l'afficahge des éléments DOM de la page.
*/

define(["jquery"], function($)
{
	"use strict";
	function PageDisplay(domScore, domGoal, domLoose, domWin)
	{
		//-=Variables mémoire DOM=-//
		this.dom = {
			//--Score
			score:  domScore,

			//--Objectif
			goal:	domGoal,

			//--Overlay perdu
			loose: domLoose,

			//--Overlay gagné
			win: domWin
		};
		//-=Fin de la section=-//
		
		$(this.dom.loose).hide();
		$(this.dom.win).hide();
	}

	PageDisplay.prototype.displayGoal = function(goal)
	{
		$(this.dom.goal).html(goal.toString());	
	};

	PageDisplay.prototype.displayScore = function(score)
	{
		$(this.dom.score).html(score.toString());
	};

	PageDisplay.prototype.displayLoose = function()
	{
		$(this.dom.loose).fadeIn(300);
	};

	PageDisplay.prototype.displayWin = function()
	{
		$(this.dom.win).fadeIn(300);
	};

	return PageDisplay;
});
