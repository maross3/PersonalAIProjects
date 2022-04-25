import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import { harvestFromSource } from './tasks'
var QUEUED = 0;
var ALIVE = 1;

var spawner;


var workerCreep = {
  creep: "none",
  body: [WORK, CARRY, MOVE],
  ratio: [0.5,0.25,0.25],
  squad: baseSquad,
  status: QUEUED,
  act: workerRole
};

var creep1 = Object.create(workerCreep);
var creep2 = Object.create(workerCreep);
var creep3 = Object.create(workerCreep);

function workerRole()
{
  var spawner = getObjectsByPrototype(StructureSpawn)[0];
  
  if(!this.target != spawner]) this.target = spawner;
  if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];
  if(!this.creep.store) return;


  if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) harvestFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
  else if(this.creep.transfer(this.target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
};

function defaultSquadRole() {
  this.units.forEach((unit, i) => {
    unit.act();
  });
}

var baseSquad = {
  units: [],
  queuedUnits: [creep1, creep2, creep3],
  numberOfUnits: 0,
  act: defaultSquadRole
};



export function loop() {
  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];

  spawner.spawnCreep(workerCreep.body);

  if(baseSquad.numberOfUnits < 3) {
    var creepToSpawn = baseSquad.queuedUnits[baseSquad.numberOfUnits];
    var spawnedCreep = spawner.spawnCreep(creepToSpawn.body).object;

    if(spawnedCreep){
      creepToSpawn.creep = spawnedCreep;
      creepToSpawn.status = ALIVE;
      baseSquad.units[baseSquad.numberOfUnits] = baseSquad.queuedUnits[baseSquad.numberOfUnits];
      baseSquad.numberOfUnits += 1;
    }
  }

  if(baseSquad.numberOfUnits > 0) baseSquad.act();


  console.log(getCpuTime());
  // DoWork() {

  // }
}
