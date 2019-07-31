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

window.findNRooksSolution = function (n) {
  var solution = [];

  var RookTree = function(value) {
    this.crd = value;
    this.children = [];
  };

  RookTree.prototype.addChild = function(child) {
    let newNode = new RookTree(child);
    this.children.push(newNode);
  };

  RookTree.prototype.addFam = function(row, n) {
    let level = n - row;
    for (let i = 0; i < n; i++) {
      this.addChild([level, i]);
    }
    if (level !== n - 1) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].addFam(row - 1, n);
      }
    }
  }

  RookTree.prototype.contains = function(target) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].value === target) {
        return true
      } else {
        if (this.children[i].contains(target)) {
          return true
        }
      }
    }
    return false;
  };

  // RookTree 생성
  let rookTree = new RookTree(null);
  rookTree.addFam(n, n);

  // Rook solution 만들기
  let row = [];
  for (let i = 0; i < n; i++) {
    if (rookTree.contains()) {
      row.push();
    }
    solution.push(row);
    row = [];
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; // fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; // fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; // fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};