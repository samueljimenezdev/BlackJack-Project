(() => {
    "use strict";

    /**
     * C = Clubs
     * D = Diamonds
     * H = Hearts
     * S = Spades
     */
    const createDeck = (typesOfCards, specials) => {
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
      deck = _.shuffle(deck);
      return deck;
    };

    const getCard = (deck) => {
      if (deck.length === 0) {
        throw "No hay cartas en el deck";
      }
      return deck.shift();
    };

    const valueOfCard = (card) => {
      const value = card.substring(0, card.length - 1);
      return !isNaN(value) ? value * 1 : value === "A" ? 11 : 10;
    };

    const computerTurn = (minimunPoints, deck, pointsScore, computerCardsDiv) => {
      buttonStop.disabled = true;
      buttonGetCard.disabled = true;
      let currentComputerPoints = 0;
      do {
        const card = getCard(deck);
        currentComputerPoints += valueOfCard(card);
        pointsScore[1].innerText = currentComputerPoints;
        const imgCard = document.createElement("img");
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add("carta");
        computerCardsDiv.append(imgCard);
        if (minimunPoints > 21) {
          break;
        }
      } while (minimunPoints > currentComputerPoints);

      setTimeout(() => {
        if (currentComputerPoints > 21) {
          alert("El jugador ganó");
        } else if (currentComputerPoints === minimunPoints) {
          alert("Empate");
        } else if (minimunPoints > 21) {
          alert("La computadora gana");
        } else {
          alert("La computadora gana");
        }
      }, 20);
    };

    const typesOfCards = ["C", "D", "H", "S"];
    const specials = ["A", "J", "Q", "K"];
    let deck = createDeck(typesOfCards, specials);
    let pointsPlayer = 0;
    let pointsComputer = 0;

    // Events

    const buttonNewGame = document.querySelector("#buttonNewGame");
    const buttonGetCard = document.querySelector("#buttonGetCard");
    const buttonStop = document.querySelector("#buttonStop");
    const pointsScore = document.querySelectorAll("small");
    const playerCardsDiv = document.querySelector("#jugador-cartas");
    const computerCardsDiv = document.querySelector("#computador-cartas");

    buttonNewGame.addEventListener("click", () => {
      deck = createDeck(typesOfCards, specials);
      pointsPlayer = 0;
      pointsComputer = 0;
      pointsScore[0].innerText = pointsPlayer;
      pointsScore[1].innerText = pointsComputer;
      buttonStop.disabled = false;
      buttonGetCard.disabled = false;
      playerCardsDiv.innerHTML = "";
      computerCardsDiv.innerHTML = "";
    });
    buttonGetCard.addEventListener("click", () => {
      const card = getCard(deck);
      pointsPlayer += valueOfCard(card);
      pointsScore[0].innerText = pointsPlayer;
      const imgCard = document.createElement("img");
      imgCard.src = `assets/cartas/${card}.png`;
      imgCard.classList.add("carta");
      playerCardsDiv.append(imgCard);

      if (pointsPlayer > 21) {
        computerTurn(pointsPlayer, deck, pointsScore, computerCardsDiv);
      }
    });
    buttonStop.addEventListener("click", () => {
      computerTurn(pointsPlayer, deck, pointsScore, computerCardsDiv);
    });
})();
