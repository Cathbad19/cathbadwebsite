const cardArray = [
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },

]

cardArray.sort(() => 0.5 - Math.random())

const gameBoard = document.querySelector('#game-board')
const resultDisplay = document.querySelector('#result')
const gameMessage = document.querySelector('#game-message')
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
const button = document.querySelector("#restart");
let timeoutId;

button.addEventListener("click", () => clearBoard());

createBoard()

function createBoard() {
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gameBoard.appendChild(card)
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 5000)
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')

        gameMessage.innerHTML = "You have clicked on the same card twice! Try again!"
        timeoutId = setTimeout(() => {
                gameMessage.innerHTML = "";
            }, 5000)
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
        gameMessage.innerHTML = "You have matched two cards!!"
        timeoutId = setTimeout(() => {
            gameMessage.innerHTML = "";
        }, 2000)
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        if (cardsWon.length === 6) {
            winGame();
        }
    }
    else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');

        gameMessage.innerHTML = "Your card choices do not match! Try again!"
        timeoutId = setTimeout(() => {
            gameMessage.innerHTML = "";
        }, 5000)
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length.toString();
}


function clearBoard() {
    const cards = document.querySelectorAll('img')
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    resultDisplay.textContent = '0';
    gameMessage.innerHTML = "";
    gameMessage.style.color = "red";
    cards.forEach(card => card.setAttribute('src', 'images/blank.png'))
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function winGame() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    gameMessage.innerHTML = "You have matched all the cards! You win!"
    gameMessage.style.color = "blue";
}
