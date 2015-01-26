#pragma strict

var pointAmount : int = 10;

function OnTriggerEnter(other : Collider){

	if(other.tag == "Player"){
		var GUIScript : scoreManager = FindObjectOfType(scoreManager);
		GUIScript.incomingScore = 10.0;
		Destroy(this.gameObject);
	}

	

}