	
var rotationSpeed : int = 10;

function Start () {

}
	
	// Update is called once per frame
function Update (){
	transform.Rotate(Vector3(0,rotationSpeed * 10,0) * Time.deltaTime);
}