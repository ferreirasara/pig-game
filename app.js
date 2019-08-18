var dice, scores, roundScores, activePlayer, dice_colors, page_colors, i, current_color_dice, current_color_page, rules;

current_color_dice = 'blue';
current_color_page = '#38B6FF';

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    dice = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    if (scores[0] < 100 && scores[1] < 100) {
        diceDOM.src = 'img/dice-' + current_color_dice + '-' + dice + '.png';
        if (dice !== 1) {
            roundScores += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScores;        
        } else {
            changePlayer();    
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (roundScores !== 0) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScores;
        // Update the UI and change the player
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            // Show the winner of the game
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
            alert('Player ' + (activePlayer + 1) + ' win the game!');
        } else {
            changePlayer();
        }   
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    if (activePlayer === 1) {
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
    }
    init();    
});

document.querySelector('.btn-color').addEventListener('click', function() {
    if (i < 7) {
        current_color_dice = dice_colors[i];
        current_color_page = page_colors[i];
        changeColor();
    } else {
        i = 0;
        current_color_dice = dice_colors[i];
        current_color_page = page_colors[i];
        changeColor();
    }
    i++;
});

document.querySelector('.btn-rules').addEventListener('click', function() {
    if (rules) {
        rules = false;
        document.querySelector('.rules').style.display = 'none';    
    } else {
        rules = true;
        document.querySelector('.rules').style.display = 'block';
    }
});

function changeColor() {
    document.querySelector('.dice').src = 'img/dice-' + current_color_dice + '-'+dice+'.png';
    document.body.style.backgroundImage = 'linear-gradient(' + current_color_page + ', #fff)';
    document.querySelector('.menu').style.backgroundColor = current_color_page;
    document.getElementById('score-0').style.color = current_color_page;
    document.getElementById('score-1').style.color = current_color_page;
    document.getElementById('player-current-box-0').style.backgroundColor = current_color_page;
    document.getElementById('player-current-box-1').style.backgroundColor = current_color_page;
}

function changePlayer() {
    // Set the atual score to 0
    roundScores = 0;
    // Update the UI
    document.getElementById('current-' + activePlayer).textContent = roundScores;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

function init() {
    dice = 1;
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    dice_colors = ['blue', 'red', 'green', 'yellow', 'purple', 'gray', 'pink'];
    page_colors = ['#38B6FF', '#FF5757', '#7ED957', '#FFDE59', '#8C52FF', '#737373', '#FF66C4'];
    
    i = 1;

    rules = false;
}