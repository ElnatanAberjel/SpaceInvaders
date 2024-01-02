'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens

// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx = 1
var gAliensBottomRowIdx = ALIEN_ROW_COUNT
var gIsAlienFreeze = true

function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < ALIEN_ROW_LENGTH; j++) {
            if (i > 0 && i <= ALIEN_ROW_COUNT) {
                board[i][j] = createCell(ALIEN)
                gGame.alienCount++
            }
        }
    }
}
function handleAlienHit(pos) {
    updateCell(pos)
    gGame.alienCount--
    gHero.score += 10
    renderScore()
    if (gGame.alienCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}


function shiftBoardRight(board, fromI, toI) {}
function shiftBoardLeft(board, fromI, toI) {}
function shiftBoardDown(board, fromI, toI) {}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {}