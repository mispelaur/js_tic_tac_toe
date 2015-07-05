console.log("main linked");

function Game(hasComputerPlayer, computerPlaysFirst){
  this.board = [null, null, null, null, null, null, null, null, null];
  this.hasComputerPlayer = hasComputerPlayer;
  this.computerPlaysFirst = computerPlaysFirst; //computer plays odd
  this.moveNumber = 0;
  this.boardState = $('.board').attr('id');
  this.noWinner = true;
  // this.hasComputerPlayer = hasComputerPlayer;
  this.winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  this.AIBoard = [];
  this.miniMaxCalculations = {};
  this.futureBoards = [];
  this.futureWinStates = [];
}

Game.prototype.eventListeners = function(){
  if(this.timeForComputerMove()) this.returnComputerMove();
  var game = this;
  $(".cell").on("click", function(){
    if(game.boardState === "active"){
      game.makeMove($(this));
    }
  })
}

Game.prototype.makeMove = function(cell){
  if(this.moveNumber % 2 === 0){
    cell.text("X");
    this.board[cell.attr('id')] = 1;
  } else {
    cell.text("O");
    this.board[cell.attr('id')] = -1;
  }
  if(this.moveNumber >= 4) this.checkForWinner();
  this.moveNumber ++;
  cell.off();
  if(this.timeForComputerMove()) this.returnComputerMove();
}

Game.prototype.checkForWinner = function(){
  for(i=0; i < this.winningCombinations.length; i++){
    var combo = this.winningCombinations[i];
    var sum = this.board[combo[0]] + this.board[combo[1]] + this.board[combo[2]];
    if(Math.abs(sum) === 3 ){
      if(sum === 3) console.log("X wins!");
      else console.log("O wins!");
      this.noWinner = false;
      this.boardState = "inactive";
    }
  }
  if (this.noWinner === false) this.boardState = "inactive";
  if (this.noWinner && this.moveNumber === 8) console.log("tie");
}

Game.prototype.timeForComputerMove = function(){
  if(this.hasComputerPlayer && this.noWinner){
    if(this.computerPlaysFirst && this.moveNumber%2 === 0) return true
    else if(!this.computerPlaysFirst && this.moveNumber%2 === 1) return true
    else return false
  }else{
    return false
  }
}

var currentGame = new Game(true, false); //Game(hasComputerPlayer, computerPlaysFirst)
currentGame.eventListeners();