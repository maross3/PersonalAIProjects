export class binaryBrain {

  // TODO:
  // execute tree in test cases to find optimal traversal routes
  // further abstract the definition of nodes and their traversal order
  // fn to make decision between left or right based off the parent node
  // above fn should take in conditions to check.
      // if true, left. false, right. null, restart traversal

  // current state: pass in array of behaviors, tree generates them as Nodes
  // pass squads into tree to make units act based on current node
  static root;
  static levels;
  static depth;
  static treeMap;
  static currentNode;

  constructor(behaviors){

    var curNode = new binaryNode(behaviors[0], behaviors[0]); // to root gen fn
    this.createRecursiveTree(behaviors, curNode , 0);
    console.log(this.populateParentTraversalMap(behaviors));
    //this.orderedArray = this.getRecursivePostOrder(this.root);
    //this.currentNode = this.orderedArray[0];
    // visualize different sorts:
    // console.log(this.getRecursiveLevelOrder());
    // this.depth = this.levels.length;
    //
    // console.log("preorder: " + this.getRecursivePreOrder(this.root));
    console.log("post order: " + this.getRecursivePostOrder(this.root));
    //console.log(orderedArray);
    // console.log("in order: " + this.getRecursiveInOrder(this.root));

  }

  createRecursiveTree(arr, node, i){ // build tree
      let temp = new binaryNode(arr[i],i);
      node = temp;

      if(!this.root) this.root = node;
      if (i < arr.length) {
        if(2 * i + 1 < arr.length)
          node.left = this.createRecursiveTree(arr, node.left, 2 * i + 1);

        if(2 * i + 2 < arr.length)
          node.right = this.createRecursiveTree(arr, node.right, 2 * i + 2);
      }
      return node;
  }

  populateParentTraversalMap(arr){
    var parentMap = new Map();
    for(let i = 0; i < (arr.length / 3) + 2; i++){
      if(!parentMap.has(arr[i])){
        parentMap[arr[i]] ={
          left: arr[2 * i + 1],
          right: arr[2 * i + 2]
        };
      }
    }
    return parentMap;
  }

// ========================================
//    *****Execution of Nodes*****
// ========================================
  execute(squad){ // Don't get lost, take a map with you :)
    squad.forEach((unit, i) => { unit.act = this.treeMap[this.currentNode] });
  }

// ========================================
//    *****iterative traversal*****
// ========================================
  getPreOrder(root){ // PRE order

    if(!root) return [];
    if(!root.left && !root.right) return [root.val];

    var stack = [root];
    var result = [];

    while(typeof root !== 'undefined'){
        root = stack.pop();

        if(root)
        {
            result.push(root);

            if(root.right) stack.push(root.right);
            if(root.left) stack.push(root.left);
        }
    }

    return result;
  }

  getInOrder(root){ // IN order
    var stack = [];
    var result = [];

    var curNode = root;
    while(curNode || stack.length > 0){
      while(curNode){
        stack.push(curNode);
        curNode = curNode.left;
    }
      curNode = stack.pop();
      result.push(curNode.val);
      curNode = curNode.right;
    }
    return result;
  }

  getPostOrder(root){  // POST order
    if(!root) return [];

    var stack = [root];
    var result = [];

    while(stack.length > 0){
        root = stack.pop();
        result.unshift(root.val);

        if(root.left) stack.push(root.left);
        if(root.right) stack.push(root.right);
    }
    return result;
  }

  getOrderedLevels(root){ // LEVEL order
    var result = [];
    var stack = [root];

    while(stack.length > 0){
      var level = [];
      var subArr = [];

      for(let node of stack){
        if(node){
          subArr.push(node.val);
          level.push(node.left, node.right);
        }
      }

      if(subArr.length > 0) result.push(subArr);
      stack = level;
    }
    return result;
  }

  // ========================================
  //     *****recursive traversal*****
  // ========================================
  getRecursivePreOrder(root){ // PRE order
    var stack = [];
    this.recursivePreOrderHelper(root, stack);
    return stack;
  }

  recursivePreOrderHelper(root, stck){ // PRE order helper
    if(!root) return;
    stck.push(root.val);
    this.recursivePreOrderHelper(root.left, stck);
    this.recursivePreOrderHelper(root.right, stck);
  }

  getRecursiveInOrder(root){ // IN order
    var stack = [];
    this.recursiveInOrderHelper(root, stack);
    return stack;
  }

  recursiveInOrderHelper(root, stck){ // IN order helper
    if(!root) return;
    this.recursiveInOrderHelper(root.left, stck);
    stck.push(root.val);
    this.recursiveInOrderHelper(root.right, stck);
  }

  getRecursivePostOrder(root){ //POST order
    var stack = [];
    this.recursivePostOrderHelper(root, stack);
    return stack;
  }

  recursivePostOrderHelper(root, stck) { //POST order helper
    if(!root) return;
    this.recursivePostOrderHelper(root.left, stck);
    this.recursivePostOrderHelper(root.right, stck);
    stck.push(root.val);
  }


  getRecursiveLevelOrder(){ // LEVEL order
      this.levels = [];
      if(!this.root) return this.levels;
      this.recursiveLevelOrderHelper(this.root, 0);
      return this.levels;
  }

  recursiveLevelOrderHelper(node, level){ // LEVEL order helper
    if(this.levels.length == level)
      this.levels.push([]);

    this.levels[level].push(node);
    level++;

    if(node.left)
      this.recursiveLevelOrderHelper(node.left, level);

    if(node.right)
      this.recursiveLevelOrderHelper(node.right, level);
  }
}

// TODO: refactor
class binaryNode {

  static behavior;
  static val;

  static left;
  static right;
  static status; // val? if not indexing. Do we need an index?

  constructor(val, behavior){
      this.behavior = behavior;
      this.val = val;
  }
}
