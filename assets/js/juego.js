/**
 * C = Clubs
 * D = Diamonds
 * H = Hearts
 * S = Spades 
*/
const createDeck = (typesOfCards, specials) => {
    let deck = []
    for(let i = 2; i<=10; i++){
        for (let type of typesOfCards){
            deck.push( i + type);
        }
    }
    for (let types of typesOfCards){
        for (let special of specials){
            deck.push( special + types)
        }
    }
    deck = _.shuffle( deck );
    return deck
};

const getCard = (deck) => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    return deck.shift()
};

const valueOfCard = (card) => {
    const value = card.substring(0,card.length -1);
    return ( !isNaN(value) ) ? value * 1
            :(value === 'A') ? 11 : 10;
}

const typesOfCards = ['C','D','H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];


const deck = createDeck(typesOfCards, specials);
console.log(valueOfCard(getCard(deck)));
console.log(deck)
