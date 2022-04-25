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

var creep4 = Object.create(workerCreep);
var creep5 = Object.create(workerCreep);
var creep6 = Object.create(workerCreep);

var squadOne = Object.create(baseSquad);
var squadTwo = Object.create(baseSquad);

squadOne.queuedUnits = [creep1, creep2, creep3];
squadOne.units = [];

squadTwo.queuedUnits = [creep4, creep5, creep6];
squadTwo.units = [];

export function loop() {

  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];

  // baseSquad logic to be moved
  if(squadOne.numberOfUnits < 3) spawnSquad(squadOne, spawner);
  else if (squadTwo.numberOfUnits < 3) spawnSquad(squadTwo, spawner);

  if(squadOne.numberOfUnits > 0) squadOne.act();
  if(squadTwo.numberOfUnits > 0) squadTwo.act();

  console.log(getCpuTime()); //debug
}
