
// return valid nodes from root of tree
function getPreOrder(root){

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

function getPostOrder(root){
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

var node = {
  left: 0,
  right: 0,
  status: FAILURE,
  behavior: 0
}
