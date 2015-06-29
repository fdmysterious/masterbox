define(['Position', 'Size'], function(Position, Size)
{
	function BoxRect()
	{
		this.pos	= new Position(0, 0);

		this.size	= new Size(0, 0);
		this.halfSize	= new Size(0, 0);

		this.halfPos	= new Position(0, 0);
		this.rightPos	= new Position(0, 0);
	}

	BoxRect.prototype.update = function()
	{
		//-=RightPos update=-//
		this.rightPos.set(this.pos.x + this.size.width, this.pos.y + this.size.height);
		//-=Fin de la section=-//
		
		//-=HalfPos update=-//
		this.halfPos.set(this.pos.x + 0.5 * this.size.width, this.pos.y + 0.5 * this.size.height);
		//-=Fin de la section=-//

		//-=halfSize update=-//
		this.halfSize.set(this.size.width / 2, this.size.height / 2);
		//-=Fin de la section=-//
	};

	BoxRect.prototype.testAabb = function(other)
	{
		var result = new Position(0, 0);
		
		if(!(
			(this.pos.x > other.rightPos.x) ||
			(this.rightPos.x < other.pos.x) ||
			(this.pos.y > other.rightPos.y) ||
			(this.rightPos.y < other.pos.y)
		))
		{
			result.x = this.halfPos.x - other.halfPos.x;
			result.y = this.halfPos.y - other.halfPos.y;
		}
		
		return result;
	};
	
	BoxRect.prototype.collision = function(colTest)
	{
		return colTest.x != 0 || colTest.y != 0;
	}
	
	BoxRect.prototype.collisionDirection = function(colTest)
	{
		//On détermine quelle différence est majoritaire
		//Puis on calcule ou elle est.
		//Valeurs de retour : 1 Gauche, 2 Haut, 3 Droite, 4 Bas, 5 DBG, 6 DHG, 7 DHD, 8 DBD
		
		if(colTest.x == colTest.y)
		{
			if(colTest.x > 0)
			{
				if(colTest.y > 0) return 8;
				else return 7;
			}

			else
			{
				if(colTest.y > 0) return 1;
				else return 2;
			}
		}
		
		else if((colTest.y < colTest.x && colTest.x < 0) || (colTest.y > colTest.x && colTest.x > 0))
		{
			if(colTest.y > 0) return 2;
			else return 4;
		}
		
		else
		{
			if(colTest.x > 0) return 3;
			else return 1;
		}
	}

	BoxRect.prototype.testPoint = function(p)
	{
		if(
			(p.x < this.pos.x)	||
			(p.x > this.rightPos.x)	||
			(p.y < this.pos.y)	||
			(p.y > this.rightPos.y)
		)
		{
			return false;
		}

		else
		{
			return true;
		}
	};

	return BoxRect;
});
