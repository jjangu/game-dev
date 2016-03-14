#pragma strict


public var player : GameObject;
 
function Update () {
 
    this.gameObject.transform.position.y = player.transform.position.y;
}
