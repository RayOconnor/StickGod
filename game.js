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
function stickMan(x, y, z, speed, health, def, atk, rng, fight){
	this.x = x;
	this.y = y;
	this.z = z;
	this.speed = speed;
	this.health = health;
	this.def = def;
	this.atk = atk;
	this.rng = rng;
	this.fight = fight;
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
	img[0].src = 'stickmanside.png';
	img[1] = new Image();
	img[1].src = 'stickmantop.png';
}


//moves the soldiers in the player army
function move_player_soldiers()
{
	for (var i = 0; i < pArmy.pFootSoldiers.length; i++)
	{
		pArmy.pFootSoldiers[i].x += pArmy.pFootSoldiers[i].speed;
	}
}

//Spawns player soldiers in player army
function spawn_player_soldiers(ypos)
{
	var zpos = ypos;
	var soldier = new stickMan(0, ypos, zpos, 2, 10, 10, 5, 2, false);
	pArmy.pFootSoldiers.push(soldier);
}

//Moves the soldiers in the enemy army
function move_enemy_soldiers()
{
	for (var i = 0; i < eArmy.eFootSoldiers.length; i++)
	{
		eArmy.eFootSoldiers[i].x -= eArmy.eFootSoldiers[i].speed;
	}
}

function check_collision()
{
	for (var i = 0; i < pArmy.pFootSoldiers.length; i++)
	{
		for (var e = 0; e < eArmy.eFootSoldiers.length; e++)
		{
			if (pArmy.pFootSoldiers[i].y == eArmy.eFootSoldiers[e].y &&
				Math.abs(pArmy.pFootSoldiers[i].x - eArmy.eFootSoldiers[e].x) < 20)
			{
				pArmy.pFootSoldiers[i].speed = 0;
				eArmy.eFootSoldiers[e].speed = 0;
			}
		}
	}
}


//Spawns player soldier at click location
function keyListener(e) {
    if(!e)
	{
		e = window.event;
	}
    var yPos = e.clientY;
    
    if (yPos <= 250)
    {
    	yPos = 100;
    }
    else if (yPos > 250 && yPos <= 400)
    {
    	yPos = 200;
    }
    else if (yPos > 400)
    {
    	yPos = 300;
    }
    spawn_player_soldiers(yPos);

}


function main_draw()
{
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,XMax,YMax);
	
	for (var i = 0; i < pArmy.pFootSoldiers.length; i++)
	{
		var stick_image = new Image();
		stick_image.src = "stickmanside.png";
		context.drawImage(stick_image,pArmy.pFootSoldiers[i].x,pArmy.pFootSoldiers[i].y);
	}

	for (var i = 0; i < eArmy.eFootSoldiers.length; i++)
	{
		var enemy_image = new Image();
		enemy_image.src = "stickmanside.png";
		context.drawImage(enemy_image,eArmy.eFootSoldiers[i].x,eArmy.eFootSoldiers[i].y);
	}
	
}

function god_draw()
{
	var god_canvas = document.getElementById("god_screen");
	var context = god_canvas.getContext("2d");
	context.clearRect(0,0,XMax,ZMax);
	
	for (var i = 0; i < pArmy.pFootSoldiers.length; i++)
	{
		var stick_image = new Image();
		stick_image.src = "stickmantop.png";
		context.drawImage(stick_image,pArmy.pFootSoldiers[i].x,pArmy.pFootSoldiers[i].z);
	}

	for (var i = 0; i < eArmy.eFootSoldiers.length; i++)
	{
		var enemy_image = new Image();
		enemy_image.src = "stickmantop.png";
		context.drawImage(enemy_image,eArmy.eFootSoldiers[i].x,eArmy.eFootSoldiers[i].z);
	}
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
	move_player_soldiers();
	move_enemy_soldiers();
	check_collision();
	
	if(pFortHealth <= 0)
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
	setTimeout('step()', 50);
}

//Main
function game()
{
	document.getElementById("button").style.visibility = 'hidden';
	document.getElementById("main_screen").onmousedown = keyListener;
	var soldier1 = new stickMan(50, 100, 100, 5, 10, 10, 5, 2, false);
	var soldier2 = new stickMan(20, 200, 200, 2, 10, 10, 5, 2, false);
	var enemy1 = new stickMan(350, 100, 100, 5, 10, 10, 5, 2, false);
	var enemy2 = new stickMan(380, 200, 200, 2, 10, 10, 5, 2, false);
	pArmy.pFootSoldiers.push(soldier1);
	pArmy.pFootSoldiers.push(soldier2);
	eArmy.eFootSoldiers.push(enemy1);
	eArmy.eFootSoldiers.push(enemy2);
	wait_for_step();
}
