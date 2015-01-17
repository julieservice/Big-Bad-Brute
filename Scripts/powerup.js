#pragma strict

var extraLife : boolean = false;
var extraHealth : boolean = false;
var extraDamage : boolean = false;
var extraTime : boolean = false;

var superSpeed : boolean = false;
var superSpeedTimer : boolean = false;

var spawnRandomCrates : boolean = false;
var doublePoints : boolean = false;
var triplePoints : boolean = false;
var lowerWantedLevel : boolean = false;
var raiseWantedLevel  : boolean = false;




function Update () {

}

function OnTriggerEnter (other : Collider) {
	var life : player_controller = FindObjectOfType(player_controller);
	var health : player_controller = FindObjectOfType(player_controller);
	var speed : player_controller = FindObjectOfType(player_controller);
	var GUIScript : scoreManager = FindObjectOfType(scoreManager);

	//extra Life
    if ((life.playerLives < life.totalLives) && extraLife){
		life.playerLives++;
		Debug.Log(life.playerLives + " player lives");
		Destroy(this.gameObject);
	}

	//extra Health
    if ((health.playerHealth < health.totalHealth) && extraHealth){
		health.playerHealth++;
		Debug.Log(health.playerHealth + " player health");
		Destroy(this.gameObject);
	}

	//extra Time
    if (extraTime){
		GUIScript.timer += 100;
		Debug.Log(GUIScript.timer + "player time");
		Destroy(this.gameObject);
	}


	//superSpeed
    if (superSpeed){
		speed.doubleSpeed = true;
		Debug.Log("double speed on");
		Destroy(this.gameObject);
	} 

}

