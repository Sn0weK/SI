var canvas = null;
 
var ctx = null;
 
var spritesheet = null;
 
var spritesheetLoaded = false;

 
var world = [[]];

 
var worldWidth = 21;
var worldHeight = 21;

 
var tileWidth = 32;
var tileHeight = 32;

 
var pathStart = [worldWidth,worldHeight];
var pathEnd = [0,0];
var currentPath = [];

 
if (typeof console == "undefined") var console = { log: function() {} };

 
function onload()
{
	console.log('Page loaded.');
	canvas = document.getElementById('gameCanvas');
	canvas.width = worldWidth * tileWidth;
	canvas.height = worldHeight * tileHeight;
	canvas.addEventListener("click", canvasClick, false);
	if (!canvas) alert('Blah!');
	ctx = canvas.getContext("2d");
	if (!ctx) alert('Hmm!');
	spritesheet = new Image();
	spritesheet.src = 'spritesheet.png';
	 
	spritesheet.onload = loaded;
}

function loaded()
{
	console.log('Spritesheet loaded.');
	spritesheetLoaded = true;
	createWorld();
}

 
function createWorld()
{
	console.log('Creating world...');

	 
	for (var x=0; x < worldWidth; x++)
	{
		world[x] = [];

		for (var y=0; y < worldHeight; y++)
		{
			world[x][y] = 0;
		}
	}

	 
	for (var x=1; x < worldWidth; x++)
	{
		for (var y=1; y < worldHeight; y+=2)
		{
			// if (Math.random() > 0.75)
      //   world[x][y] = 1;
			world[x][y] = 1;
			if(x%10==0)
			{
				world[x][y] = 0;
			}
		}
	}

	currentPath = [];
while (currentPath.length == 0)
	{
		pathStart = [Math.floor(0),Math.floor(0)];
		pathEnd = [Math.floor(0),Math.floor(0)];
		if (world[pathStart[0]][pathStart[1]] == 0)
		currentPath = findPath(world,pathStart,pathEnd);
	}
	
	redraw();

}

async function redraw()
{
	if (!spritesheetLoaded) return;

	console.log('redrawing...');

	var spriteNum = 0;

	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var x=0; x < worldWidth; x++)
	{
		for (var y=0; y < worldHeight; y++)
		{

			switch(world[x][y])
			{
			case 1:
				spriteNum = 1;
				break;
			default:
				spriteNum = 0;
				break;
			}

			ctx.drawImage(spritesheet,
			spriteNum*tileWidth, 0,
			tileWidth, tileHeight,
			x*tileWidth, y*tileHeight,
			tileWidth, tileHeight);

		}
	}

	console.log('Current path length: '+currentPath.length);
	for (rp=0; rp<currentPath.length; rp++)
	{
		switch(rp)
		{
		case 0:
			spriteNum = 2;  
			break;
		case currentPath.length-1:
			spriteNum = 3;  
			break;
		default:
			spriteNum = 4;  
			break;
		}

		ctx.drawImage(spritesheet,
			spriteNum*tileWidth, 0,
			tileWidth, tileHeight,
			currentPath[rp][0]*tileWidth,
			currentPath[rp][1]*tileHeight,
			tileWidth, tileHeight);
		await sleep(100);
		if(rp != 0 && rp != currentPath.length-1)
		{
			ctx.drawImage(spritesheet,
				spriteNum*tileWidth, 0,
				tileWidth, tileHeight,
				currentPath[rp][0]*tileWidth,
				currentPath[rp][1]*tileHeight,
				tileWidth, tileHeight);
			spriteNum = 0;
			ctx.drawImage(spritesheet,
				spriteNum*tileWidth, 0,
				tileWidth, tileHeight,
				currentPath[rp][0]*tileWidth,
				currentPath[rp][1]*tileHeight,
				tileWidth, tileHeight);
		}
	}	
	console.log(world);	
}

 
function canvasClick(e)
{
	var x;
	var y;

	 
	if (e.pageX != undefined && e.pageY != undefined)
	{
		x = e.pageX;
		y = e.pageY;
	}
	else
	{
		x = e.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
	}

	 
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	 
	var cell =
	[
	Math.floor(x/tileWidth),
	Math.floor(y/tileHeight)
	];

	 
	console.log('we clicked tile '+cell[0]+','+cell[1]);

	pathStart = pathEnd;
	pathEnd = cell;

	 
	currentPath = findPath(world,pathStart,pathEnd);
	redraw();
}

 
 
function findPath(world, pathStart, pathEnd)
{
	 
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	 
	 
	 
	 
	var maxWalkableTileNum = 0;

	 
     
	 
	 
	var worldWidth = world.length;
	var worldHeight = world.length;
	var worldSize =	worldWidth * worldHeight;

	 
	 
	var distanceFunction = ManhattanDistance;
	var findNeighbours = function(){};  



	 
	 

	function ManhattanDistance(Point, Goal)
	{	 
		abs(Point.x - Goal.x) + abs(Point.y - Goal.y)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}

	function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	function canWalkHere(x, y)
	{
		console.log(world[x][y]);
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));
	};

	function Node(Parent, Point)
	{
		var newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * worldWidth),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};

		return newNode;
	}

	function calculatePath()
	{

		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		 
		var AStar = new Array(worldSize);
		 
		var Open = [mypathStart];
		 
		var Closed = [];
		 
		var result = [];
		 
		var myNeighbours;
		 
		var myNode;
		 
		var myPath;
		 
		var length, max, min, i, j;
		 
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			 
			myNode = Open.splice(min, 1)[0];
			 
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				 
				AStar = Closed = Open = [];
				 
				result.reverse();
			}
			else  
			{
				 
				myNeighbours = Neighbours(myNode.x, myNode.y);
				 
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						 
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						 
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						 
						Open.push(myPath);
						 
						AStar[myPath.value] = true;
					}
				}
				 
				Closed.push(myNode);
			}
		}  
		return result;
	}

	return calculatePath();

}  

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
//funckja nastepnika, koszt zwariantowane, ciag akcji, kolejka priorytetowa do odwiedzenia stanow.
//czytanie kodow, 