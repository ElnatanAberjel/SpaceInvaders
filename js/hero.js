'use strict'

const LASER_SPEED = 80
var gHero
var gIntervalLaser

// creates the hero and place it on board
function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        isShoot: false,
        score: 0
    }
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO
}
// Handle game keys
function onKeyDown(ev) {
    if (!gGame.isOn) return
    if (ev.key === 'ArrowRight') moveHero(1)
    if (ev.key === 'ArrowLeft') moveHero(-1)
    if (ev.key === ' ') shoot()
    // console.log(ev);
}
// Move the hero right (1) or left (-1)
function moveHero(dir) {
    if (gHero.pos)
        updateCell(gHero.pos, null)

    gHero.pos.j += dir

    updateCell(gHero.pos, HERO)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
    if (!gGame.isOn) return
    if (gHero.isShoot) return
    var laserPos = { i: gHero.pos.i - 1, j: gHero.pos.j }
    gIntervalLaser = setInterval(() => {
        gHero.isShoot = true
        laserPos.i--
        var isAlienHit = gBoard[laserPos.i][laserPos.j].gameObject === ALIEN
        if (isAlienHit || laserPos.i === 0) {
            clearInterval(gIntervalLaser)
            gHero.isShoot = false
            if (isAlienHit) {
                handleAlienHit(laserPos)
                return
            }
        }
        blinkLaser(laserPos)
    }, 100)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    updateCell(pos, LASER)
    setTimeout(() => updateCell(pos), 35)
}