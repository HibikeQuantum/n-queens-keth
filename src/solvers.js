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

// Rook NODE is contains crd(Remember past path), children, usable column range;
let RookTree = function (crd, usableEl) {
  this.crd = crd;
  this.children = [];
  this.usableEl = usableEl;
};

RookTree.prototype.addChild = function (crd, usableEl) {
  let newNode = new RookTree(crd, usableEl);
  this.children.push(newNode);
};

RookTree.prototype.addFam = function (row, colSize) {
  let level = colSize - row;
  let usableEl = [];
  if (this.crd.length === 0) {
    for (let i = 0; i < colSize; i++) {
      usableEl.push(i);
    }
  } else {
    for (let value of this.usableEl) {
      usableEl.push(value)
    }
  }
  if (this.crd.length > 0) {
    let temp = this.crd.slice(-1);
    usableEl.splice(usableEl.indexOf(temp[0]), 1);
  }
  for (let column of usableEl) {
      this.addChild(this.crd.concat(level, column), usableEl);
  }

  if (level !== colSize - 1) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].addFam(row - 1, colSize);
    }
  }
};

RookTree.prototype.getLeaf = function () {
  let result = [];

  function getRecursion(target) {
    if (target.children.length !== 0 || target.crd.length === 0) {
      for (let i = 0; i < target.children.length; i++) {
        let temp = getRecursion(target.children[i]);
        if (temp !== undefined) {
          result.push(temp);
        }
      }
    } else {
      return target.crd;
    }
  }

  getRecursion(this);
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

  return board.rows();
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

  let rookTree = new RookTree([]);
  rookTree.addFam(n, n);

  let leafs = rookTree.getLeaf();

  for (let j = 0; j < leafs.length; j++) {
    let board = new Board({n: n});
    let solution = undefined;
    let myArr = leafs[j];

    for (let i = 0; i < myArr.length; i += 2) {
      let row = myArr[i];
      let col = myArr[i + 1];
      board.togglePiece(row, col);
    }

    if (board.hasAnyMinorDiagonalConflicts()||board.hasAnyMajorDiagonalConflicts()) {

    } else {
      solution = board.rows();
      return solution;
    }
  }
  let emptyBoard = new Board({n: n});
  return emptyBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {

  let rookTree = new RookTree([]);
  rookTree.addFam(n, n);

  let leafs = rookTree.getLeaf();
  let count = 0;
  for (let j = 0; j < leafs.length; j++) {
    let board = new Board({n: n});
    let myArr = leafs[j];

    for (let i = 0; i < myArr.length; i += 2) {
      let row = myArr[i];
      let col = myArr[i + 1];
      board.togglePiece(row, col);
    }

    if (board.hasAnyMinorDiagonalConflicts()||board.hasAnyMajorDiagonalConflicts()) {

    } else {
      count ++;
    }
  }
  if (n===0){count=1;}
  return count;
};