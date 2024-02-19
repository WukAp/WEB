let rAF
let timeCounter = 0
let framesPerRedraw = MIN_SPEED
let board = new Board()

let userName


function run() {  
  score.textContent = 0
  level.textContent = 0
  speed.textContent = 0
  framesPerRedraw = MIN_SPEED
  timeCounter = 0
  board.reset()
  if (rAF) {
    cancelAnimationFrame(rAF)
  }
  gameLoop()
  console.log(this)
}
paintStartNameDialog()
addEntrListener()
addButtonsListener(run)
addEventKeydownListener()
function gameLoop() {
  if (++timeCounter > framesPerRedraw) {
    timeCounter = 0
    if (!board.drop()) {
      paintGameOver()
      return
    }
  }
  MAIN_CANVAS.CTX.clearRect(0, 0, MAIN_CANVAS.WIDTH, MAIN_CANVAS.WIDTH)
  board.drawMain()
  rAF = requestAnimationFrame(gameLoop)
}