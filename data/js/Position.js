define(function()
{
	function Position(x, y)
	{
		this.x = x;
		this.y = y;
	}

	Position.prototype.set = function(x, y)
	{
		this.x = x;
		this.y = y;
	};

	Position.prototype.move = function(x, y)
	{
		this.x += x;
		this.y += y;
	};

	return Position;
});
