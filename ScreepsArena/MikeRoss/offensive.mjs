import { Creep } from '/game/prototypes';
import { ERR_NOT_IN_RANGE } from '/game/constants';

export function attack(creepSelf, creepTarget){
    if(creepSelf.attack(creepTarget) == ERR_NOT_IN_RANGE) creepSelf.moveTo(creepTarget);
}
