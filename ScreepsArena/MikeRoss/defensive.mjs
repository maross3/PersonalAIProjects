import { Creep } from '/game/prototypes';
import { getObjectsByPrototype, getRange, findClosestByPath } from '/game/utils';

export function selfDefense(self){
    var enemies = getObjectsByPrototype(Creep).filter(c => !c.my)
    var closestEnemy = findClosestByPath(self, enemies);
    if(closestEnemy && getRange(closestEnemy, self) <= 10) return closestEnemy;
    return false;
}
