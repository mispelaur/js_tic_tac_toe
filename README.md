## Tic Tac Toe game in JavaScript

##### *A work in progress building an unbeatable game of tic tac toe.*

In the master branch, scripts/main.js contains the basic game functionality allowing two users to play against one another.  Open the browser console to views messages telling you when there is a winner.  

scripts/allBoards.js contains the functions needed to return all the potential future win states based on the current state of the board.  These future win states are needed in the scripts/minimax.js file to implement a minimax algorithm.  The potential future win states are used to score each open cell in the board.  A move in an open cell that is more likely to lead to the current player's opponent winning is scored lower than a move in an open cell more likely to lead to the current player winning.

The integratingFrontEnd branch allows you to test the current functionality of the algorithm.  With the browser console open, you can play first as "X" against the computer playing "O".  Follow console prompts to test your skills against the computer.

