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

  var RookTree = function (value, usable) {
    this.crd = value;
    this.children = [];
    this.usable = usable;
  };

  RookTree.prototype.addChild = function (child, n) {
    let newNode = new RookTree(child, n);
    this.children.push(newNode);
  };
  // 0 0
  RookTree.prototype.addFam = function (row, n) {
    let level = n - row;
    let usable = [];
    // for (let i = 0; i < n; i++) {
    //   usable.push(i);
    // }
    // var temp = this.crd[-1];
    // usable = usable.splice(usable.indexOf(temp), 1);
    
    for (let i = 0; i < n; i++) {
      // if (i === n - 1) {
      //   this.addChild(this.crd.concat(level, i), usable);
      // } else {
        this.addChild(this.crd.concat(level, i), usable);
      // }
    }
    
    if (level !== n - 1) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].addFam(row - 1, n);
      }
    }
  }

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

  let rookTree = new RookTree([]);
  rookTree.addFam(3, 3);
  let final = rookTree.getLeaf();
  console.log("끝");


// Rook solution 만들기
// let row = [];
// for (let i = 0; i < n; i++) {
//   if (rookTree.contains()) {
//     row.push(0);
//   } else {
//     row.push(1)
//   }
//   solution.push(row);
//   row = [];
// }
// for (let i = 0; i <) {
//
//   RookTree.contains[0,]
//
//   let used = [];

// TODO 리프단에는 dead alive 표시, 안되면 옆 컬럼으로 find를 돌리는 로직 => 아니 그냥 모두 리프단을 만나면 그걸 리턴하고 looks 검증
// TODO 계승값 프로퍼티로 경로표시 push 말고 ,set 이용해서 보드 모델 활용
// TODO findLeaf => 짝홀 로직을 통과한 로직의 리프의 crd 값을 배열구조에 담는다. => 결과물 배열 길이는 곧 count 가 되고 result[0]

  var board = new Board({n: 3})
  board.set(1, [0, 0, 0, 1], 0);
  board.get(0);
  console.log(board);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
}
;

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