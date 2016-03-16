#pragma strict

public var points:int = 20;
public var speed:int = 2;
private var LC:LevelController;
private var pickedUp:boolean = false;
private var PC:PlayerController;
private var GC:GameController;
public var destroyOffset:float = 0.2;

function Start () {

	var levelControllerGameObject = GameObject.Find("LevelController");
	LC = levelControllerGameObject.GetComponent(LevelController);

	var playerControllerGameObject = GameObject.Find("Player");
	PC = playerControllerGameObject.GetComponent(PlayerController);

//	var CanvasGameObject = GameObject.Find("Canvas");
//	GC = CanvasGameObject.GetComponent(GameController);
}

function Update () {
	
}

function OnTriggerEnter2D(other: Collider2D) {

	Debug.Log("OnTriggerEnter2D");
    Debug.Log(LC.levelSpeed);

	if (other.tag == "Player" && !pickedUp) {
		Debug.Log("hit by the player");

		pickedUp = true;

		// disappear
		Destroy(gameObject, destroyOffset);

		// ding (visual / audio effect)
		if (transform.GetComponent(Animation)) {
			var animationController = transform.GetComponent(Animation);
			animationController.enabled = true;
		}
		

		// points
		LC.addPoints(points);

		// add to JumpHeight
		LC.addSpeed(speed);

	}
}