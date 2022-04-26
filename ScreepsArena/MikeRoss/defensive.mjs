import { Creep } from '/game/prototypes';
import { getObjectsByPrototype, getRange, findClosestByPath } from '/game/utils';

// refreshrate = x
// if range < threshold1, x = 10. if getTicks % x == 0, selfDefense(this.creep)
// update global enemy array, called on squad center
export function selfDefense(self){
    var enemies = getObjectsByPrototype(Creep).filter(c => !c.my)
    var closestEnemy = findClosestByPath(self, enemies);
    if(closestEnemy && getRange(closestEnemy, self) <= 10) return closestEnemy;
    return false;
}
