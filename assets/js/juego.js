/**
 * C = Clubs
 * D = Diamonds
 * H = Hearts
 * S = Spades 
*/
const createDeck = (typesOfCarts, specials) => {
    let deck = []
    for(let i = 2; i<=10; i++){
        for (let type of typesOfCarts){
            deck.push( i + type);
        }
    }
    for (let types of typesOfCarts){
        for (let special of specials){
            deck.push( special + types)
        }
    }
    deck = _.shuffle( deck );
    return deck
};

const getCart = (deck) => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    return deck.shift()
};


const typesOfCarts = ['C','D','H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
const deck = createDeck(typesOfCarts, specials);






console.log(getCart(deck));
console.log(deck)
