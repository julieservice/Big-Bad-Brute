#pragma strict

var Text : UnityEngine.UI.Text;

var startTimer : float = 5;
var timer : float;
var countDownSeconds : int;

function Start() {
	
}

function Update(){
  startTimer -= Time.deltaTime;
  
  Debug.Log(startTimer);
  if(startTimer<=0){
	  timer -= Time.deltaTime;
    
    var minutes : int = timer / 60;
    var seconds : int = timer % 60;
    Text.color = Color.grey;
    if(timer<=60 && timer>=58){
      Text.color = Color.red;
    }
    if(timer<=0){
      Text.color = Color.grey * Time.deltaTime;
      Text.text = "Game Over";
      //print (PlayerPrefs.GetInt("Time"));
    }

    if (timer>0){
      //displaying in the 3Dtext
      var Score = String.Format ("{0:00}:{1:00}", minutes, seconds); 
      Text.text = "Time: " + Score;

  	}
  }

	//Text.fontSize = 50;
	
}