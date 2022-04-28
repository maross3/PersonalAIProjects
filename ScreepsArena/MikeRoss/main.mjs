import { } from '/game/constants';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { getObjectsByPrototype, getCpuTime } from '/game/utils';

import {QUEUED, ALIVE } from './global';
import { minerCreep, baseSquad, generalistWorkerCreep, rampartWorkerCreep } from './barracks';
import {visualizeSquad } from './debugHelper';
import { harvestFromSource, spawnSquad } from './neutral';


import { binaryBrain } from './screepBrain';
var spawner;

var squadOne = Object.create(baseSquad);

var creep1 = Object.create(rampartWorkerCreep);
creep1.squad = squadOne;

var creep2 = Object.create(rampartWorkerCreep);
creep2.squad = squadOne;

squadOne.queuedUnits = [creep1, creep2];
squadOne.units = [];

var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var brain;
var brainLevels;

export function loop() {
  if(!brain) brain = new binaryBrain(testArray);
  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];

  // baseSquad logic to be moved
  if(squadOne.numberOfUnits < squadOne.queuedUnits.length) spawnSquad(squadOne, spawner);
  //else if (squadTwo.numberOfUnits < squadTwo.queuedUnits.length) spawnSquad(squadTwo, spawner);
  if(squadOne.numberOfUnits > 0) squadOne.act();
  //if(squadTwo.numberOfUnits > 0) squadTwo.act();
  // if(brain) console.log(brain.levels);
  console.log(getCpuTime()); //debug
}
