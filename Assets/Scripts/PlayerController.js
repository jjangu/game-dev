#pragma strict

public var maxSpeed:Number = 8;
public var acceleration:Number = 0.2;
public var jumpHeight:Number;
public var upwardForce:Number;
private var jumpUsed:boolean = false;
private var bounced:boolean = true;
private var LC:LevelController;
private var mode = "jumping"; 

function Start () {
	// Get level controller
    
    var levelControllerGameObject = GameObject.Find("LevelController");
    LC = levelControllerGameObject.GetComponent(LevelController);
    
    jumpHeight = LC.levelSpeed;
    Debug.Log(jumpHeight);
    
    Debug.Log(mode);
}

public function skyLevelTrigger() {

	mode = "flying";
    
    LC.speedDrainRate = 0.003;
    LC.levelSpeed = 6;
}

public function useBounce() {
    
    yield WaitForSeconds(1);
    bounced = true;
}

function FixedUpdate () {
    
    jumpHeight = LC.levelSpeed;
    upwardForce = LC.levelSpeed;

	var rb = GetComponent(Rigidbody2D);
    
    var rayStart = transform.position;
    rayStart.y -= 2.6;
    Debug.DrawRay(rayStart, -Vector2.up * 0.1, Color.green, 1 );

    var hitSomething1:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);
    rayStart.x -= 1;
    var hitSomething2:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);
    rayStart.x += 2;
    var hitSomething3:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);
    
    
	if (mode == "jumping") {
        
        if ( Input.GetKey(KeyCode.LeftArrow) ) {
        rb.velocity.x -= acceleration;
        } else if ( Input.GetKey(KeyCode.RightArrow) ) {
            rb.velocity.x += acceleration;
        }

		if ( (hitSomething1.collider && hitSomething1.collider.tag == "Ground" && hitSomething1.distance < 0.1) || 
           (hitSomething2.collider && hitSomething2.collider.tag == "Ground" && hitSomething2.distance < 0.1) || 
           (hitSomething3.collider && hitSomething3.collider.tag == "Ground" && hitSomething3.distance < 0.1)) {

			if ( !jumpUsed && Input.GetKey(KeyCode.UpArrow) ) {
                
				jumpUsed = true;
				rb.velocity.y = jumpHeight; // get JumpSpeed from LevelController
			}

			if (Input.GetKey(KeyCode.UpArrow)) {
                
				jumpUsed = false;
			}

		} 
        
        if ( (hitSomething1.collider && hitSomething1.collider.tag == "SkyLevelTrigger" && hitSomething1.distance < 0.1) ||
            (hitSomething2.collider && hitSomething2.collider.tag == "SkyLevelTrigger" && hitSomething2.distance < 0.1) ||
            (hitSomething3.collider && hitSomething3.collider.tag == "SkyLevelTrigger" && hitSomething3.distance < 0.1)) {

			Debug.Log("Sky Level Triggered");
			skyLevelTrigger();
		}	


	} else if ( mode == "flying" ) {
        
        if ( Input.GetKey(KeyCode.LeftArrow) ) {
            rb.velocity.x -= acceleration;
        } else if ( Input.GetKey(KeyCode.RightArrow) ) {
            rb.velocity.x += acceleration;
        }
        
        if (bounced == true) {
            rb.velocity.y = upwardForce;
        }
        
        if ( (hitSomething1.collider && hitSomething1.collider.tag == "Ground" && hitSomething1.distance < 0.1) || 
           (hitSomething2.collider && hitSomething2.collider.tag == "Ground" && hitSomething2.distance < 0.1) || 
           (hitSomething3.collider && hitSomething3.collider.tag == "Ground" && hitSomething3.distance < 0.1)) {
            
            rb.velocity.y -= upwardForce + 5;
            bounced = false;
            
            useBounce();
        }
	}
} 
