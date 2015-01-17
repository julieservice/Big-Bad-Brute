#pragma strict

//public var camera : GameObject;
var camera : GameObject;
var Player : GameObject;
private var leftSide = Screen.width;

private var thisTransform : Transform;
private var cameraChange : boolean = true;

function Start () {
	Player = GameObject.Find("MainPlayer");
}

function Update () {
	if(cameraChange){
	    transform.position.x = Player.transform.position.x;
		transform.position.y = Player.transform.position.y;
	} else if(!cameraChange) {
		
		transform.position.x = Player.transform.position.x + 15;
		transform.position.y = Player.transform.position.y;
		Debug.Log(leftSide);
		Debug.Log(Player.transform.position.x);
	}
}

function OnTriggerEnter (other : Collider){
	if(other.tag == "cameraLeft") {
		cameraChange = false;

	}
}

function OnTriggerExit(other : Collider){
	/*if(other.tag == "cameraLeft") {
		cameraChange = true ;
		transform.position.x = Player.transform.position.x * Time.deltaTime;
	}*/
}
/*
function Start () {
	target = GameObject.Find("MainPlayer");
}

function Update () {
	transform.position.x = target.transform.position.x+1;
	transform.position.y = target.transform.position.y+1;
}
*/