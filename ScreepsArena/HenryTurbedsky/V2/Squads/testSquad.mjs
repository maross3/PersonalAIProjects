import {TestRole} from '../Roles/testRole'
import { Squad } from './Squad'


export class TestSquad extends Squad {

  constructor(){
    super([ new TestRole(), new TestRole(), new TestRole(),]);
  }

}
