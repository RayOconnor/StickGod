//Constant Variables
var XMax = 400;  
var YMax = 400;
var ZMax = 400;
var ZScalingFactor = .5;
var YScalingFactor = .3;
var GameSpeed = 50;

//Global Variables

var pFortHealth = 10; //Player fort health (int)
var eBossHealth;      //Enemy boss health (int)
var materials;        //Materials (int)

//Basic foot soldier
function stickMan(x, y, z, speed, health, def, atk, rng, fight){
	this.x = x;            // x = int x axis
	this.y = y;            // y = int y axis
	this.z = z;            // z = int z axis
	this.speed = speed;    // speed = int movement speed
	this.health = health;  // health = int health
	this.def = def;        // def = int defense 
	this.atk = atk;        // atk = int attack
	this.rng = rng;        // rng = int range
	this.fight = fight;    // fight = bool fight
}

//Player Army
var pArmy = new Object;
	pArmy.pFootSoldiers = [];   // pFootSoldiers = Array foot soldiers
	pArmy.pTowerSoldiers = [];	// pTowerSoldiers = Array tower soldiers
	pArmy.pTowerSupport = [];   // pTowerSupport = Array tower support


//Enemy Army
var eArmy = new Object;
	eArmy.eFootSoldiers = [];   // eFootSoldiers = Array foot soldiers


// preload images
if (document.images)
{
	var img = new Array();
	img[0] = new Image();
	img[0].src = 'mainbackground.png';
	img[1] = new Image();
	img[1].src = 'godbackground.png';
	img[2] = new Image();
	img[2].src = 'stickmanside.png';
	img[3] = new Image();
	img[3].src = 'stickmantop.png';
}


//////////////////// PLAYER ARMY ///////////////////////////////////

//moves the soldiers in the player army
function move_player_soldiers()
{
	for (var i = 0; i < pArmy.pFootSoldiers.length; i++)
	{
		pArmy.pFootSoldiers[i].x += pArmy.pFootSoldiers[i].speed;
	}
}

//Spawns player soldiers in player army
//called from keylistener
//yPos = int y-axis (lane)
function spawn_player_soldiers(ypos)
{
	var zpos = ypos;
	var soldier = new stickMan(0, ypos, zpos, 2, 10, 10, 5, 2, false);
	pArmy.pFootSoldiers.push(soldier);
}

////////////////////// ENEMY ARMY /////////////////////////////////////

//Moves the soldiers in the enemy army
function move_enemy_soldiers()
{
	for (var i = 0; i < eArmy.eFootSoldiers.length; i++)
	{
		eArmy.eFootSoldiers[i].x -= eArmy.eFootSoldiers[i].speed;
	}
}

//////////////////// COLLISION AND COMBAT ///////////////////////////////////

//
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

//////////////////// KEY LISTENER ////////////////////////////////////

//Spawns player soldier at click location
//CURRENTLY: MAPPED TO KEYS 1, 2, 3, and 4 to represent lanes
function keyListener(e) {
    if(!e)
	{
		e = window.event;
	}
    
    //Removed click location to temporarily use number keys
    /*
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
    */
	if(e.keyCode == 49)
	{
		yPos = 375;
	}		
	else if(e.keyCode == 50)
	{
		yPos = 345;
	}
	else if(e.keyCode == 51)
	{
		yPos = 315;
	}
	else if(e.keyCode == 52)
	{
		yPos = 285;
	}
    spawn_player_soldiers(yPos);

}

/////////////////// DRAW METHODS ///////////////////////////////////

//Draw to main canvas
function main_draw()
{
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,XMax,YMax);

	//Draw main background
	var background = new Image();
	background.src = "mainbackground.png";
	context.drawImage(background,0,0);

	//Draw every player soldier
	for (var i = 0; i < pArmy.pFootSoldiers.length; i++)
	{
		var stick_image = new Image();
		stick_image.src = "stickmanside.png";
		context.drawImage(stick_image,pArmy.pFootSoldiers[i].x,pArmy.pFootSoldiers[i].y);
	}

	//Draw every enemy soldier
	for (var i = 0; i < eArmy.eFootSoldiers.length; i++)
	{
		var enemy_image = new Image();
		enemy_image.src = "stickmanside.png";
		context.drawImage(enemy_image,eArmy.eFootSoldiers[i].x,eArmy.eFootSoldiers[i].y);
	}
	
}

//Draw to god canvas
function god_draw()
{
	//locate god canvas in document and clear
	var god_canvas = document.getElementById("god_screen");
	var context = god_canvas.getContext("2d");
	context.clearRect(0,0,XMax,ZMax);

	//Draw god background
	var background = new Image();
	background.src = "godbackground.png";
	context.drawImage(background,0,0);

	//Draw every player soldier
	for (var i = 0; i < pArmy.pFootSoldiers.length; i++)
	{
		var stick_image = new Image();
		stick_image.src = "stickmantop.png";
		context.drawImage(stick_image,pArmy.pFootSoldiers[i].x,pArmy.pFootSoldiers[i].z);
	}

	//Draw every enemy soldier
	for (var i = 0; i < eArmy.eFootSoldiers.length; i++)
	{
		var enemy_image = new Image();
		enemy_image.src = "stickmantop.png";
		context.drawImage(enemy_image,eArmy.eFootSoldiers[i].x,eArmy.eFootSoldiers[i].z);
	}
}

//Draw to each canvas
function draw_all()
{
	main_draw();
	god_draw();
}

///////////////////// MAIN GAME RUNNING METHODS /////////////////////////////////

//Calls draw function
//Checks game end condition
//Waits for next step
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
	setTimeout('step()', GameSpeed);  //Wait (int) GameSpeed, call step()
}

//Main
function game()
{
	document.getElementById("button").style.visibility = 'hidden';
	//document.getElementById("main_screen").onmousedown = keyListener;
	document.onkeydown = keyListener;
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
