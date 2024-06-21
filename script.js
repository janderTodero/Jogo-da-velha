let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mouseover', () => setHoverText(cell));
    cell.addEventListener('mouseout', () => removeHoverText(cell));
});

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winCondition.forEach(index => {
                document.getElementById(`cell-${index}`).classList.add('winning-cell');
            });
            break;
        }
    }

    if (roundWon) {
        const playerName = currentPlayer === 'X' ? document.getElementById('playerX').value || 'Jogador X' : document.getElementById('playerO').value || 'Jogador O';
        displayMessage(`${playerName} venceu!`);
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        displayMessage('Empate!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        handleResultValidation();
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winning-cell');
        removeHoverText(cell);
    });
    document.getElementById('message-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('playerX').value = '';
    document.getElementById('playerO').value = '';
}

function displayMessage(message) {
    document.getElementById('message').innerText = message;
    document.getElementById('message-screen').style.display = 'flex';
}

function setHoverText(cell) {
    if (gameActive && cell.innerText === '') {
        cell.setAttribute('data-hover', currentPlayer);
    }
}

function removeHoverText(cell) {
    cell.removeAttribute('data-hover');
}

function startGame() {
    const playerXName = document.getElementById('playerX').value.trim();
    const playerOName = document.getElementById('playerO').value.trim();
    
    if (playerXName === '' || playerOName === '') {
        document.getElementById('error-message').innerText = 'Por favor, insira os nomes dos dois jogadores.';
        document.getElementById('error-message').style.display = 'block';
    } else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('game-board').style.display = 'grid';
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('resetButton').style.display = 'block';
        gameActive = true;
    }
}
