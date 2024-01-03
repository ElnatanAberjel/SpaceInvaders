'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens


// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIsAlienFreeze = false
var gIsAlienMovingRight  = false


function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < ALIEN_ROW_LENGTH; j++) {
            if (i >= 0 && i < ALIEN_ROW_COUNT) {
                board[i][j].gameObject = ALIEN
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
    if (isLastAlienInRow(gBoard)) gAliensBottomRowIdx--
    if (gGame.alienCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}


function shiftBoardRight(board, fromI, toI) {
    if (gIsAlienFreeze) return
    gIsAlienMovingRight  = true
    for (var i = fromI; i <= toI; i++) {
        for (var j = board[0].length - 1; j >= 0; j--) {

            var leftCellObject  = (j === 0) ? null : board[i][j - 1].gameObject
            if (leftCellObject  === LASER) leftCellObject  = null

            if (board[i][j].gameObject === LASER) {
                if (!leftCellObject ) continue
                else if (leftCellObject  === ALIEN) {
                    leftCellObject  = null
                    handleAlienHit({ i, j })
                }
            }
            board[i][j].gameObject = leftCellObject 

            var lastCellInRow  = gBoard[i][gBoard[i].length - 1]
            if (lastCellInRow .gameObject === ALIEN) {
                clearInterval(gIntervalAliens)
                moveAliens(shiftBoardDown)
            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    if (gIsAlienFreeze) return

    gIsAlienMovingRight  = false
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var rightCellGameObject = (j === board[0].length - 1) ? null : board[i][j + 1].gameObject
            if (rightCellGameObject === LASER) rightCellGameObject = null

            if (board[i][j].gameObject === LASER) {
                if (!rightCellGameObject) continue
                else if (rightCellGameObject === ALIEN) {
                    rightCellGameObject = null
                    handleAlienHit({ i, j })
                }
            }
            board[i][j].gameObject = rightCellGameObject

            var curRowFirstCell = gBoard[i][0]
            if (curRowFirstCell.gameObject === ALIEN) {
                clearInterval(gIntervalAliens)
                moveAliens(shiftBoardDown)
            }
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
    if (gIsAlienFreeze) return

    clearInterval(gIntervalAliens)
    for (var i = toI + 1; i >= fromI; i--) {
        for (var j = 0; j < board[0].length; j++) {
            var topCellGameObject = (i === 0) ? null : board[i - 1][j].gameObject
            if (topCellGameObject === LASER) topCellGameObject = null

            if (board[i][j].gameObject === LASER) {
                if (!topCellGameObject) continue
                else if (topCellGameObject === ALIEN) {
                    topCellGameObject = null
                    handleAlienHit({ i, j })
                }
            }
            board[i][j].gameObject = topCellGameObject
            if (board[i][j].gameObject === ALIEN && i === board.length - 2) {
                gameOver()
            }
        }
    }
    if (!gGame.isOn) return
    gAliensTopRowIdx++
    gAliensBottomRowIdx++

    var funcName = gIsAlienMovingRight  ? shiftBoardLeft : shiftBoardRight
    moveAliens(funcName)
}

function isLastAlienInRow(board) {
    for (var j = 0; j < board[0].length; j++) {
        if (board[gAliensBottomRowIdx][j].gameObject === ALIEN) return false
    }
    return true
}

// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops

function moveAliens(func) {
    gIntervalAliens = setInterval(() => {
        func(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
        renderBoard(gBoard)
    }, ALIEN_SPEED)
}
