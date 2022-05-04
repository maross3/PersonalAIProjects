import {TestRole} from '../Roles/testRole'
import { Squad } from './Squad'


export class TestSquad extends Squad {

  constructor(){
    super([ new TestRole(), new TestRole(), new TestRole(),]);
  }

  act(){
    if(this.currentRoles.length > 0){
      this.currentRoles.forEach((roles, i)=>{
        roles.act();
      });

      if(this.debug){
        this.squadDebugLines();
        this.debugSquad();
      }
    }
  }


}
