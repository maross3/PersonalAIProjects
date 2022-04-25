import { Visual } from '/game/visual';
import { findCenterOfUnits } from './barracks';

export function visualizeSquad(units){
  var center = findCenterOfUnits(units);
  units.forEach((role, i) =>{ new Visual().line(role.creep, center, {color: '#ff0000'}); });
}
