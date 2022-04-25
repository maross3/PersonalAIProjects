import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import { harvestFromSource, spawnSquad } from './tasks'
import { workerCreep, baseSquad } from './barracks'



var spawner;




var creep1 = Object.create(workerCreep);
var creep2 = Object.create(workerCreep);
var creep3 = Object.create(workerCreep);

baseSquad.queuedUnits = [creep1, creep2, creep3];

function attackRole(){

}


export function loop() {

  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];

  if(baseSquad.numberOfUnits < 3) {
    spawnSquad(baseSquad, spawner);
    }

  //
  console.log(baseSquad.numberOfUnits);
  if(baseSquad.numberOfUnits > 0) baseSquad.act();


  console.log(getCpuTime());
  // DoWork() {

  // }
}
