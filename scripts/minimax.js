// functions that will be called every time the computer moves
// will return the optimal cell for the computer move
console.log("minimax linked");

// var testBoard = [{board: [ -1, 1, null, null, 1, null, null, null, null ], cell: null}], testMove=3; // should return cell 7, but returns cell 6

// var testBoard = [{board: [null,1,null,null,null,1,-1,-1,1], cell: null, move: null}], testMove=5; // should return cell 2 

var testBoard = [{board: [-1,null,null,-1,1,1,null,null,null], cell: null}], testMove=4; // should return cell 6

var miniMaxCalculations = buildMiniMaxCalc(testBoard[0].board);

$(document).ready(function(){

  var winners = allFutureBoards(testBoard, testMove);
  for(var i=0; i<winners.length; i++){
    miniMax(winners[i]);
  }  
  console.log(returnComputerMove(miniMaxCalculations, testMove));

});


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

function returnComputerMove(calculations, move){
  var moveCell;
  var ascendingCalculations = Object.keys(calculations).sort(function(a,b){return calculations[a]-calculations[b]});
  if (move%2 === 0) moveCell = ascendingCalculations[(ascendingCalculations.length - 1)];
  else return moveCell = ascendingCalculations[0];
  return moveCell;
}

// every time it's the computer's move, this function must be called for EVERY potential WINNING board state
function miniMax(board){
  var move = board.move;
  var miniMaxValue;
  for(i=0; i < this.winningCombinations.length; i++){

    var combo = this.winningCombinations[i];
    var sum = board.board[combo[0]] + board.board[combo[1]] + board.board[combo[2]];
    
    if(sum === 3) miniMaxValue = 10 - move;
    else if (sum === -3) miniMaxValue = move - 10;
    else miniMaxValue = 0;
    
    miniMaxCalculations[board.cell] = miniMaxCalculations[board.cell] + miniMaxValue;
  }
  return miniMaxCalculations;
}