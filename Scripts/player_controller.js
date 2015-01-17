#pragma strict

PlayerPrefs.SetInt("Player Score", 10);




public var totalHealth : int = 10;
public var playerHealth : int = 5;

public var totalLives : int = 2;
public var playerLives : int = 3;

public var damage : int = 3;
public var doubleDamage : boolean = false;

public var speed : float;
public var doubleSpeed : boolean = false;

public var jumpHeight : float;
public var doubleJumpHeight : float;

public var gravity : float;
private var targetRotation : int;

private var jumpCount : boolean = true;

private var doubleSpeedTimer : float = 10;

rigidbody.useGravity = false;

function Start(){
	save();
}

function save(){
	var GUIScript : scoreManager = FindObjectOfType(scoreManager);
	var saveTime = GUIScript.timer;
	PlayerPrefs.SetInt("Time", saveTime);
	PlayerPrefs.Save();
	Debug.Log(saveTime);
}




function Update () {

	transform.position.z = 0; //precatuion to keep player from moving in z
	
	rigidbody.AddForce(new Vector3(0, -gravity * rigidbody.mass,0)); //custom gravity formula
	
	//handle horizontal movement
	if (doubleSpeed) {
		
		doubleSpeedTimer -= Time.deltaTime * 2;

		if (doubleSpeedTimer<=0){
			Debug.Log('double Speed off');
			doubleSpeed = false;
		}
		rigidbody.velocity.x = (speed * 2.5) * Input.GetAxis("Horizontal"); //left-1, right+1, default 0

	} else {
		rigidbody.velocity.x = speed * Input.GetAxis("Horizontal"); //left-1, right+1, default 0
	}


	if(rigidbody.velocity.x < 0){
		targetRotation = 180;
	}else if (rigidbody.velocity.x > 0){
		targetRotation = 0;
	}


	
	//transform.eulerAngles.y=targetRotation;
	transform.eulerAngles.y-=(transform.eulerAngles.y-targetRotation)/5;

	//handle jump
	if(Input.GetKeyDown("space") && isGrounded()){
		rigidbody.velocity.y = jumpHeight;
		jumpCount = true;
	} else if (Input.GetKeyDown("space") && !isGrounded() && (jumpCount)) {
		rigidbody.velocity.y = doubleJumpHeight;
		jumpCount = false;
	}
}

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