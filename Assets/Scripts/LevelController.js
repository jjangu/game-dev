#pragma strict

public var score:int = 0;
public var speedDrainRate:Number = 0.001;
public var maxSpeed:Number = 15;
public var minSpeed:Number = 1;
private var PC:PlayerController;

public var levelSpeed:Number = 20;

function Start () {
    var playerControllerGameObject = GameObject.Find("Player");
	PC = playerControllerGameObject.GetComponent(PlayerController);
}

public function addSpeed(speed:Number) {
    
    if (levelSpeed < 20) {
        levelSpeed += speed;
    } 
    
}

public function addPoints(points:int) {
	score += points;
	Debug.Log("Score: " + score);
}

function Update () {

}

function FixedUpdate () {
	levelSpeed -= speedDrainRate;
}