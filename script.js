// Card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = [
  "Ace",
  "King",
  "Queen",
  "Jack",
  "Ten",
  "Nine",
  "Eight",
  "Seven",
  "Six",
  "Five",
  "Four",
  "Three",
  "Two"
];

// DOM variables
let messageEl = document.getElementById("message");
let playerCardsEl = document.getElementById("player-cards");
let dealerCardsEl = document.getElementById("dealer-cards");
let playerPointsEl = document.getElementById("player-points");
let dealerPointsEl = document.getElementById("dealer-points");
let dealBtn = document.getElementById("deal-button");
let hitBtn = document.getElementById("hit-button");
let standBtn = document.getElementById("stand-button");
let restartBtn = document.getElementById("restart-button");

// Game variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

//  function to get a random card from the deck
function getRandomCard() {
  let randomIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randomIndex, 1)[0];
}

// Function to start a new game
function startGame() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getRandomCard(), getRandomCard()];
  playerCards = [getRandomCard(), getRandomCard()];

  messageEl.textContent = "Let's play!";

  showStatus();
}

// Function to create a deck of cards
function createDeck() {
  let deck = [];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      let card = {
        suit: suits[suitIndex],
        value: values[valueIndex]
      };
      deck.push(card);
    }
  }
  return deck;
}

// Function to shuffle the deck of cards
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIndex = Math.floor(Math.random() * deck.length);
    let tmp = deck[i];
    deck[i] = deck[swapIndex];
    deck[swapIndex] = tmp;
  }
}

// Function to match the numerical values to the cards
function getCardValue(card) {
  switch (card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    default:
      return 10;
  }
}

// Function to get the score of a hand
function getScore(hand) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
    score += getCardValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

// Function to update the status of the game
function showStatus() {
  if (!gameStarted) {
    return;
  }

  playerCardsEl.innerHTML = "";
  for (let i = 0; i < playerCards.length; i++) {
    let cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.textContent = playerCards[i].value + " of " + playerCards[i].suit;
    playerCardsEl.appendChild(cardEl);
  }

  dealerCardsEl.innerHTML = "";
  for (let i = 0; i < dealerCards.length; i++) {
    let cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.textContent = dealerCards[i].value + " of " + dealerCards[i].suit;
    dealerCardsEl.appendChild(cardEl);
  }

  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
  dealerPointsEl.textContent = "Dealer Points: " + dealerScore;
  playerPointsEl.textContent = "Player Points: " + playerScore;

  if (gameOver) {
    if (playerWon) {
      messageEl.textContent = "You won!";
    } else {
      messageEl.textContent = "You lost!";
    }
    dealBtn.disabled = true;
    hitBtn.disabled = true;
    standBtn.disabled = true;
    restartBtn.styledisplay = "inline";
  } else {
    messageEl.textContent = "Choose an action:";
    dealBtn.disabled = false;
    hitBtn.disabled = false;
    standBtn.disabled = false;
    restartBtn.styledisplay = "inline";
  }
}

// Event listeners for buttons
dealBtn.addEventListener("click", function () {
  startGame();
});

hitBtn.addEventListener("click", function () {
  playerCards.push(getRandomCard());
  checkForEndOfGame();
  showStatus();
});

standBtn.addEventListener("click", function () {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

restartBtn.addEventListener("click", function () {
  startGame();
  restartBtn.style.display = "inline";
});

// Function to check if the game has ended
function checkForEndOfGame() {
  updateScores();

  if (gameOver) {
    while (
      dealerScore < playerScore &&
      playerScore <= 21 &&
      dealerScore <= 21
    ) {
      dealerCards.push(getRandomCard());
      updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
  }
}

// Function to update the game scores
function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

// initialize the game
startGame();