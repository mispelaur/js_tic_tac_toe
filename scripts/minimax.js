// functions that will be called every time the computer moves
// will return a single object ranking each open cell by its potential to lead to the computer winning
console.log("minimax linked");
// var testBoard = [{board: [ -1, null, 1, 1, null, null, 1, -1, -1 ], cell: null}], testMove=6; // should return cell 4

// var testBoard = [{board: [null,1,null,null,null,1,-1,-1,1], cell: null}], testMove=5; // should return cell 2
var testBoard = [{board: [-1,null,null,-1,1,1,null,null,null], cell: null}], testMove=4; // should return cell 2

var miniMaxCalculations = buildMiniMaxCalc(testBoard[0].board);



function buildMiniMaxCalc(board){
  var obj = board.reduce(function(cell, value, i) {
    cell[i] = value;
    return cell;
  }, {});

  for (var key in obj) {
      if (obj[key] !== null) delete obj[key];
      else obj[key] = 0;
  }
  return obj;
}



$(document).ready(function(){

  allFutureBoards(testBoard, testMove);

  for(var i=0; i < winningBoardStates.length; i++){
    winningBoardStates[i].move=returnMoveNumber(winningBoardStates[i].board);
  }
  var pruned = prune(winningBoardStates);
  // console.log(winningBoardStates);
  // for(var i=0; i<winningBoardStates.length; i++){
  //   miniMax(winningBoardStates[i]);
  // }  
  for(var i=0; i<pruned.length; i++){
    miniMax(pruned[i]);
  }  
  console.log(returnComputerMove(miniMaxCalculations, testMove));
  debugger;
});

function returnComputerMove(calculations, move){
  var moveCell;
  var ascendingCalculations = Object.keys(calculations).sort(function(a,b){return calculations[a]-calculations[b]});
  if (move%2 === 0) moveCell = ascendingCalculations[(ascendingCalculations.length - 1)];
  else return moveCell = ascendingCalculations[0];
  return moveCell;
}

// every time it's the computer's move, this function must be called for EVERY potential WINNING board state
function miniMax(board){
  // var move = returnMoveNumber(board.board); // move needed to adjust for "depth"
  var move = board.move;
  var miniMaxValue;
  for(i=0; i < this.winningCombinations.length; i++){

    var combo = this.winningCombinations[i];
    var sum = board.board[combo[0]] + board.board[combo[1]] + board.board[combo[2]];
    
    if(sum === 3) miniMaxValue = 10 - move
    else if (sum === -3) miniMaxValue = move - 10
    else miniMaxValue = 0;
    
    miniMaxCalculations[board.cell] = miniMaxCalculations[board.cell] + miniMaxValue;

  }
  return miniMaxCalculations;
}

function returnMoveNumber(arr){
  var count = 0, i = arr.length;
  while (i--) {
    if ( arr[i] === -1 || arr[i] === 1 )
      count++;
  }
  return count;
}
  var cellArray = [], moveArray = [];


// flaw in pruning this way: doesn't take into account who has won... 
function prune(winningBoardStates){
  for(var i=0; i<winningBoardStates.length; i++){
    var localCell = winningBoardStates[i].cell;
    // var localMove = winningBoardStates[i].move;
    if(cellArray.indexOf(localCell) === -1) cellArray.push(localCell);
    // if(moveArray.indexOf(localMove) === -1) moveArray.push(localMove);
  }  

  // look at each winning boardState with a particular "cell" and remove all but the one with the smallest "move"
  // cellArray = [0, 3, 4, 2];
  var pruned = winningBoardStates;
  for(var i=0; i<cellArray.length; i++){
    // collect all indices of winningBoardStates with given cell
    var haveSameCell = [];
    var id = winningBoardStates.map(function(state){return state.cell;}).indexOf(cellArray[i], 0);
    while(id !== -1){
      haveSameCell.push(winningBoardStates[id]);
      id = winningBoardStates.map(function(state){return state.cell;}).indexOf(cellArray[i], id+1);
    }

    // find value of smallest move with given cell 
    var minMove = Math.min.apply(null, haveSameCell.map(function(state){return state.move}));

    // look at all the winningBoardStates and remove those with given cell but not minMove
    var pruned = pruned.filter(function(state){
      if(state.cell === cellArray[i] && state.move > minMove) return false;
      else return true;
    });
  }
  return pruned;
}

prune(winningBoardStates);


// Game.prototype.returnComputerMove() = function(){
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