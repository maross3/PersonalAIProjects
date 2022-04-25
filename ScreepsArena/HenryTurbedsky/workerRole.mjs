



var workerRole = {
  creep: "none",
  body: [WORK, CARRY, MOVE],
  ratio: [0.5,0.25,0.25],
  squad: baseSquad,
  status: QUEUED,
  act: workerRole
};


function workerRole()
{
  var spawner = getObjectsByPrototype(StructureSpawn)[0];

  if(!this.target != spawner]) this.target = spawner;
  if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];
  if(!this.creep.store) return;


  if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) harvestFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
  else if(this.creep.transfer(this.target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
};
