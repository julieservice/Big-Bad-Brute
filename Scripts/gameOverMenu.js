#pragma strict

var gui : scoreManager;

function MainMenu () {
	var GUIScript : scoreManager = FindObjectOfType(scoreManager);
	GUIScript.pauseToggle = false;
	Application.LoadLevel("mainMenu");
}

function Restart () {
	var GUIScript : scoreManager = FindObjectOfType(scoreManager);
	GUIScript.pauseToggle = false;
	Application.LoadLevel(Application.loadedLevel);
}

function Resume () {
	gui.pauseToggle = true;
}