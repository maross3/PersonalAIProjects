import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';

// import * as Defensive from '../Actions/defensive'
// import * as Neutral from '../Actions/neutral'
// import * as Offensive from '../Actions/offensive'

import { BehaviorTree } from '../BehaviorTree/BehaviorTree'
import { creepAlive } from '../Behaviors/utility'
import { gather, refill } from '../Behaviors/neutral'

import { Role } from './Role'

export class TestRole extends Role {
  constructor(){
    super([WORK, CARRY, MOVE,], new BehaviorTree([creepAlive, 0, gather, refill]));
    // this.tree = new BehaviorTree([empty, 0, gather, refill], {creep:this.creep,});
  }
}
