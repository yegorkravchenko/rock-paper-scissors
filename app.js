const usernameSpan = document.querySelector('#username-greeting');
const usernameInput = document.querySelector('#username');
const playerScore = document.querySelector('#player-score');
const compScore = document.querySelector('#comp-score');
const playerMoves = document.querySelectorAll('#player-moves span');
const compMove = document.querySelector('#comp-move');
const startBtn = document.querySelector('#start-btn');
const instructions = document.querySelector('.text-box p');

let playerSelection = '';
let isGameStarted = false;
let roundsCounter = 0;

function compPlay() {
    const moves = ['rock', 'paper', 'scissors'];

    const min = 0;
    const max = Math.floor(moves.length - 1);
    return moves[Math.floor(Math.random() * (max - min + 1)) + min];
}

function playRound(playerSelection, compSelection) {
    switch (compSelection) {
        case 'rock':
            compMove.textContent = '👊';
            break;
        case 'paper':
            compMove.textContent = '🖐';
            break;
        case 'scissors':
            compMove.textContent = '✌';
            break;
        default:
            compMove.textContent = '❓️'
            break;
    }
    
    if (playerSelection === compSelection) {
        instructions.textContent = `Round ${roundsCounter}: Draw!`;
    } else if ((playerSelection === 'paper' && compSelection === 'rock') || (playerSelection === 'rock' && compSelection === 'scissors') || (playerSelection === 'scissors' && compSelection === 'paper')) {
        instructions.textContent = `Round ${roundsCounter}: You have won the round!`;
        playerScore.textContent = parseInt(playerScore.textContent, 10) + 1;
    } else {
        instructions.textContent = `Round ${roundsCounter}: The computer has won the round!`;
        compScore.textContent = parseInt(compScore.textContent, 10) + 1;
    }
    console.log('pS:', playerSelection, 'cS:', compSelection);
}

usernameInput.addEventListener('input', () => {
    usernameSpan.textContent = usernameInput.value;
});

playerMoves.forEach(move => move.addEventListener('click', () => {
    if (isGameStarted) {
        playerSelection = move.id;
    
        const selectedMove = Object.values(playerMoves).filter(selection => selection.classList.contains('selected'));
        if (selectedMove.length !== 0) {
            selectedMove[0].classList.remove('selected');
        }

        move.classList.add('selected');
    }
}));

startBtn.addEventListener('click', () => {
    if (!isGameStarted) {
        isGameStarted = true;

        playerMoves[1].classList.add('selected');
        startBtn.textContent = 'Play';
        instructions.textContent = 'Choose your move and play!';
    } else if (roundsCounter === 5) {
        roundsCounter += 1;
        startBtn.textContent = 'Play again';
        
        if (parseInt(playerScore.textContent, 10) > parseInt(compScore.textContent, 10)) {
            instructions.textContent = 'You have won the game, congratulations!';
        } else if (parseInt(playerScore.textContent, 10) === parseInt(compScore.textContent, 10)) {
            instructions.textContent = 'It\' a draw!';
        } else {
            instructions.textContent = 'You haven\'t won :(';
        }
    } else if (roundsCounter === 6) {
        location.reload();
    } else {
        roundsCounter += 1;
        startBtn.textContent = 'Next round';
        playRound(playerSelection, compPlay());
    }
});