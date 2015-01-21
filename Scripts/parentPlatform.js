#pragma strict

function OnTriggerEnter(other: Collider){
  if (other.tag == "Player"){
    other.transform.parent = transform.parent;
  }
}
 
function OnTriggerExit(other: Collider){
  if (other.tag == "Player"){
    other.transform.parent = null; 
  }
}