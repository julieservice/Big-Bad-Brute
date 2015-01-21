#pragma strict

PlayerPrefs.SetInt("Player Score", 10);



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

var chPosition : Transform;
//-------------Camera Position Changes-------------//
public var CameraChangeLeft : boolean = false;




function Start(){
	rigidbody.useGravity = false;
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
	//-------------Speed and Movement-------------//
		if (doubleSpeed) {
			doubleSpeedTimer -= Time.deltaTime * 2;
			if (doubleSpeedTimer<=0){
				Debug.Log('double Speed off');
				doubleSpeed = false;
			}
			rigidbody.velocity.x = (speed * 2.5) * Input.GetAxis("Horizontal"); //left-1, right+1, default 0
		} else if (slowerSpeed) {
			slowerSpeedTimer -= Time.deltaTime * 2;
			if (slowerSpeedTimer<=0){
				Debug.Log('double Speed off');
				slowerSpeed = false;
			}
			rigidbody.velocity.x = (speed / 1.5) * Input.GetAxis("Horizontal"); //left-1, right+1, default 0
		} else {
			rigidbody.velocity.x = speed * Input.GetAxis("Horizontal"); //left-1, right+1, default 0
		}


		//-------------Character Rotation-------------//
		if((Input.GetAxis("Horizontal") < 0) && movingRight){
			transform.localScale = new Vector3(-transform.localScale.x,transform.localScale.y,transform.localScale.z);
			movingRight = false;
		}else if ((Input.GetAxis("Horizontal") > 0) && !movingRight ){
			transform.localScale = new Vector3(-transform.localScale.x,transform.localScale.y,transform.localScale.z);
			movingRight = true;
		}
	 

		//-------------Character Jump-------------//
		if(Input.GetKeyDown("space") && isGrounded()){
			rigidbody.velocity.y = jumpHeight;
			jumpCount = true;
		} else if (Input.GetKeyDown("space") && !isGrounded() && (jumpCount)) {
			rigidbody.velocity.y = doubleJumpHeight;
			jumpCount = false;
		}

		if(onLadder && Input.GetKeyDown("w")){
			transform.position += Vector3.up;
			gravity = 0;
		} else {
			gravity = 35;
		}
	}
}


function OnTriggerEnter(other : Collider){
	if(other.tag == "cameraLeft") {
		CameraChangeLeft = true;
	}

	if(other.tag == "ladder") {
		onLadder = true;
		Debug.Log('enter');
	}
}

function OnTriggerExit(other : Collider){
	if(other.tag == "cameraLeft") {
		CameraChangeLeft = false;
	}

	if(other.tag == "ladder") {
		onLadder = false;
		Debug.Log('exit');
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