import { getCpuTime } from '/game/utils';
import { timeStart, timeSplit, timeReset } from '../debug'

class Node {
  static behavior;
  static nodes;
  static board;

  constructor(behavior, board){
      this.behavior = behavior;
      this.nodes = [];
      this.board = board;
  }

  run(){
    timeReset("Node: started " + this.behavior.name);
    // Possible values: "continue", "bookMark", "done",
    var response = this.behavior();
    timeReset("\nNode: finished " + this.behavior.name);
    if( response == "done") return "done";
    if( response == "bookMark" ) this.board.bookMark(this);
    for (var i = 0; i < this.nodes.length; i++) this.nodes[i].run();
    return "done";
  }

  display(layer){
    var str = "["+layer+"](" + this.behavior.name + ")";
    layer++;
    if(this.nodes.length > 0) {str += "=>{";}else{return str;}
    for (var i = 0; i < this.nodes.length; i++){
      str += this.nodes[i].display(layer);
      if(i != this.nodes.length - 1) str += " ";
    }
    return str + "}";
  }
}


export class BehaviorTree {
  static root;
  static bookMarkNode;

  static nodeArray;
  static board;

  constructor(behaviorArray){
    this.board = {};
    this.board.bookMark = this.bookMark.bind(this);

    this.nodeArray = [];
    for (var i = 0; i < behaviorArray.length; i++) {
      if(behaviorArray[i] != 0){
        this.nodeArray.push(new Node(behaviorArray[i], this.board))
      }else{
        this.nodeArray.push(0);
      }
    }

    var parentIndex = 0;
    this.root = this.nodeArray[parentIndex];
    this.bookMarkNode = this.root;

    for (var i = 2; i < this.nodeArray.length; i++) {
      if(this.nodeArray[i] != 0){
        this.nodeArray[parentIndex].nodes.push(this.nodeArray[i]);
      }else{
        while (this.nodeArray[++parentIndex] == 0){}
      }
    }
  }
  bookMark(node){
    this.bookMarkNode = node;
  }

  run(){
    timeReset("\nBehaviorTree: start run();");
    var tempNode = this.bookMarkNode;
    this.bookMarkNode = this.root;
    tempNode.run();
    timeReset("\nBehaviorTree: Done with tempNode.run();");
  }

  display(){
    console.log(this.root.display(0));
  }


}
