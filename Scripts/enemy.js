#pragma strict

var mallCop : boolean = false;
var police : boolean = false;
var army : boolean = false;
var robotCop : boolean = false;

var points : int;

var randomSpawn : GameObject[];
var Player : GameObject;
var EnemyBody : Transform;
var EnemyHealthBar : RectTransform;
var enemyHealthContainer : Canvas;
var enemyHealth = 2.0;
var enemyHealthTotal = 3.0;
var MoveSpeed = 4;
var MaxDist = 10;
var MinDist = 3;
var speed : float; // var to control enemy speed

private var enemySeeing : boolean = false;

var waypoint : Transform[];
private var currentWaypoint : int;

function Start(){
	Player = GameObject.FindWithTag("Player");
}

function Update () {

	var GUIScript : scoreManager = FindObjectOfType(scoreManager);

	/*-----------Enemy Health------------*/

	if (enemyHealth == enemyHealthTotal){
		enemyHealthContainer.enabled = false;
	} else {
		enemyHealthContainer.enabled = true;
		var healthRemaining = (enemyHealth - enemyHealthTotal);
		var healthPercent = (healthRemaining/enemyHealthTotal);
		var healthPosition = (healthPercent * 700.0);
		EnemyHealthBar.localPosition = new Vector3(healthPosition, 0, 0);
	}

	if(GUIScript.gameStart && enemyHealth > 0){
		/*-----------Enemy Sees the chacter------------*/

		if(Vector3.Distance(transform.position,Player.transform.position) <= MinDist && enemyHealth > 0 ){
			//Seeing();
			enemySeeing = true;
			//add all transforms inside seeing function 
			var targetPostition : Vector3 = new Vector3( Player.transform.position.x, this.transform.position.y, this.transform.position.y ) ;

		    targetPostition.x = transform.position.x;
		    EnemyBody.transform.LookAt(targetPostition);
		    //EnemyBody.transform.position += targetPostition*0.1*Time.deltaTime;
		}

		/*-----------Enemy Stop Seeing the Character------------*/
		

		if(Vector3.Distance(transform.position,Player.transform.position) >= MaxDist) {
			enemySeeing = false;
		}

		/*-----------Enemy Waypoint------------*/

		if(!mallCop){
			if(currentWaypoint < waypoint.length && !enemySeeing){
				var target : Vector3 = waypoint[currentWaypoint].position;
				var moveDirection : Vector3 = target - transform.position;
				var velocity = moveDirection.normalized * speed;
						
				if(moveDirection.magnitude < .5){
					currentWaypoint++;
					EnemyBody.transform.localScale = new Vector3(-transform.localScale.x,transform.localScale.y,transform.localScale.z);
				}
			}else{
				currentWaypoint = 0;
				EnemyBody.transform.localScale = new Vector3(transform.localScale.x,transform.localScale.y,transform.localScale.z);
			}
		}
	rigidbody.velocity = velocity;
	} else {
		rigidbody.velocity.x = 0;
	}
}

function Seeing() {
	yield WaitForSeconds(3);
	if (enemySeeing){
		//transform.position += transform.forward*MoveSpeed*Time.deltaTime;
	}
}

function OnTriggerEnter (other : Collider){
	var playerScript : player_controller = FindObjectOfType(player_controller);
	/*-----------Enemy gets hurt------------*/

	if(other.tag == "weapon" && enemyHealth > 0 ) {
		enemyHealth--;
		/*audio.clip = healthSound;
        audio.Play();*/
		//var rBody : Rigidbody = GetComponent( Rigidbody );
		
		var spawnItem : GameObject;
		if (enemyHealth == 0){
			for(var i = 0; i<5; i++){
				var prefabRandom = Random.Range(0,randomSpawn.Length-1);
				var safeName : String = randomSpawn[prefabRandom].name.ToString();
				Debug.Log(safeName);
				Debug.Log(i);
				spawnItem = Instantiate(Resources.Load('Prefabs/PickUps/'+safeName), Vector3(Random.Range(-0.1 + transform.position.x, transform.position.x + 0.1),Random.Range(transform.position.y + 0.3,0), 0), transform.rotation);
				var box : BoxCollider;
				box = spawnItem.AddComponent(BoxCollider);
				spawnItem.rigidbody.useGravity = true;
				spawnItem.rigidbody.velocity = transform.TransformDirection(Vector3(0,Random.Range(transform.position.y + 0.3,0), 0));
				spawnItem.transform.name = safeName;
				yield WaitForEndOfFrame;   
			}
			yield WaitForSeconds(5);
			Destroy(gameObject);
		}
	}

	if(other.tag == "Player" && enemyHealth > 0 ) {
		playerScript.playerHealth--;
	}
}




