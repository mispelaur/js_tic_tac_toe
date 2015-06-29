// functions that will be called every time the computer moves
// will return a single object ranking each open cell by its potential to lead to the computer winning
console.log("minimax linked");
// testBoard with computer playing X (first/even)
var testBoard = [[ -1, null, 1, 1, null, null, 1, -1, -1 ]]; // returns all 5 potential win states
var testMove = 6;

var miniMaxCalculations = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0};


// $(document).ready(function(){
//   allFutureBoards(testBoard, testMove);
//   console.log(winningBoardStates);
//   for(var i=0; i<winningBoardStates.length; i++){
//     console.log(winningBoardStates[i]);
//     console.log(returnMoveNumber(winningBoardStates[i].board));
//     // miniMax(winningBoardStates[i]);
//   }  
// });

// every time it's the computer's move, this function must be called for EVERY potential WINNING board state
function miniMax(board){
  // debugger;
  var move = returnMoveNumber(board.board); // move needed to adjust for "depth"
  var miniMaxValue;
  for(i=0; i < this.winningCombinations.length; i++){

    var combo = this.winningCombinations[i];
    var sum = board.board[combo[0]] + board.board[combo[1]] + board.board[combo[2]];
    
    if(sum === 3) miniMaxValue = move-10
    else if (sum === -3) miniMaxValue = 10-move
    else miniMaxValue = 0;
      
  }
  miniMaxCalculations[board.lastMoveCell] = miniMaxValue;
  console.log(miniMaxCalculations);
}

function returnMoveNumber(arr){
  var count = 0, i = arr.length;
  while (i--) {
    if ( arr[i] === -1 || arr[i] === 1 )
      count++;
  }
  return count;
}


// Game.prototype.returnComputerMove = function(){
//   console.log("computer move time");
//   var allCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//   var cellsPlayed = Object.keys(this.board).map(Number);
//   var move = this.moveNumber + 1;
//   var openCells = allCells.filter(function(cell){
//     return cellsPlayed.indexOf( cell ) < 0;
//   });
//   var computerMove;
//   var miniMaxCalculations = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0};
//   var boardCopy = $.extend({}, this.board);
//   miniMax(this, boardCopy, openCells);

  // function miniMax(game, board, freeCells){

  //   freeCells.forEach(function(cell, index){
  //       if(move%2===0) board[cell] = -1;
  //       else board[cell] = 1;
  //       // below must be called for every potential future board until there is a winner in that branch
  //       miniMaxCalculations[cell] += game.checkWinnerForMiniMax(board, move);
  //       if(move < 10){
  //         var cellsPlayed = Object.keys(board).map(Number);
  //         var freeCells = allCells.filter(function(cell){
  //           return cellsPlayed.indexOf( cell ) < 0;
  //         });
  //         move++;
  //       }
  //   })
  // }

//     move ++;
//     return computerMove;
// }