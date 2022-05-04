import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';

import * as Defensive from '../Actions/defensive'
import * as Neutral from '../Actions/neutral'
import * as Offensive from '../Actions/offensive'


import { Role } from './Role'

export class TestRole extends Role {

  constructor(){
    super([WORK, CARRY, MOVE,]);
    this.act = Neutral.mineAndFill;
    this.ideal = Neutral.mineAndFill;
    this.retreat = Neutral.mineAndFill;
    this.move = Neutral.mineAndFill;
  }


}
