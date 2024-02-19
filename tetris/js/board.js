class Board {
  ctxMain
  ctxNext
  boardGrid
  tetraminoCurrent
  tetraminoNext
  tetraminoHint

  constructor() {
    this.ctxMain = this.getCanvasCtx(MAIN_CANVAS)
    this.ctxNext = this.getCanvasCtx(NEXT_CANVAS)
  }

  getCanvasCtx(CANVAS) {
    let ctx = CANVAS.CTX
    ctx.canvas.width = CANVAS.WIDTH
    ctx.canvas.height = CANVAS.HEIGHT
    ctx.scale(SCALE, SCALE)
    return ctx
  }

  reset() {
    let emptyGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(false))
    this.boardGrid = emptyGrid

    this.tetraminoCurrent = new Tetramino()
    this.tetraminoCurrent.toCenter()
    this.addNextTetramino()
    this.resetHint()
    this.drawMain()
  }

  addNextTetramino() {
    this.tetraminoNext = new Tetramino()
    this.ctxNext.clearRect(0, 0, NEXT_CANVAS.WIDTH, NEXT_CANVAS.HEIGHT)
    paintGrid(
      this.ctxNext,
      this.tetraminoNext.tetraminoGrid,
      this.tetraminoNext.x,
      this.tetraminoNext.y
    );
  }

  drawMain() {
    paintGrid(
      this.ctxMain,
      this.tetraminoCurrent.tetraminoGrid,
      this.tetraminoCurrent.x,
      this.tetraminoCurrent.y
    )

    paintGrid(this.ctxMain, this.boardGrid)

    paintGrid(
      this.ctxMain,
      this.tetraminoHint.tetraminoGrid,
      this.tetraminoHint.x,
      this.tetraminoHint.y,
      false
    )
  }

  drop() {
    let droppedTetramino = moveDown(this.tetraminoCurrent)
    if (this.isPermissible(droppedTetramino)) {
      this.tetraminoCurrent.move(droppedTetramino)
    } else {
      this.saveCurrentTetramino()
      this.clearLines()
      this.tetraminoNext.toCenter()

      if (this.isPermissible(this.tetraminoNext)) {
        this.tetraminoCurrent = this.tetraminoNext
        this.resetHint()
        this.addNextTetramino()
      } else {
        return false
      }
    }
    return true
  }

  clearLines() {
    let fullLinesCount = 0

    this.boardGrid.forEach((row, y) => {
      if (row.every((value) => value)) {
        fullLinesCount++

        this.boardGrid.splice(y, 1)
        this.boardGrid.unshift(Array(COLS).fill(false))
        score.textContent =
        toNumber(score) +
          fullLinesCount * Math.ceil(toNumber(level)) + POINTS_PER_LINE
        level.textContent = (
          toNumber(score) / SCORE_PER_LEVEL
        ).toFixed(1)
        framesPerRedraw = Math.ceil(Math.max(MAX_SPEED, MIN_SPEED - toNumber(level)))
        speed.textContent = MIN_SPEED - framesPerRedraw
      }
    })
    if(fullLinesCount){
      audio.play();
    }
  }

  isPermissible(tetramino) {
    let result = true
    for (let i in tetramino.tetraminoGrid) {
      for (let j in tetramino.tetraminoGrid[i]) {
        result = result&&(!tetramino.tetraminoGrid[i][j] ||
          (tetramino.x + +j >= 0 &&
            tetramino.x + +j < COLS &&
            tetramino.y + +i <= ROWS &&
            this.boardGrid[tetramino.y + +i] &&
            !this.boardGrid[tetramino.y + +i][tetramino.x + +j]))
            if(tetramino.x + +j <0) {}
      }
    }
   return result
  }

  saveCurrentTetramino() {
    this.tetraminoCurrent.tetraminoGrid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          this.boardGrid[y + this.tetraminoCurrent.y][
            x + this.tetraminoCurrent.x
          ] = value
        }
      })
    })
  }

  resetHint() {
    this.tetraminoHint = this.tetraminoCurrent.clone()
    let tetraminoBuf = this.tetraminoHint
    while (board.isPermissible(tetraminoBuf)) {
      this.tetraminoHint = tetraminoBuf
      tetraminoBuf = moveDown(this.tetraminoHint)
    }
  }
}
