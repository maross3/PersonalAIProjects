import { } from '/game/constants';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { getObjectsByPrototype, getCpuTime } from '/game/utils';

import {QUEUED, ALIVE } from './global'
import { minerCreep, baseSquad, generalistWorkerCreep, rampartWorkerCreep } from './barracks'
import {visualizeSquad } from './debugHelper'
import { harvestFromSource, spawnSquad } from './neutral'

var spawner;





var squadOne = Object.create(baseSquad);

var creep1 = Object.create(rampartWorkerCreep);
creep1.squad = squadOne;

var creep2 = Object.create(rampartWorkerCreep);
creep2.squad = squadOne;
//var squadTwo = Object.create(baseSquad);

squadOne.queuedUnits = [creep1, creep2];
squadOne.units = [];

//var squadTwo = Object.create(baseSquad);

//squadTwo.queuedUnits = [creep3, creep4, creep5];
//squadTwo.units = [];

// assign spawner to squads

export function loop() {

  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];

  // baseSquad logic to be moved
  if(squadOne.numberOfUnits < squadOne.queuedUnits.length) spawnSquad(squadOne, spawner);
  //else if (squadTwo.numberOfUnits < squadTwo.queuedUnits.length) spawnSquad(squadTwo, spawner);

  if(squadOne.numberOfUnits > 0) squadOne.act();
  //if(squadTwo.numberOfUnits > 0) squadTwo.act();

  console.log(getCpuTime()); //debug
}
