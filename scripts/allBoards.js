// functions needed to return all potential future board states
// I only need to return every future win state
// BUT each board needs an associated move at the top of its "tree"
console.log("allBoards linked");

var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var winningBoardStates = [];


// take initial board state and return all potential future boards
function allFutureBoards(boards, move){
  var newBoards = [];
  for(var i = 0; i < boards.length; i++){
    if(gameHasWinner(boards[i], move)){
      newBoards.push(boards[i]);
    } else {
      newBoards.push(populate(boards[i], move));
    }
  }
  move++
  if (move < 9){
    newBoards.push(allFutureBoards(flattenedAndUnique(newBoards), move));
  }
  return flattenedAndUnique(newBoards);
}


// takes a single board and returns an array of all the possible boards after the next move
function populate(board, move){
  if (move === testMove) {
    console.log("at the top of the tree");
    // must find a way to store emptySpaces[i] on each new board pushed into temp
    // and then also store emptySpaces[i] at the top of the tree on each of its descendants
    // adding to temp object will break flattenedAndUnique functionality
    // might store each branch in its own array?
  }
  var temp = [];
  var emptySpaces = [];
  var id = board.indexOf(null);
  while (id != -1) {
    emptySpaces.push(id);
    id = board.indexOf(null, id + 1);
  }
  for(var i = 0; i < emptySpaces.length; i++){ // emptySpaces[i] is the board's last move, but we actually need the number of the cell at the top of the "tree"
    var copy = board.slice(0, 9);
    if (move%2 === 0) copy[emptySpaces[i]]=1;
    else copy[emptySpaces[i]]=-1;
    if (gameHasWinner(copy, move) && isNewWinningState(copy)){

      winningBoardStates.push({board: copy, lastMoveCell: emptySpaces[i]});
    }
    temp.push(copy);
  }
  return temp;
}

function isNewWinningState(board){
  var isUnique = true;
  for (var i=0; i<winningBoardStates.length; i++){
    var count = 0;
    for(var j=0; j<9; j++){
      if(winningBoardStates[i].board[j] === board[j]) {
        count++;
        if(count === 9) isUnique = false;
      }
    } 
  }
  return isUnique;
}

function flattenedAndUnique(array) {
    var singleBoard = [];
    var arrayOfBoards = [];
    for (var i=0; i<array.length; i++){
      if (array[i].length === 9 && array[i][0] === null || array[i][0].length !== 9) {
        singleBoard.push(array[i]);
      } else arrayOfBoards.push(array[i]);
    }
    var tempflattened = [].concat.apply([], arrayOfBoards);
    var allBoards = singleBoard.concat(tempflattened);

    var hash = {}, unique = [];
    for ( var i=0; i<allBoards.length; ++i ) {
        if ( !hash.hasOwnProperty(allBoards[i]) ) { 
            hash[ allBoards[i] ] = true;
            unique.push(allBoards[i]);
        }
    }
    return unique;
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

// var testBoard = [[ null, null, null, null, null, null, null, null, null ]];
// var testMove = 0;
var testBoard = [[ -1, null, 1, 1, null, null, 1, -1, -1 ]]; // returns all 5 potential win states
var testMove = 6;
var testingUniqueness = allFutureBoards(testBoard, testMove);
console.log(testingUniqueness);




