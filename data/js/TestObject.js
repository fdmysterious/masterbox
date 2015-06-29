define(["DrawableObject", "Position", "BoxRect", "Canvas"], function(DrawableObject, Position, BoxRect, Canvas)
{
	function TestObject(canvas, position)
	{
		console.log("Coucou");
		
		this.rect = new BoxRect();
		this.rect.pos = position;
		
		canvas.ctx.font = "30px Arial";

		var size = canvas.ctx.measureText("Hello world !");
		this.rect.size.set(size.width, 30);
	}

	TestObject.prototype = new DrawableObject;

	TestObject.prototype.drawObject = function(canvas)
	{
		canvas.ctx.fillText("Hello world !", this.rect.pos.x, this.rect.pos.y);
	};

	return TestObject;
});
