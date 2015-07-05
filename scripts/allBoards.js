// functions needed to return all potential future win states
console.log("allBoards linked");

var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var winningBoardStates = [];

function allFutureBoards(boards, move){
  var newBoards = [];
  for(var i = 0; i < boards.length; i++){
    if(gameHasWinner(boards[i].board, move)){
      winningBoardStates.push(boards[i]);
    }else{
      newBoards.push(populate(boards[i], move));
    }
  }
  move++
  if(move < 10){
    newBoards.push(allFutureBoards(_.flatten(newBoards), move));
  } 
  return winningBoardStates;
}

// takes a single board and returns an array of all the possible boards after the next move
function populate(boardState, move){
  var temp = [];
  var emptySpaces = returnEmptySpaces(boardState.board);
  for(var i = 0; i < emptySpaces.length; i++){ 

    if (move === testMove) boardState.cell = emptySpaces[i]; 
    var copy = boardState.board.slice(0, 9);
    if (move%2 === 0) copy[emptySpaces[i]]=1;
    else copy[emptySpaces[i]]=-1;
    temp.push({board: copy, cell: boardState.cell, move: move+1});

  }
  return temp;
}

function returnEmptySpaces(board){
  var emptySpaces = [];
  var id = board.indexOf(null);
  while(id != -1){
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