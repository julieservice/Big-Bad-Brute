#pragma strict
//UI elements
var timerUI : UI.Text;
var scoreUI : UI.Text;

//points mulitpliers
var doublePtsOn : boolean = false; 
var doublePtsTimer : float = 10;
var triplePtsOn : boolean = false;
var triplePtsTimer : float = 10;

//start countdown and game countdown timer
var startTimer : float = 5;
var timer : float;
var gameStart : boolean = false;

//score from points coming in and the total score
var incomingScore : float;
var score : float;

//wanted levels
//var wantedUp : float = 1;
var wantedLevels : float = 1;

function Start() {
  
}

function Update(){
  //-------------Wanted Levels-------------//

  if(wantedLevels){
    WantedStars(wantedLevels);
  } else if(wantedLevels==2){

  }

  //-------------Health-------------//



  //-------------Score-------------//

  //points mulitpliers 
  if (triplePtsOn){
    doublePtsOn = false;
    //triple points timer
    triplePtsTimer -= Time.deltaTime * 2;
    //triple the incoming point
    score = score + (incomingScore * 3);
    //display triple points 
    scoreUI.text = "Score: " + score;
    incomingScore = 0;
    if (triplePtsTimer<=0){
      triplePtsOn = false;
      Debug.Log('triple points off');
    }
  } else if(doublePtsOn){
    //double points timer
    doublePtsTimer -= Time.deltaTime * 2;
    //double the incoming point
    score = score + (incomingScore * 2);
    //display double points 
    scoreUI.text = "Score: " + score;
    incomingScore = 0;
    if (doublePtsTimer<=0){
      doublePtsOn = false;
      Debug.Log('double points off');
    } 
  } else {
    score = score + incomingScore;
    scoreUI.text = "Score: " + score;
    incomingScore = 0;

  }


  //-------------Timer-------------//

  //Wait til the start timer runs out
  if(startTimer>0){
    startTimer -= Time.deltaTime;
    timerUI.fontSize = 50;
    timerUI.text = "Game Starts in : " + startTimer.ToString("0");
  }

  //5 seconds before the game starts to give the player some time
  if(startTimer<=0){
    timerUI.fontSize = 24;
    gameStart = true;
	  timer -= Time.deltaTime;
    var minutes : int = timer / 60;
    var seconds : int = timer % 60;
    var gameTimer = String.Format ("{0:00}:{1:00}", minutes, seconds);
    timerUI.color = Color.grey;

    //1 minute warning
    if(timer<=60 && timer>=58){
      timerUI.color = Color.red;
    }

    //no time left
    if(timer<=0){
      timerUI.color = Color.red;
      timerUI.text = "Game Over";
    }

    //standard 
    if (timer>0){
      timerUI.text = "Time: " + gameTimer;
    
  	}
  }
}

function WantedStars(stars){
  for (var i = 0; i<wantedLevels; i++){
    var wantedStarClone : GameObject = Instantiate(Resources.Load('Prefabs/Gui/WantedStar'), transform.position, transform.rotation);
    var Gui  = GameObject.Find("WantedLevels");
    wantedStarClone.transform.parent = Gui.transform;
    wantedStarClone.transform.localPosition = Vector3(wantedLevels * 1.4 ,0,0);
    wantedStarClone.transform.localScale = Vector3(0.0116076,0.0116076,0.0116076);
  }
}