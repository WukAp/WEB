class Tetramino {
  tetraminoGrid
  type
  x
  y

  constructor() {
    this.type = this.getRandomTetrominoType()
    this.tetraminoGrid = TETRAMINOS[this.type]
    this.x = 0
    this.y = 0
  }

  move(tetramino) {
    this.x = tetramino.x
    this.y = tetramino.y
    this.tetraminoGrid = tetramino.tetraminoGrid
  }

  toCenter() {
    this.x = Math.round((COLS-this.tetraminoGrid.length)/2)
  }

  getRandomTetrominoType() {
    return Math.floor(Math.random() * AMOUNT_OF_TETRAMINO_TYPE)
  }
  clone() {
    let tetramino = new Tetramino()
    tetramino.type = this.type
    tetramino.tetraminoGrid = JSON.parse(JSON.stringify(this.tetraminoGrid))
    tetramino.x = this.x
    tetramino.y = this.y
    return tetramino
  }

  rotate() {
    for (let y = 0; y < this.tetraminoGrid.length; ++y) {
      for (let x = 0; x < y; ++x) {
        let buf = this.tetraminoGrid[x][y]
        this.tetraminoGrid[x][y] = this.tetraminoGrid[y][x]
        this.tetraminoGrid[y][x] = buf   
      }
    }
    this.tetraminoGrid.forEach((row) => row.reverse())
  }
}
