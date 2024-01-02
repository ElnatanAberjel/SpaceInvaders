'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const HERO = '🛸'
const ALIEN = '👾'
const LASER = '💧'
const SKY = 'SKY'


// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard

var gGame
// Called when game loads
function init() {

    gGame = {
        isOn: true,
        isVictory: false,
        alienCount: 0
    }

    gBoard = createBoard(BOARD_SIZE)
    createHero(gBoard)
    gHero.score = 0
    createAliens(gBoard)
    console.log(gBoard)
    renderBoard(gBoard)
    renderScore()
    closeModal()
    moveAliens()
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens



function createBoard(size) {
    // Render the board as a <table> to the page
    const board = []

    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell-${i}-${j}`

            strHTML += `<td class="${className}"
            data-i='${i}' data-j='${j}'>${cell.gameObject || ''}</td>`
        }
        strHTML += '</tr>'
    }
    const elModal = document.querySelector('.board')
    elModal.innerHTML = strHTML
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}
// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    if (gHero.pos.j < 0) gHero.pos.j = gBoard[0].length - 1
    if (gHero.pos.j > gBoard[0].length - 1) gHero.pos.j = 0

    // console.log(gameObject);
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

function renderScore() {
    const elScore = document.querySelector('.score')
    elScore.innerText = gHero.score
}

function gameOver() {
    gGame.isOn = false
    const msg = gGame.isVictory ? '🥳victorious🥳' : 'Game Over'
    openModal(msg)
    const elBtn = document.querySelector('.modal button')
    elBtn.style.display = 'inline-block'

}

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elSpan = elModal.querySelector('.msg')
    elSpan.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}