import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';

import { _BaseCommander } from './_Dev/_mike/BaseCommander'

var spawner;
var creepMap = new Map();
var xOffset = 2;
var yOffset = 2;
var commander;

export function loop() {
  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];

  console.log(getCpuTime());
  // DoWork() {
  //   if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  //   if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];
  //   if(!this.creep.store) return;
  //
  //   if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) HarvestFromSource(this.creep, this.energySource);
  //   else if(this.creep.transfer(this.spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
  // }
}
