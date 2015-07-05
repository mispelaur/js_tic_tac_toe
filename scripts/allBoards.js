// functions needed to return all potential future board states
// I only need to return every future win state
// BUT each board needs an associated move at the top of its "tree"
console.log("allBoards linked");
var AIBoard = [];
var miniMaxCalculations;
Game.prototype.returnComputerMove = function(){
  debugger;
  miniMaxCalculations = {};
  AIBoard = [{board: this.board, cell: null, move: this.moveNumber}]
  miniMaxCalculations = buildMiniMaxCalc(AIBoard[0].board);
  this.futureWinStates = this.allFutureBoards(AIBoard, AIBoard[0].move);
  for(var i=0; i<this.futureWinStates.length; i++){
    miniMax(this.futureWinStates[i]);
  }  
  debugger;
  console.log(returnComputerMove(miniMaxCalculations, AIBoard[0].move));
  this.futureBoards = [];
  this.futureWinStates = [];
}

Game.prototype.allFutureBoards = function(boards, move){
  for(var i = 0; i < boards.length; i++){
    if(gameHasWinner(boards[i].board, move)){
      this.futureWinStates.push(boards[i]);
    } else {
      this.futureBoards.push(populate(boards[i], move));
    }
  }
  move++
  if (move < 10){
    this.futureBoards.push(this.allFutureBoards(_.flatten(this.futureBoards), move));
  } 
  return this.futureWinStates;
}


var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
// var winningBoardStates = [];

// function allFutureBoards(boards, move){
//   var newBoards = [];
//   for(var i = 0; i < boards.length; i++){
//     if(gameHasWinner(boards[i].board, move)){
//       winningBoardStates.push(boards[i]);
//     } else {
//       newBoards.push(populate(boards[i], move));
//     }
//   }
//   move++
//   if (move < 10){
//     newBoards.push(allFutureBoards(_.flatten(newBoards), move));
//   } 
//   return winningBoardStates;
// }

// takes a single board and returns an array of all the possible boards after the next move
function populate(boardState, move){
  var temp = [];
  var emptySpaces = returnEmptySpaces(boardState.board);
  for(var i = 0; i < emptySpaces.length; i++){ 
    if (move === AIBoard[0].move) boardState.cell = emptySpaces[i]; 
    var copy = boardState.board.slice(0, 9);
    if (move%2 === 0) copy[emptySpaces[i]]=1;
    else copy[emptySpaces[i]]=-1;
    temp.push({board: copy, cell: boardState.cell, move: move});
  }
  return temp;
}

function returnEmptySpaces(board){
  var emptySpaces = [];
  var id = board.indexOf(null);
  while (id != -1) {
    emptySpaces.push(id);
    id = board.indexOf(null, id + 1);
  }
  return emptySpaces;
}

function gameHasWinner(board, move) {
  var gameHasWinner = false;
  for(i=0; i < winningCombinations.length; i++){
    var combo = winningCombinations[i];
    var sum = board[combo[0]] + board[combo[1]] + board[combo[2]];
    if(Math.abs(sum) === 3 ) gameHasWinner = true;
  }
  return gameHasWinner;
}