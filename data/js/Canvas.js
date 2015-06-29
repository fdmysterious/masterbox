define(['Size'], function(Size)
{
	function Canvas(c)
	{
		console.log("Création canvas");
		
		this.c		= c
		this.ctx	= this.c.getContext("2d");

		this.size	= new Size(this.c.width, this.c.height);

		this.click = function(x, y)
		{
			console.log("CLIC !");
		};

		//-=Ajout événement clic=-//
		var t = this;
		this.c.addEventListener("click", function(ev)
		{
			var x = ev.pageX - t.c.offsetLeft;
			var y = ev.pageY - t.c.offsetTop;

			t.click(x, y); //Appel du callback de clic
		});
		//-=Fin de la section=-//
	}
	
	Canvas.prototype.clear = function()
	{
		this.ctx.clearRect(0, 0, this.c.width, this.c.height); //Efface tout.
	}
	
	Canvas.prototype.setSize = function(w, h)
	{
		console.log("Définition de la taille du canvas : " + w + " " + h);
		this.c.width	= w;
		this.c.height	= h;
		this.ctx		= this.c.getContext("2d");
	};

	Canvas.prototype.paint = function(color)
	{
		this.ctx.save();
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.c.width, this.c.height);
		this.ctx.restore();
	}
	
	Canvas.prototype.draw = function(obj)
	{
		obj.draw(this);
	}
	
	Canvas.prototype.update = function()
	{
		this.size.set(this.c.width, this.c.height);
	}

	return Canvas;
});
