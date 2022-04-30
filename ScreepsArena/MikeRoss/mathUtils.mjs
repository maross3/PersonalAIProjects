import { TOP, LEFT, RIGHT, BOTTOM, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT } from '/game/constants';
export function calculateAngle(obj1, obj2){
  if(!obj1 || !obj2) return;
  var x = (obj2.x - obj1.x);
  var y = (obj2.y - obj1.y);
  return Math.floor(Math.atan2(y, x) * (180 / 3.14));
}

export function calculateDistance(obj1, obj2){
  if(!obj1 || !obj2) return;
  var x = (obj1.x - obj2.x);
  var y = (obj1.y - obj2.y);
  x = x * x;
  y = y * y;
  return Math.sqrt(x + y);
}

// could be better, creates the desired healer lag, does not acct for terrain
export function shortDistanceDirection(angle){

  if(angle < 0) angle += 360;


  if(angle == 90) return BOTTOM;
  if(angle == 180) return LEFT;
  if(angle == 0) return RIGHT;
  if(angle == 270) return TOP;

  if(angle < 90) return BOTTOM_RIGHT;
  if(angle > 90 && angle < 180) return BOTTOM_LEFT;
  if(angle > 180 && angle < 270) return TOP_LEFT;
  if(angle > 270) return TOP_RIGHT;
}
