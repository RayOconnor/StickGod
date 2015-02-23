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
var materials = 10;   //Materials (int)

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
	img[2].src = 'menubackground.png';
	img[3] = new Image();
	img[3].src = 'pstickmanside.png';
	img[4] = new Image();
	img[4].src = 'estickmanside.png';
	img[5] = new Image();
	img[5].src = 'stickmantop.png';
	img[6] = new Image();
	img[6].src = 'validstickmanicon.png';
	img[7] = new Image();
	img[7].src = 'invalidstickmanicon.png';

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
	if (materials >= 5)
	{
	var zpos = ypos;
	var soldier = new stickMan(0, ypos, zpos, 2, 10, 10, 5, 2, false);
	pArmy.pFootSoldiers.push(soldier);
	materials -= 5;
    }
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

//Spawns the soldiers in enemy army
function spawn_enemy_soldiers()
{
	//Generate random number for random lane
	var randNum = Math.floor((Math.random() * 4) + 1);
	var position;
	if (randNum == 1)
	{
		position = 375;
	}
	else if (randNum == 2)
	{
		position = 345;
	}
	else if (randNum == 3)
	{
		position = 315;
	}
	else 
	{
		position = 285;
	}
	var soldier = new stickMan(400, position, position, 2, 10, 10, 5, 2, false);
	eArmy.eFootSoldiers.push(soldier);
	materials += 5;
}

//////////////////// COLLISION AND COMBAT ///////////////////////////////////

//All this does right now is set speed to 0 on collision
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
    
    if (e.keyCode >= 49 && e.keyCode <= 52)
    {
    spawn_player_soldiers(yPos);
	}

    //Spawn random enemy soldier with 5
    if(e.keyCode == 53)
	{
		spawn_enemy_soldiers();
	}

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
		stick_image.src = "pstickmanside.png";
		context.drawImage(stick_image,pArmy.pFootSoldiers[i].x,pArmy.pFootSoldiers[i].y);
	}

	//Draw every enemy soldier
	for (var i = 0; i < eArmy.eFootSoldiers.length; i++)
	{
		var enemy_image = new Image();
		enemy_image.src = "estickmanside.png";
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

//Draw to god canvas
function menu_draw()
{
	//locate menu canvas in document and clear
	var menu_canvas = document.getElementById("menu_screen");
	var context = menu_canvas.getContext("2d");
	context.clearRect(0,0,800,100);

	//Draw menu background
	var background = new Image();
	background.src = "menubackground.png";
	context.drawImage(background,0,0);

	//Draw icons
	if (materials >= 5)
	{
	var stick_icon = new Image();
	stick_icon.src = "validstickmanicon.png";
	context.drawImage(stick_icon,10,10);
    }
    else 
    {
	var stick_icon = new Image();
	stick_icon.src = "invalidstickmanicon.png";
	context.drawImage(stick_icon,10,10);
    }

}

//Draw to each canvas
function draw_all()
{
	main_draw();
	god_draw();
	menu_draw();
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
	//document.getElementById("main_screen").onmousedown = keyListener;  //Removed to use keys instead (temporary)
	document.onkeydown = keyListener;  //Allows key use (for player and enemy spawn)
	wait_for_step();
}
