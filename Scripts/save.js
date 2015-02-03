#pragma strict

var level: int;

function Start () {

}

function Update () {

}
 //saving player prefs
function saveLevels(){
	levelToLoad = PlayerPrefs.SetInt("savedLevel", level);
}

//getting PlayerPrefs
function getScores(){
	PlayerPrefs.GetInt("savedLevel");
	Application.LoadLevel(PlayerPref.GetInt("savedLevel"));

	if(PlayerPrefs.HasKey("savedLevel")){
		//if there is a saved level, load it
		Application.LoadLevel(PlayerPrefs.GetInt("savedLevel"));
	}else{
		//if no saved level, go to first level
		Application.LoadLevel(1);
	}
}

