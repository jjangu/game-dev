#pragma strict

public var maxSpeed:Number = 8;
public var acceleration:Number;
public var jumpHeight:Number;
public var upwardForce:Number;
private var jumpUsed:boolean = false;
private var bounced:boolean = true;
private var LC:LevelController;
public var mode = "jumping"; 
public var anim:Animator;
private var grounded:boolean;

function Start () {
	// Get level controller
    
    var levelControllerGameObject = GameObject.Find("LevelController");
    LC = levelControllerGameObject.GetComponent(LevelController);
    
    jumpHeight = LC.levelSpeed;
    Debug.Log(jumpHeight);
    
    Debug.Log(mode);
    // anim = GetComponent("Animator");

    var sprite = transform.Find("PlayerSprite");
    anim = sprite.GetComponent(Animator);

    grounded = true;

    if (EditorApplication.currentScene == "Assets/Skytime.unity") {
    	mode = "FreeFall";
    }
}

public function skyLevelTrigger() {

	mode = "flying";
    // anim.SetBool("Fly", true);
    anim.SetLayerWeight(2,1);
    anim.transform.localScale = new Vector3 (2.3,2.3,1);
    anim.transform.localPosition = new Vector3 (0,-0.33,0);
    Destroy(GameObject.Find("1. Jetpack"), 0.2);
    
    LC.speedDrainRate = 0.003;
    LC.levelSpeed = 6;
}

public function freeFallTrigger() {

	Application.LoadLevel("Skytime");
	mode = "FreeFall";
}

public function useBounce() {
    
    yield WaitForSeconds(0.1);
    bounced = true;
}

function FixedUpdate () {
    
    jumpHeight = LC.levelSpeed;
    upwardForce = LC.levelSpeed;

	var rb = GetComponent(Rigidbody2D);

	var rayStartTop = transform.position;
	rayStartTop.y += 2.6;
	var hitSomethingTop:RaycastHit2D = Physics2D.Raycast(rayStartTop, Vector2.up, 0.1);
	Debug.DrawRay(rayStartTop, Vector2.up * 1, Color.red, 1);

    var rayStart = transform.position;
    rayStart.y -= 2.6;
    Debug.DrawRay(rayStart, -Vector2.up * 0.1, Color.green, 1 );

    var hitSomething1:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);
    rayStart.x -= 1;
    var hitSomething2:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);
    rayStart.x += 2;
    var hitSomething3:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);

	if (mode == "jumping") {
		acceleration = 0.2;
        
        if ( Input.GetKey(KeyCode.LeftArrow) ) {
        	transform.localRotation = Quaternion.Euler(0, -180, 0);
            rb.velocity.x -= acceleration;
            if (grounded) {
                anim.SetBool("Walk", true);
            }
        } else if ( Input.GetKey(KeyCode.RightArrow) ) {
        	transform.localRotation = Quaternion.Euler(0, 0, 0);
            rb.velocity.x += acceleration;
            if (grounded) {
                anim.SetBool("Walk", true);
            }
        } else if (Input.GetKeyUp(KeyCode.RightArrow)) {
            anim.SetBool("Walk", false);
            rb.velocity.x = 0;
        } else if (Input.GetKeyUp(KeyCode.LeftArrow)) {
            anim.SetBool("Walk", false);
            rb.velocity.x = 0;
        }

		if ( (hitSomething1.collider && hitSomething1.collider.tag == "Ground" && hitSomething1.distance < 0.1) || 
           (hitSomething2.collider && hitSomething2.collider.tag == "Ground" && hitSomething2.distance < 0.1) || 
           (hitSomething3.collider && hitSomething3.collider.tag == "Ground" && hitSomething3.distance < 0.1)) {
            
            anim.SetBool("Jump", false);
            grounded = true;

			if ( !jumpUsed && Input.GetKey(KeyCode.UpArrow) ) {
                
				jumpUsed = true;
				rb.velocity.y = jumpHeight;
                grounded = false;
                anim.SetBool("Jump", true);
                
                // get JumpSpeed from LevelController
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

        if ( (hitSomething1.collider && hitSomething1.collider.tag == "SpacesuitTrigger" && hitSomething1.distance < 0.1) ||
            (hitSomething2.collider && hitSomething2.collider.tag == "SpacesuitTrigger" && hitSomething2.distance < 0.1) ||
            (hitSomething3.collider && hitSomething3.collider.tag == "SpacesuitTrigger" && hitSomething3.distance < 0.1)) {

            Debug.Log("Spacesuit Triggered");
            anim.SetLayerWeight(1,1);
            anim.transform.localScale = new Vector3 (2.3,2.3,1);
            anim.transform.localPosition = new Vector3 (0,-0.18,0);
            Destroy(GameObject.Find("Spacesuit"), 0.2);
        }   


	} else if ( mode == "flying" ) {

		acceleration = 1;
        
        if ( Input.GetKey(KeyCode.LeftArrow) ) {
            rb.velocity.x -= acceleration;
            transform.localRotation = Quaternion.Euler(0, 0, 20);
        } else if ( Input.GetKey(KeyCode.RightArrow) ) {
            rb.velocity.x += acceleration;
            transform.localRotation = Quaternion.Euler(0, 0, -20);
        } else if ( Input.GetKeyUp(KeyCode.LeftArrow) ) {
        	rb.velocity.x = 0;
        	transform.localRotation = Quaternion.Euler(0, 0, 0);
        } else if ( Input.GetKeyUp(KeyCode.RightArrow) ) {
        	rb.velocity.x = 0;
        	transform.localRotation = Quaternion.Euler(0, 0, 0);
        }
        
        if (bounced == true) {
            rb.velocity.y = upwardForce;
        }
        
        if ( (hitSomethingTop.collider && hitSomethingTop.collider.tag == "Ground" && hitSomethingTop.distance < 0.1)) {
            
            rb.velocity.y = -5;
            bounced = false;
            
            useBounce();
        }
        if ( (hitSomethingTop.collider && hitSomethingTop.collider.tag == "sceneTrigger" && hitSomethingTop.distance < 0.1)) {

			freeFallTrigger();
        }
	} else if ( mode == "FreeFall" ) {
		rb.velocity.y = -10;

		acceleration = 1;

		if ( Input.GetKey(KeyCode.LeftArrow) ) {
            rb.velocity.x -= acceleration;
            transform.localRotation = Quaternion.Euler(0, 0, -20);
        } else if ( Input.GetKey(KeyCode.RightArrow) ) {
            rb.velocity.x += acceleration;
            transform.localRotation = Quaternion.Euler(0, 0, 20);
        } else if ( Input.GetKeyUp(KeyCode.LeftArrow) ) {
        	rb.velocity.x = 0;
        	transform.localRotation = Quaternion.Euler(0, 0, 0);
        } else if ( Input.GetKeyUp(KeyCode.RightArrow) ) {
        	rb.velocity.x = 0;
        	transform.localRotation = Quaternion.Euler(0, 0, 0);
        }

        if ( (hitSomething1.collider && hitSomething1.collider.tag == "ParachuteTrigger" && hitSomething1.distance < 0.1) ||
            (hitSomething2.collider && hitSomething2.collider.tag == "ParachuteTrigger" && hitSomething2.distance < 0.1) ||
            (hitSomething3.collider && hitSomething3.collider.tag == "ParachuteTrigger" && hitSomething3.distance < 0.1)) {

            anim.SetBool("parachute", true);
        }
	}

} 
