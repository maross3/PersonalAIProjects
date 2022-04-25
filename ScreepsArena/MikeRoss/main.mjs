import { } from '/game/constants';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { getObjectsByPrototype, getCpuTime } from '/game/utils';

import {QUEUED, ALIVE } from './global'
import { workerCreep, baseSquad, generalistWorkerCreep } from './barracks'
import {visualizeSquad } from './debugHelper'
import { harvestFromSource, spawnSquad } from './neutral'

var spawner;

var creep1 = Object.create(workerCreep);
var creep2 = Object.create(workerCreep);
var creep3 = Object.create(workerCreep);

var creep4 = Object.create(generalistWorkerCreep);
var creep5 = Object.create(generalistWorkerCreep);
var creep6 = Object.create(generalistWorkerCreep);

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
