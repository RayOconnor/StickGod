//Global Variables
var xMax = 400;
var yMax = 400;
var zMax = 400;

var player = new Object;
player['position'];
player['dead'];	

// preload images
if (document.images)
{
	var img = new Array();
	img[0] = new Image();
	img[0].src = 'player.png';
}

function main_draw()
{
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,xMax,yMax);
	
	var player_image = new Image();
	player_image.src = "player.png";
	context.drawImage(player_image,player['position'][0],player['position'][1]);
}

function god_draw()
{
	var god_canvas = document.getElementById("god_screen");
	var context = god_canvas.getContext("2d");
	context.clearRect(0,0,xMax,zMax);
	
	var player_image = new Image();
	player_image.src = "player.png";
	context.drawImage(player_image,100,player['position'][1]);
}

function draw_all()
{
	main_draw();
	god_draw();
}


function step()
{
	draw_all();
	if(player['dead'])
	{
		document.getElementById("result").innerHTML = "GAME OVER";
		document.getElementById("button").style.visibility = 'visible';
	}
	else
	{
		wait_for_step();
	}

}
function wait_for_step()
{
	setTimeout('step()', 100);
}

function game()
{
	player['position'] = [40,10];
	player['dead'] = false;
	document.getElementById("button").style.visibility = 'hidden';
	wait_for_step();
}
