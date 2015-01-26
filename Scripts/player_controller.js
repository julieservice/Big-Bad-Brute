#pragma strict

//-------------Player Variables-------------//

public var feetCheck : GameObject;

public var totalHealth : int = 10;
public var playerHealth : int = 5;

public var totalLives : int = 2;
public var playerLives : int = 3;

public var gravity : float;
private var jumpCount : boolean = true;
private var movingRight : boolean = true;

public var damage : int = 3;
public var doubleDamage : boolean = false;

public var speed : float;
public var doubleSpeed : boolean = false;
private var doubleSpeedTimer : float = 10;
public var slowerSpeed : boolean = false;
private var slowerSpeedTimer : float = 10;

public var jumpHeight : float;
public var doubleJumpHeight : float;

var onLadder : boolean = false;
var weapon : GameObject;

var attacking : boolean = false;

var dustDirection : boolean;
var emissionSpeed : float = 0;
//-------------Camera Position Variables-------------//

public var CameraChangeLeft : boolean = false;




function Start(){
	PlayerPrefs.SetInt("Player Score", 10);
	rigidbody.useGravity = false;
	weapon = gameObject.Find("weapon");
	save();

}

//-------------Call to this function to save at any time-------------//
function save(){
	var GUIScript : scoreManager = FindObjectOfType(scoreManager);
	var saveTime = GUIScript.timer;
	PlayerPrefs.SetInt("Time", saveTime);
	PlayerPrefs.Save();
	Debug.Log(saveTime);
}

function Update () {
	var GUIScript : scoreManager = FindObjectOfType(scoreManager);
	transform.position.z = 0; //precatuion to keep player from moving in z
	rigidbody.AddForce(new Vector3(0, -gravity * rigidbody.mass,0)); //custom gravity formula
	
	if(GUIScript.gameStart){

		emissionSpeed = 25;

		//-------------Double Speed, Slow Speed and Regular Speed-------------//
		// Double Speed
		if (doubleSpeed) {
			doubleSpeedTimer -= Time.deltaTime * 2;
			if (doubleSpeedTimer<=0){
				Debug.Log('double Speed off');
				doubleSpeed = false;
			}
			if (isGrounded()){
				Dust(false);
			}
			rigidbody.velocity.x = (speed * 2.5) * Input.GetAxis("Horizontal");

		// Slow Speed
		} else if (slowerSpeed) {
			slowerSpeedTimer -= Time.deltaTime * 2;
			if (slowerSpeedTimer<=0){
				Debug.Log('double Speed off');
				slowerSpeed = false;
			}
			rigidbody.velocity.x = (speed / 1.5) * Input.GetAxis("Horizontal");

		// Regular Speed
		} else if(Input.GetAxis("Horizontal")) {
			if (isGrounded()){
				Dust(false);
			} else {
				feetCheck.particleSystem.emissionRate = 0;
			}
			rigidbody.velocity.x = speed * Input.GetAxis("Horizontal");
		} else {
			feetCheck.particleSystem.emissionRate = 0;
			rigidbody.velocity.x = 0;
		}

		//-------------Character Rotation-------------//

		//Scales the character on the x axis

		if((Input.GetAxis("Horizontal") < 0) && movingRight){
			RotateCharacter();
			movingRight = !movingRight;
		}else if ((Input.GetAxis("Horizontal") > 0) && !movingRight ){
			RotateCharacter();
			movingRight = !movingRight;

		}
	 
		//-------------Character Jump and Double Jump-------------//

		if(Input.GetKeyDown("space") && isGrounded()){
			rigidbody.velocity.y = jumpHeight;
			jumpCount = true;
		} else if (Input.GetKeyDown("space") && !isGrounded() && (jumpCount)) {
			rigidbody.velocity.y = doubleJumpHeight;
			jumpCount = false;
		}

		//-------------Attach to ladders-------------//

		///////////////////////////////////////// Not Implemented

		if(onLadder && Input.GetKeyDown("w")){
			transform.position += Vector3.up;
			gravity = 0;
		} else {
			gravity = 35;
		}


		//---------------Fall Damage-------------//

		///////////////////////////////////////// Not Implemented


		//FALL DAMAGE
		if (rigidbody.velocity == -45){
			Debug.Log('owwwww');
		}

		if(Input.GetKeyDown("e")){
			attacking = true;
			weapon.collider.enabled = true;
		}

		if (Input.GetKeyUp("e")){
			//attackDown = false;
			weapon.collider.enabled = false;
		}



		//--------no life left--------/
		if (playerHealth==0 && playerLives>=1){
			//this.transform = Vector3(0,0,0);
			playerHealth = totalHealth;
			playerLives--;
		}
	} else {
		feetCheck.particleSystem.emissionRate = 0;
	}
}


