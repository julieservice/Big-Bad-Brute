#pragma strict


var extraLife : boolean = false;
var extraHealth : boolean = false;
var extraDamage : boolean = false;
var extraTime : boolean = false;
var lessTime : boolean = false;

var superSpeed : boolean = false;

var slowSpeed : boolean = false;

var doublePoints : boolean = false;
var triplePoints : boolean = false;

var spawnRandomCrates : boolean = false;

var lowerWantedLevel : boolean = false;
var raiseWantedLevel  : boolean = false;




function Update () {

}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player") {
		var playerScript : player_controller = FindObjectOfType(player_controller);
		var GUIScript : scoreManager = FindObjectOfType(scoreManager);

		//extra Life
	    if ((playerScript.playerLives < playerScript.totalLives) && extraLife){
			playerScript.playerLives++;
			Debug.Log(playerScript.playerLives + " player lives");
			Destroy(this.gameObject);
		}

		//extra Health
	    if ((playerScript.playerHealth < playerScript.totalHealth) && extraHealth){
			playerScript.playerHealth++;
			Debug.Log(playerScript.playerHealth + " player health");
			Destroy(this.gameObject);
		}

		//extra Time
	    if (extraTime){
			GUIScript.timer += 100;
			Debug.Log(GUIScript.timer + "player time");
			Destroy(this.gameObject);
		}

		//less Time
	    if (lessTime){
			GUIScript.timer -= 100;
			Debug.Log(GUIScript.timer + "player time");
			Destroy(this.gameObject);
		}

		//superSpeed
	    if (superSpeed){
			playerScript.doubleSpeed = true;
			Debug.Log("double speed on");
			Destroy(this.gameObject);
		}

		if (slowSpeed){
			playerScript.slowerSpeed = true;
			Debug.Log("double speed on");
			Destroy(this.gameObject);
		} 

		//Double Points
	    if (doublePoints){
			GUIScript.doublePtsOn = true; 
			Debug.Log("double points");
			Destroy(this.gameObject);
		}

		//Triple Points
	    if (triplePoints){
			GUIScript.triplePtsOn = true; 
			Debug.Log("triple points");
			Destroy(this.gameObject);
		}

		//Raise Wanted Level
	    if (raiseWantedLevel){
			GUIScript.wantedLevels++; 
			Debug.Log(GUIScript.wantedLevels + " wanted level");
			Destroy(this.gameObject);
		}

		//Lower Wanted Level
	    if (lowerWantedLevel){
			GUIScript.wantedLevels--; 
			Debug.Log(GUIScript.wantedLevels + " wanted level");
			Destroy(this.gameObject);
		}
	}
}

