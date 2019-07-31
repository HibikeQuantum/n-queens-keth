// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {
  /* eslint-disable */
  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:')
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;')
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;')
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')))
      } else {
        this.set('n', params.length)
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex)
      }, this)
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex]
      this.trigger('change')
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts()
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
          this.hasRowConflictAt(rowIndex) ||
          this.hasColConflictAt(colIndex) ||
          this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
          this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      )
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts()
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
          rowIndex >= 0 && rowIndex < this.get('n') &&
          colIndex >= 0 && colIndex < this.get('n')
      )
    },
    /* eslint-enable */

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /* =========================================================================
    =                 TODO: fill in these Helper Functions                    =
    ========================================================================= */

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      //row col rooks majorDiagonal minorDiagonal queens
      var temp = this.get(rowIndex);
      let count = 0;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] !== 0) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var temp = [];
      var count = 0;
      for (let i = 0; i < this.attributes.n; i++) {
        temp.push(this.get(i)[colIndex]);
      }
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] !== 0) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (col) {
      let temp = [];
      let count = 0;
      if (Math.abs(col) >= this.attributes.n - 1) {
        return false;
      } else if (col >= 0) {
        for (let i = 0; i < this.attributes.n - col; i++) {
          // console.log('1col:', col)
          // console.log('1col + i:', col + i)
          temp.push(this.get(i)[col + i]);
        }
        // console.log('col :', col)
        // console.log('col >=0 :', temp)
      } else if (col < 0) {
        for (let i = 0; i < this.attributes.n + col; i++) {
          // console.log('2col:', col)
          // console.log('2col - i:', -col - i)
          temp.push(this.get(- col + i)[i]);
        }
        // console.log('col :', col)
        // console.log('col < 0 :', temp)
      }
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] !== 0) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      for (let i = - (this.attributes.n - 1); i < this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      return false; // fixme
    }

    /* --------------------  End of Helper Functions  --------------------- */

  });
  /* eslint-disable */
  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0
      })
    })
  }
  /* eslint-enable */
}());