function RotateCharacter(){
	transform.localScale = new Vector3(-transform.localScale.x,transform.localScale.y,transform.localScale.z);
}

//-------------Dust Trail at his feet-------------//

function Dust(rotate){
	if (rotate){

	} else {
		feetCheck.particleSystem.emissionRate = emissionSpeed;
	}
	
	//feetCheck.particlesystem.enableEmission = true;


	//DustRotate
	/*
	var dustParticle : GameObject;
	dustParticle = Instantiate(Resources.Load('Prefabs/Particles/Dust'), transform.position, transform.rotation);

	
	var playerFeet  = GameObject.Find("groundCheck");
	var newScale : float = Mathf.Lerp(0.2, 1,  Time.deltaTime * 40);

	
	if (rotate){
		dustParticle = Instantiate(Resources.Load('Prefabs/Particles/DustRotate'), transform.position, transform.rotation);
		dustParticle.transform.position = new Vector3(playerFeet.transform.position.x + 1, playerFeet.transform.position.y, 0);
		if (dustDirection){
			dustParticle.transform.position = new Vector3(playerFeet.transform.position.x + 1, playerFeet.transform.position.y, 0);
			dustParticle.transform.rotation *= Quaternion.AngleAxis( 180, transform.up );
			dustParticle.rigidbody.velocity = Vector3(-3,4,0);
			dustDirection = !dustDirection;
		} else {
			dustParticle.transform.position = new Vector3(playerFeet.transform.position.x - 1, playerFeet.transform.position.y, 0);
			dustParticle.rigidbody.velocity = Vector3(3,4,0);
			dustDirection = !dustDirection;
		}
	} else {
		dustParticle = Instantiate(Resources.Load('Prefabs/Particles/Dust'), transform.position, transform.rotation);
		if (dustDirection){
			dustParticle.transform.position = new Vector3(playerFeet.transform.position.x + 1, playerFeet.transform.position.y, 0);
		} else {
			dustParticle.transform.position = new Vector3(playerFeet.transform.position.x - 1, playerFeet.transform.position.y, 0);
		}
	}
	
	dustParticle.transform.localScale = Vector3(newScale, newScale, newScale);
	dustParticle.rigidbody.AddForce(0,30,0);
	*/
    
}

function OnTriggerEnter(other : Collider){

	//enabling the cinematic camera

	if(rigidbody.velocity.y < -0.1 && other.tag == "head"){
			Debug.Log('boop');
	}


	if(other.tag == "cameraLeft") {
		CameraChangeLeft = true;
	}

	if(other.tag == "ladder") {
		onLadder = true;
		Debug.Log('enter');
	}

	//player gets hurt

	if(other.tag == "hurt") {
		Attack();
	}
}

function OnTriggerExit(other : Collider){

	//resets cinematic camera

	if(other.tag == "cameraLeft") {
		CameraChangeLeft = false;
	}

	if(other.tag == "ladder") {
		onLadder = false;
		Debug.Log('exit');
	}
}

function Attack(){
	if (playerHealth>=0 && playerLives>=0){
		playerHealth--;
		Debug.Log('stoppppppp');
	}
}

//-------------Is Grounded Check-------------//

function isGrounded(){
	var front : Vector3 = transform.position;
	front.x += 0.4;
	var middle : Vector3 = transform.position;
	var back : Vector3 = transform.position;
	back.x -= 0.4;
	
	//debug ray cast
	var jumpLine : float = collider.bounds.size.y/2 + 0.1;
	Debug.DrawRay (middle, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay (front, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay (back, Vector3(0, -jumpLine, 0), Color.red);
	
	if(
		Physics.Raycast(front, Vector3.down, collider.bounds.size.y/2+0.1) ||
		Physics.Raycast(middle, Vector3.down, collider.bounds.size.y/2+0.1) ||
		Physics.Raycast(back, Vector3.down, collider.bounds.size.y/2+0.1)
	){
		return true;
	}
	return false;
}