//Constant Variables
var XMax = 400;
var YMax = 400;
var ZMax = 400;
var ZScalingFactor = .5;
var YScalingFactor = .3;

//Global Variables

//Player fort health (int)
var pFortHealth = 10;
//Enemy boss health (int)
var eBossHealth;
// materials (int)
var materials;

//Basic foot soldier
// x = int x axis
// y = int y axis
// z = int z axis
// speed = int movement speed
// health = int health
// def = int defense 
// atk = int attack
// rng = int range
function stickMan(x, y, z, speed, health, def, atk, rng){
	this.x = x;
	this.y = y;
	this.z = z;
	this.speed = speed;
	this.health = health;
	this.def = def;
	this.atk = atk;
	this.rng = rng;
}

//Player Army
// pFootSoldiers = Array foot soldiers
// pTowerSoldiers = Array tower soldiers
// pTowerSupport = Array tower support
var pArmy = new Object;
	pArmy.pFootSoldiers = [];
	pArmy.pTowerSoldiers = [];	
	pArmy.pTowerSupport = [];


//Enemy Army
// eFootSoldiers = Array foot soldiers
var eArmy = new Object;
	eArmy.eFootSoldiers = [];


// preload images
if (document.images)
{
	var img = new Array();
	img[0] = new Image();
	img[0].src = 'stickman.png';
}

function main_draw()
{
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,XMax,YMax);
	
	var stick_image = new Image();
	stick_image.src = "stickman.png";
	context.drawImage(stick_image,200,200);
}

function god_draw()
{
	var god_canvas = document.getElementById("god_screen");
	var context = god_canvas.getContext("2d");
	context.clearRect(0,0,XMax,ZMax);
	
	var stick_image = new Image();
	stick_image.src = "stickman.png";
	context.drawImage(stick_image,100,100);
}

function draw_all()
{
	main_draw();
	god_draw();
}


//Calls draw function
//Checks game end condition
//Waits for step
function step()
{
	draw_all();
	if(pFortHealth > 0)
	{
		document.getElementById("result").innerHTML = "GAME OVER";
		document.getElementById("button").style.visibility = 'visible';
	}
	else
	{
		wait_for_step();
	}

}

//Timer til next draw
function wait_for_step()
{
	setTimeout('step()', 100);
}

//Main
function game()
{
	document.getElementById("button").style.visibility = 'hidden';
	wait_for_step();
}
