

let score = JSON.parse(localStorage.getItem('score')) || { win: 0, tie: 0, lose: 0 };
/*
we can use the one of the below instead of "|| { win: 0, tie: 0, lose: 0 }"
if (score === null) {
    score = {
        win: 0,
        tie: 0,
        lose: 0
    }
};
if (!score) {
    score = {
        win: 0,
        tie: 0,
        lose: 0
    }
};
*/
updateScore();

document.querySelector('.auto-play-btn-js').addEventListener('click', () => {
    autoPlay();
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (isAutoPlaying === false) {
        intervalId = setInterval(() => {
            let playerMove = computerMoveFunction();
            playerGame(playerMove);
        }, 1000)
        isAutoPlaying = true;
        document.querySelector('.auto-play-btn-js').innerHTML = 'Stop Auto Play';
    }

    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play-btn-js').innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock-btn').addEventListener('click', () => {
    playerGame('Rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
    playerGame('Paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
    playerGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        playerGame('Rock');
    }
    else if (event.key === 'p' || event.key === 'P') {
        playerGame('Paper');
    }
    else if (event.key === 's' || event.key === 'S') {
        playerGame('Scissors');
    }

    else if (event.code === 'Space') {
        autoPlay();
    }

    else if (event.code === 'Escape') {
        document.querySelector('.reset-box').style.display = 'block';
    }
});

function playerGame(playerMove) {

    let computerMove = computerMoveFunction();

    let result = '';
    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie';
        }
        else if (computerMove === 'Paper') {
            result = 'You lose';
        }
        else if (computerMove === 'Scissors') {
            result = 'You Win';
        }
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Paper') {
            result = 'Tie';
        }
        else if (computerMove === 'Scissors') {
            result = 'You lose';
        }
        else if (computerMove === 'Rock') {
            result = 'You Win';
        }
    }
    else if (playerMove === 'Scissors') {
        if (computerMove === 'Scissors') {
            result = 'Tie';
        }
        else if (computerMove === 'Rock') {
            result = 'You lose';
        }
        else if (computerMove === 'Paper') {
            result = 'You Win';
        }
    }

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
        <img class="move-icon" src="images/${playerMove}-emoji.png">
        <img class="move-icon" src="images/${computerMove}-emoji.png">
        Computer`;

    if (result === 'You Win') {
        score.win += 1;
    }
    else if (result === 'You lose') {
        score.lose += 1;
    }

    else if (result === 'Tie') {
        score.tie += 1;
    }

    updateScore();

    localStorage.setItem('score', JSON.stringify(score));
}

document.querySelector('.js-reset-score-btn').addEventListener('click', () => {
    document.querySelector('.reset-box').style.display = 'block';
});

document.querySelector('.no-btn').addEventListener('click', () => {
    document.querySelector('.reset-box').style.display = 'none';
});

document.querySelector('.yes-btn').addEventListener('click', () => {
    document.querySelector('.reset-box').style.display = 'none';
    score.win = 0;
    score.tie = 0;
    score.lose = 0;
    localStorage.removeItem('score');
    updateScore();
});

function updateScore() {
    document.querySelector('.js-score')
        .innerHTML = `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;
}

function computerMoveFunction() {
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    }

    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}

document.querySelector('.info-cross').addEventListener('click', () => {
    document.querySelector('.info-keys').style.display = 'none';
    document.querySelector('.btn-how-to-play').style.display = 'block';
});

document.querySelector('.btn-how-to-play').addEventListener('click', () => {
    document.querySelector('.info-keys').style.display = 'block';
    document.querySelector('.btn-how-to-play').style.display = 'none';
});

