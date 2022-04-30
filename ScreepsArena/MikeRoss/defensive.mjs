import { Creep } from '/game/prototypes';
import { getObjectsByPrototype, getRange, findClosestByPath } from '/game/utils';
import {TOP, BOTTOM} from '/game/constants'
import {RUNNING, FAILURE, SUCCESS} from './global';
// refreshrate = x
// if range < threshold1, x = 10. if getTicks % x == 0, selfDefense(this.creep)
// update global enemy array, called on squad center
export function selfDefense(self){
    var enemies = getObjectsByPrototype(Creep).filter(c => !c.my)
    var closestEnemy = findClosestByPath(self, enemies);
    if(closestEnemy && getRange(closestEnemy, self) <= 10) return closestEnemy;
    return false;
}

// only current exit is billboard
export function patrolBase(unit){
  if(!this.patrolTime) this.patrolTime = 0;

  if(this.patrolTime < 5) this.creep.move(TOP);
  else if(this.patrolTime < 11)this.creep.move(BOTTOM);
  else this.patrolTime = 0;

  return RUNNING;
}
