// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE


/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4].
 */
function _makeGrid() {
  const outerArr = []
  for (let i = 0; i < 8; i++) {
    outerArr.push(new Array(8))
  }

  outerArr[3][3] = new Piece("white")
  outerArr[4][4] = new Piece("white")
  outerArr[3][4] = new Piece("black")
  outerArr[4][3] = new Piece("black")


  return outerArr
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}
Board.prototype.print = function () {
  
  for(let i = 0; i < 8 ; i++) {
    let arr = [];
    for(let j = 0; j < 8; j++) {
      if(!this.grid[i][j]){
          arr.push(' ');
      }else {
        arr.push(this.grid[i][j].toString());
      }
    }
    console.log(arr);
  }

};

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  [x, y] = pos
  if (x >= 0 && x <= 7 && y >= 0 && y <= 7) return true
  return false
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  [x, y] = pos
  if (this.isValidPos(pos)) {
    return this.grid[x][y];
  } else {
    throw new Error('Not valid pos!');
    return false;
  }
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.isOccupied(pos)) {
    const piece = this.getPiece(pos)
    return piece.color === color
  } else {
    return false
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  const piece = this.getPiece(pos)
  return typeof(piece) === "object"
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding
 * another piece of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */

//[-1, -1], "white", [1, 0]

Board.prototype._positionsToFlip = function (pos, color, dir, piecesToFlip = []) {
  [x, y] = pos;
  [dx, dy] = dir;
  let newPos = [x + dx, y + dy];

  if(this.isValidPos(pos) && this.isValidPos(newPos)){ 
   
    if(!this.getPiece(newPos)){
      return [];
    }else if (this.getPiece(newPos).color !== color){
      piecesToFlip.push(newPos);
      return this._positionsToFlip(newPos, color, dir, piecesToFlip );
    }
    else{
      return piecesToFlip;
    }
  } else {
    return [];
  }
  return piecesToFlip;
}

// let testBoard = new Board();
// console.log(testBoard._positionsToFlip([4, 5], "white", [0, -1]));


/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  let dirs = [[1,0],[1,1],[-1,0],[-1,1],[-1,-1],[0,1],[0,-1],[1,-1]];

  for( let i = 0; i < 8; i++){
    
    if(this.isValidPos(pos) && !this.isOccupied(pos) && this._positionsToFlip(pos, color, dirs[i]).length > 0){
      return true;
    }
  }
  return false;
};


/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if(!this.validMove(pos, color)) throw new Error("Invalid move!");

  let arr = [];
  let dirs = [[1,0],[1,1],[-1,0],[-1,1],[-1,-1],[0,1],[0,-1],[1,-1]];

  for( let i = 0; i < 8; i++){
    if(this.isValidPos(pos) && !this.isOccupied(pos)){
      arr = arr.concat(this._positionsToFlip(pos, color, dirs[i]));
    }
  }

  for (let i = 0; i < arr.length; i++){
    [a,b] = arr[i];
    this.grid[a][b].flip();
  }

  [x,y] = pos;
  this.grid[x][y] = new Piece(color);
}

// let testBoard = new Board();

// //testBoard.print();
// testBoard.placePiece([2, 3], "black");
// console.log(testBoard.grid[3][3].color);
// testBoard.print();

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let arr = [];
  let dirs = [[1,0],[1,1],[-1,0],[-1,1],[-1,-1],[0,1],[0,-1],[1,-1]];

  for(let i = 0; i < 8 ; i++) {
    for(let j = 0; j < 8; j++) {
      for( let k = 0; k < 8; k++){
        if(this.isValidPos([i,j]) && !this.isOccupied([i,j]) && (this._positionsToFlip([i,j], color, dirs[k])).length > 0){
          arr.push([i,j]);
        }
      }
    }
  }

  return arr;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return (!this.hasMove("white") && !this.hasMove("black"));
};

/**
 * Prints a string representation of the Board to the console.
 */


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE
