const myModule = (() => {
  "use strict";

  /**
   * C = Clubs
   * D = Diamonds
   * H = Hearts
   * S = Spades
   */

  // Cards

  const typesOfCards = ["C", "D", "H", "S"],
        specials = ["A", "J", "Q", "K"];

  // Game tools

  let deck,
      pointsPlayers;

  // Document objects

  let generalTurn = 0;

  const buttonNewGame = document.querySelector("#buttonNewGame"),
        buttonGetCard = document.querySelector("#buttonGetCard"),
        buttonStop = document.querySelector("#buttonStop"),
        pointsScoreHTML = document.querySelectorAll("small"),
        cardsPlayersPlace = document.querySelectorAll('.cardsPlayersPlace')

  const init = (numPlayers = 2) => {
    pointsPlayers = [];
    deck = createDeck();
    for (let i = 0; i < numPlayers; i++) {
      pointsPlayers.push(0);
    }
    generalTurn = 0;
  };

  const renderCard = (turn, card) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("carta");
    cardsPlayersPlace[turn].append(imgCard);
  }

  const accumulatePoint = (turn, card) => {
    pointsPlayers[turn] += valueOfCard(card);
    pointsScoreHTML[turn].innerText = pointsPlayers[turn];
    return pointsPlayers[turn]
  };

  const createDeck = () => {
    let deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of typesOfCards) {
        deck.push(i + type);
      }
    }
    for (let types of typesOfCards) {
      for (let special of specials) {
        deck.push(special + types);
      }
    }
    return _.shuffle(deck);
  };

  const getCard = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.shift();
  };

  const valueOfCard = (card) => {
    const value = card.substring(0, card.length - 1);
    return !isNaN(value) ? value * 1 : value === "A" ? 11 : 10;
  };

  const evalWinner= (pointsComputer, pointsPlayer) =>{
    setTimeout(() => {
      if (pointsComputer > 21) {
        alert("El jugador ganó");
      } else if (pointsComputer === pointsPlayer) {
        alert("Empate");
      } else if (pointsPlayer > 21) {
        alert("La computadora gana");
      } else {
        alert("La computadora gana");
      }
    }, 20);
  }

  const computerTurn = (minimunPoints) => {
    buttonStop.disabled = true; 
    buttonGetCard.disabled = true;
    const computerPosition = pointsPlayers.length -1;
    do {
      const card = getCard(deck);

      accumulatePoint(computerPosition, card);
      renderCard(computerPosition, card);
      if (minimunPoints > 21) {
        break;
      }
    } while (minimunPoints > pointsPlayers[computerPosition]);

    evalWinner(pointsPlayers[computerPosition], minimunPoints)

  };

// Events

  buttonNewGame.addEventListener("click", () => {
    init();

    for (let player in pointsPlayers){
      pointsScoreHTML[player].innerText = pointsPlayers[player];
      cardsPlayersPlace[player].innerHTML = ''
    }
    buttonStop.disabled = false; 
    buttonGetCard.disabled = false;
  });

  buttonGetCard.addEventListener("click", () => {
    const card = getCard(deck);
    const pointsPlayer = accumulatePoint(generalTurn,card);
    renderCard(generalTurn, card);
    if (pointsPlayer > 21) {
      computerTurn(pointsPlayer);
    }
  });

  buttonStop.addEventListener("click", () => {
    computerTurn(pointsPlayers[generalTurn]);
    generalTurn += 1;
  });

  init();
})();
