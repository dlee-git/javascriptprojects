// Initalize global variables

let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;
let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;

let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;
let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

// Assigns the correct player values and types
function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
  if (player === 'Player One') {
    playerOneMoveOneType = moveOneType;
    playerOneMoveTwoType = moveTwoType;
    playerOneMoveThreeType = moveThreeType;
    playerOneMoveOneValue = moveOneValue;
    playerOneMoveTwoValue = moveTwoValue;
    playerOneMoveThreeValue = moveThreeValue;
  } else if (player === 'Player Two') {
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveThreeType = moveThreeType;
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeValue = moveThreeValue;
  } else {
    log.console('Invalid Player ID. Check setPlayerMoves function');
  }
}

// Determines rock paper scissors round winner (or tie)
function getMoveWinner(playerOneMoveType, playerOneMoveValue, playerTwoMoveType,
                       playerTwoMoveValue) {
  // Check that parameters are inputed correctly
  if (!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType ||
      !playerTwoMoveValue) {
    return null;
  }

  if (playerOneMoveType === playerTwoMoveType) {
    if (playerOneMoveValue > playerTwoMoveValue) {
      return 'Player One';
    } else if (playerOneMoveValue < playerTwoMoveValue) {
      return 'Player Two';
    } else {
      return 'Tie';
    }
  }
  if (playerOneMoveType === 'rock') {
    if (playerTwoMoveType === 'scissors') {
      return 'Player One';
    } else {
      return 'Player Two';
    }
  } else if (playerOneMoveType === 'paper') {
    if (playerTwoMoveType === 'rock') {
      return 'Player One';
    } else {
      return 'Player Two';
    }
  } else {
    if (playerTwoMoveType === 'paper') {
      return 'Player One';
    } else {
      return 'Player Two';
    }
  }
}

// Obtains the round# winner.
function getRoundWinner(roundNumber) {
  switch(roundNumber) {
    case 1:
      return getMoveWinner(playerOneMoveOneType,
                           playerOneMoveOneValue,
                           playerTwoMoveOneType,
                           playerTwoMoveOneValue);
    case 2:
      return getMoveWinner(playerOneMoveTwoType,
                           playerOneMoveTwoValue,
                           playerTwoMoveTwoType,
                           playerTwoMoveTwoValue);
    case 3:
      return getMoveWinner(playerOneMoveThreeType,
                           playerOneMoveThreeValue,
                           playerTwoMoveThreeType,
                           playerTwoMoveThreeValue);
    default:
      return null;
  }
}

// Sums up the wins per player from all the rounds.
function getGameWinner() {
  let playerOneCount = 0;
  let playerTwoCount = 0;

  if (getRoundWinner(1) === 'Player One') {
    playerOneCount++;
  } else if (getRoundWinner(1) === 'Player Two') {
    playerTwoCount++;
  }
  if (getRoundWinner(2) === 'Player One') {
    playerOneCount++;
  } else if (getRoundWinner(2) === 'Player Two') {
    playerTwoCount++;
  }
  if (getRoundWinner(3) === 'Player One') {
    playerOneCount++;
  } else if (getRoundWinner(3) === 'Player Two') {
    playerTwoCount++;
  }

  if (playerOneCount > playerTwoCount) {
    return 'Player One';
  } else if (playerOneCount < playerTwoCount) {
    return 'Player Two';
  } else {
    return 'Tie';
  }
}

//Function to play against computer
function setComputerMoves() {
  //Get First Move
  let number = Math.floor(3*Math.random());
  let moveOneType;
  if (number === 0) {
    moveOneType = 'Rock';
  }
  if (number === 1) {
    moveOneType = 'Paper';
  }
  if (number === 2) {
    moveOneType = 'Scissors';
  }

  //Get Second Move
  number = Math.floor(3*Math.random());
  let moveTwoType;
  if (number === 0) {
    moveTwoType = 'Rock';
  }
  if (number === 1) {
    moveTwoType = 'Paper';
  }
  if (number === 2) {
    moveTwoType = 'Scissors';
  }

  //Get Third Move
  number = Math.floor(3*Math.random());
  let moveThreeType;
  if (number === 0) {
    moveThreeType = 'Rock';
  }
  if (number === 1) {
    moveThreeType = 'Paper';
  }
  if (number === 2) {
    moveThreeType = 'Scissors';
  }

  //First Value
  let moveOneValue = Math.floor(97*Math.random()) + 1;
  //Second Value
  let moveTwoValue = Math.floor((98-playerTwoMoveOneValue)*Math.random()) + 1;
  //Third Value
  let moveThreeValue = 99 - playerTwoMoveOneValue - playerTwoMoveTwoValue;

  setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType,
                 moveTwoValue, moveThreeType, moveThreeValue);

}
