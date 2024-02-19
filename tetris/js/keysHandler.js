function moveLeft(tetramino) {
  tetramino = tetramino.clone()
  tetramino.x--
  return tetramino
}
function moveRight(tetramino) {
  tetramino = tetramino.clone()
  tetramino.x++
  return tetramino
}
function moveDown(tetramino) {
  tetramino = tetramino.clone()
  tetramino.y++
  return tetramino
}
function moveUp(tetramino) {
  tetramino = tetramino.clone()
  tetramino.rotate()
  return tetramino
}

function getUserName(){  console.log(1)
  if(userName) return userName
  console.log(2)
  if(localStorage["tetris.username"]) return localStorage["tetris.username"]
  console.log(3)
  return DEFAULT_NAME
}


function addEventKeydownListener() {
  document.addEventListener("keydown", (event) => {
    let movedTetramino
    let isResetHint = false
    switch (event.keyCode) {
      case KEY.DOWN:
        movedTetramino = moveDown(board.tetraminoCurrent)
        break
      case KEY.RIGHT:
        movedTetramino = moveRight(board.tetraminoCurrent)
        isResetHint = true
        break
      case KEY.LEFT:
        movedTetramino = moveLeft(board.tetraminoCurrent)
        isResetHint = true
        break
      case KEY.UP:
        movedTetramino = moveUp(board.tetraminoCurrent)


        isResetHint = true
        break
      case KEY.SPACE:        
        event.preventDefault()
        movedTetramino = moveDown(board.tetraminoCurrent)
        while (board.isPermissible(movedTetramino)) {
          board.tetraminoCurrent.move(movedTetramino)
          movedTetramino = moveDown(board.tetraminoCurrent)
        }
        break
        case KEY.ENTR:
          event.preventDefault()

    }
    if (movedTetramino && board.isPermissible(movedTetramino)) {
      board.tetraminoCurrent.move(movedTetramino)
      if(isResetHint){
        board.resetHint()
      }
    }
  })
}
function inputHeading(){
  HEADING.textContent = getUserName()+'\'s TETRIS'
}

function inputNameButtonHandler(){
userName = INPUT_NAME_TEXT.value
userName = getUserName()
DIALOG_NAME.close()
inputHeading()
localStorage["tetris.username"] = userName
}
function addEntrListener(){
  document.addEventListener("keydown", (event) => {
    if(event.keyCode===KEY.ENTR){
      inputNameButtonHandler()
    }
  })
}
function closeScoreDialogHandler(){
  DIALOG_SCORE.close()
  inputHeading()
}


function addButtonsListener(playButtonHandler) {
  START_BUTTON.addEventListener("click", playButtonHandler)
  INPUT_NAME_BUTTON.addEventListener("click", inputNameButtonHandler)
  CLOSE_SCORE_DIALOG_BUTTON.addEventListener("click", closeScoreDialogHandler)
  CHANGE_NAME_SCORE_DIALOG_BUTTON.addEventListener("click", paintStartNameDialog)
}

function addButtonListener(handler) {
  START_BUTTON.addEventListener("click", handler)
}
