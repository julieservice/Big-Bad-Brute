#pragma strict

public var enemyhealth = 3; 

 var Player : Transform;
 var MoveSpeed = 4;
 var MaxDist = 45;
 var MinDist = 3;
 
private var enemySeeing : boolean = false;
 
var waypoint : Transform[]; //empty array of transforms
public var speed : float; // var to control enemy speed
private var currentWaypoint : int;



function Update () {

	//enemy sees the player

	if(Vector3.Distance(transform.position,Player.position) <= MinDist && enemyhealth > 0 ){
		Seeing();
		enemySeeing = true;
		transform.LookAt(Player);
	}

	//enemy is to far from the character
	
	if(Vector3.Distance(transform.position,Player.position) >= MaxDist) {
		enemySeeing = false;
	}

	//waypoints
	
	if(currentWaypoint < waypoint.length && enemySeeing == false){
		var target : Vector3 = waypoint[currentWaypoint].position;
		var moveDirection : Vector3 = target - transform.position;
		var velocity = moveDirection.normalized * speed;
				
		if(moveDirection.magnitude < .5){
			currentWaypoint++;
		}
	}
	
	rigidbody.velocity = velocity;
}

function Seeing() {
	WaitForSeconds(3);
	if (enemySeeing){
		transform.position += transform.forward*MoveSpeed*Time.deltaTime;
	}
}

function OnTriggerEnter (other : Collider){
	if(other.tag == "Player" && enemyhealth > 0) {
		enemyhealth--;
		/*audio.clip = healthSound;
        audio.Play();*/
		//var rBody : Rigidbody = GetComponent( Rigidbody );
		
		if (enemyhealth == 0){
			
			yield WaitForSeconds(5);
			Destroy(gameObject);
		}
	}
}

function OnDrawGizmos(){
	Gizmos.color = Color.red;	
	Gizmos.DrawCube(GameObject.FindGameObjectWithTag("waypoint").transform.position, new Vector3(0.5, 0.5, 0.5));
}
