#pragma strict

public var scoreText : UI.Text;
public var pauseText : UI.Text;
private  var score : int;
public var pauseButton: UI.Button;
public var continueButton: UI.Button;
public var pausePanel: GameObject;
private var LC: LevelController;
private var highScore: int;
public var highScoreText: UI.Text;






function Start () {
	score = 0;
	highScore = 0;
	UpdateScore();
	pauseButton.onClick.AddListener(Catballs);
	continueButton.onClick.AddListener(Catdick);
	var levelControllerGameObject = GameObject.Find("LevelController");
	LC = levelControllerGameObject.GetComponent(LevelController);

}
public function Catballs () {
	Debug.Log(" Fuck you shit!");
	Time.timeScale = 0;
	pausePanel.SetActive(true);


}
public function Catdick() {
	Debug.Log("Hell yeah mayne");
	Time.timeScale = 1;
	pausePanel.SetActive(false);
}

function Update () {
	score = LC.score;
	UpdateScore();
	playerScore ();

}

function UpdateScore () {
	scoreText.text = "Score: " + score;
	pauseText.text = " " + score;
}

function playerScore () {
	if( score > highScore) {
		highScore = score;
		highScoreText.text = " " + highScore;
	}
}
 


