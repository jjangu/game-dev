#pragma strict

public var scoreText : GUIText;
private  var score : int;

function Start () {
	score = 0;
	UpdateScore();
	

}

function Update () {

}

function UpdateScore () {
	scoreText.text = "Score: " + score;
}