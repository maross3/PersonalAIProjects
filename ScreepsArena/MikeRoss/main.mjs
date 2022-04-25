import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import { harvestFromSource, spawnSquad } from './neutral'
import { workerCreep, baseSquad } from './barracks'
import {QUEUED, ALIVE } from './global'
import {visualizeSquad } from './debugHelper'

var spawner;

var creep1 = Object.create(workerCreep);
var creep2 = Object.create(workerCreep);
var creep3 = Object.create(workerCreep);

baseSquad.queuedUnits = [creep1, creep2, creep3];

export function loop() {

  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];

  // baseSquad logic to be moved
  if(baseSquad.numberOfUnits < 3) spawnSquad(baseSquad, spawner);
  if(baseSquad.numberOfUnits > 2) visualizeSquad(baseSquad.units);
  if(baseSquad.numberOfUnits > 0) baseSquad.act();

  console.log(getCpuTime()); //debug
}
