//-=Configuration require=-//
require.config({
    baseUrl: 'data/js',
    paths: {
        jquery: 'lib/jquery'
    }
});
//-=Fin de la section=-//
//

//Fonction pas belle de dernière minute, qui redémarre la partie. 
function dirtyRestart()
{
	"use strict";
	location.reload(); //BEUUURKKK
}

require(["jquery", "Board", "BoardDisplay", "BoardManager", "Size", "Screen", "GoalManager", "Input", "PageDisplay"], function($, Board, BoardDisplay, BoardManager, Size, Screen, GoalManager, Input, PageDisplay)
{
	$(document).ready(function()
	{
		var b = new Board(new Size(Math.floor(Math.random() * 5 )+ 3, Math.floor(Math.random() * 5) + 3), Math.floor(Math.random() * 4 + 1));
		
		var bm = new BoardManager(b);

		bm.move(b.oppositeSide);
		
		var d = new BoardDisplay(b);
		var g = new GoalManager(b);
		var ipt = new Input($("#controls"));
		var screen = new Screen($("#game"));
		var pageDisp = new PageDisplay($("#score_display"), $("#goal_display"), $("#loose_overlay"), $("#win_overlay"));
		
		var goal = g.generate();

		//-=Affichage goal=-//
		pageDisp.displayGoal(goal.numbers);
		pageDisp.displayScore(0);
		//-=Fin de la section=-//

		ipt.moveFired = function(index)
		{
			if(d.canMove())	
			{
				var r = bm.move(index);
				
				switch(g.follow(r.sum, r.moveable))
				{
					case 0:
					ipt.setEnabled(false); //Désactivation de l'entrée
					pageDisp.displayLoose();
					break;

					case 1:
					ipt.setEnabled(false); //Désactivation de l'entrée
					pageDisp.displayWin();
					break;
				}
				
				pageDisp.displayScore(g.updateScore());

				d.moves = r.moves;
				screen.draw(d, Screen.layerID.dynamic);
			}
		};

		screen.draw(d, Screen.layerID.background);
		screen.draw(d, Screen.layerID.static);
		screen.draw(d, Screen.layerID.dynamic);
	});
});
