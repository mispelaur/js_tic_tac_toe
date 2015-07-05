// functions that will be called every time the computer moves
// will return the optimal cell for the computer move

$(document).ready(function(){

  console.log("when the computer is ready, you will be prompted which cell to click:")
  console.log("0 | 1 | 2");
  console.log("---------");
  console.log("3 | 4 | 5");
  console.log("---------");
  console.log("6 | 7 | 8");
  console.log("first click on a square in the browser to play as 'X'");


});


function buildMiniMaxCalc(board){
  var obj = board.reduce(function(cell, value, i) {
    cell[i] = value;
    return cell;
  }, {});
  for(var key in obj){
      if(obj[key] !== null) delete obj[key];
      else obj[key] = 0;
  }
  return obj;
}

function returnComputerMove(calculations, move){
  var moveCell;
  var ascendingCalculations = Object.keys(calculations).sort(function(a,b){return calculations[a]-calculations[b]});
  if(move%2 === 0) moveCell = ascendingCalculations[(ascendingCalculations.length - 1)];
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
