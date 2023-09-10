const moves = document.getElementById('moves-count');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const gameContainer =  document.querySelector('.game-container');
const result = document.getElementById('result');
const controls = document.querySelector('.controls-container');

let cards;
let interval;
let firstCard = false;
let secondCard = false;


// items array
const items =[
    {name: "bee", image:"bee.png"},
    {name: "crocodile", image:"crocodile.png"},
    {name: "macaw", image:"macaw.png"},
    {name: "gorilla", image:"gorilla.png"},
    {name: "tiger", image:"tiger.png"},
    {name: "monkey", image:"monkey.png"},
    {name: "chameloeon", image:"chameloeon.png"},
    {name: "piranha", image:"piranha.png"},
    {name: "anaconda", image:"anaconda.png"},
    {name: "sloth", image:"sloth.png"},
    {name: "cockatoo", image:"cockatoo.png"},
    {name: "toucan", image:"toucan.png"},
    
]

// initial time
let seconds =0;
let minutes =0;

// initial moves and win count
let movesCount =0;
let winCount =0;

// timer
const timeGernerator =()=>{
    seconds += 1;
    if(seconds >= 60)
    {
        minutes += 1;
        seconds =0;
    }

// formate time before displaying
let secondsValue = seconds < 10 ? `0${seconds}`: seconds;
let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;

};

// calculating moves
const movesCounter = ()=>{
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
}

// picking random objects from the items array
const generateRandom =(size = 4)=>{
    // temporary array
    let tempArray = [...items];
    // initializes cardsValue array
    let cardValues =[];

    size = (size*size)/2;

    // random obj selection
    for(let i=0; i<size; i++)
    {
        const randomIndex = Math.floor(Math.random()*tempArray.length);

        cardValues.push(tempArray[randomIndex]);
        // once selected removing the obj from temp array
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator =(cardValues , size = 4)=>{
    gameContainer.innerHTML="";
    cardValues =[...cardValues, ...cardValues]
    // shuffling
    cardValues.sort(()=>Math.random() -0.5);
    for(let i=0; i<size*size; i++)
    {
        // creating cards
        gameContainer.innerHTML +=`
        <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">?</div>
          <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/>
          </div>
        </div>`;
    }
    // grid
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`

    // cards
    cards = document.querySelectorAll('.card-container');
    cards.forEach((card)=>{
        card.addEventListener('click', ()=>{
            if(!card.classList.contains('matched') && !card.classList.contains('flipped'))
            {
                card.classList.add('flipped');

                if(!firstCard){
                    firstCard = card;
                    firstCardValue = card.getAttribute('data-card-value');
                }
                else{
                    movesCounter();
                    secondCard = card;
                    let secondCardsValue = card.getAttribute('data-card-value');
                    if(firstCardValue== secondCardsValue)
                    {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
    
                        firstCard= false;
                        winCount +=1;
    
                        if(winCount == Math.floor(cardValues.length/2))
                        {
                            result.innerHTML =`
                            <h2>You Won!!</h2>
                            <h4>Moves: ${movesCount}</h4>`;
                            stopGame();
                        }
                    }
                    else{
                        let[tempFirst, tempSecond]=[firstCard, secondCard];
                        firstCard = false;
                        secondCard= false;
                        let delay = setTimeout(()=>{
                            tempFirst.classList.remove('flipped');
                            tempSecond.classList.remove('flipped');
                        }, 900);
                    }
                }
            }
        })
    })
};

startButton.addEventListener('click',()=>{
    movesCount =0;
    time =0;
    controls.classList.add('hide');
    stopButton.classList.remove('hide');
    startButton.classList.add('hide');

    interval = setInterval(timeGernerator, 1000);
    movies.innerHTML =`<span>Moves:</span> ${movesCount}`;
    initlizer();
})
stopButton.addEventListener('click',(stopGame =()=>{
    controls.classList.remove('hide');
    stopButton.classList.add('hide');
    startButton.classList.remove('hide');
    clearInterval(interval)
    
}))

const initlizer=()=>{
    result.innerText ="";
    winCount =0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};
initlizer();
