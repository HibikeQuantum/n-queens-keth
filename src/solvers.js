/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var RookTree = function (value, usable) {
  this.crd = value;
  this.children = [];
  this.usable = usable;
};

RookTree.prototype.addChild = function (child, n) {
  let newNode = new RookTree(child, n);
  this.children.push(newNode);
};
// 3 3
RookTree.prototype.addFam = function (row, n) {
  let level = n - row;
  let usable = [];
  if (this.crd.length === 0) {
    for (let i = 0; i < n; i++) {
      usable.push(i);
    }
  } else {
    for (let value of this.usable) {
      usable.push(value)
    }
  }
  if (this.crd.length > 0) {
    var temp = this.crd.slice(-1);
    usable.splice(usable.indexOf(temp[0]), 1);

  }
  for (let value of usable) {
    if (value === n - 1) {
      this.addChild(this.crd.concat(level, value), usable);
    } else {
      this.addChild(this.crd.concat(level, value), usable);
    }
  }

  if (level !== n - 1) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].addFam(row - 1, n);
    }
  }
};

RookTree.prototype.getLeaf = function () {
  let result = [];

  function inGetLeaf(target) {
    if (target.children.length !== 0 || target.crd.length === 0) {
      for (let i = 0; i < target.children.length; i++) {
        let temp = inGetLeaf(target.children[i])
        if (temp !== undefined) {
          result.push(temp);
        }
      }
    } else {
      return target.crd;
    }
  }

  inGetLeaf(this);
  return result;
};

window.findNRooksSolution = function (n) {

  let rookTree = new RookTree([]);
  rookTree.addFam(n, n);

  let leafs = rookTree.getLeaf();
  let board = new Board({n: n});

  let myArr = leafs[0];
  for (let i = 0; i < myArr.length; i += 2) {
    let row = myArr[i];
    let col = myArr[i + 1];
    board.togglePiece(row, col)
  }

  let solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  let rookTree = new RookTree([]);
  rookTree.addFam(n, n);

  let leafs = rookTree.getLeaf();
  let solutionCount = leafs.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; // fixme
  

  // TODO 대각선 / \ 도 잡는 newAddFam구현
  // TODO leafs 를 돌리면서 맥스값을 반환;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; // fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};