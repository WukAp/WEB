const COLS = 10
const ROWS = 20
const SCALE = 35
const AMOUNT_OF_TETRAMINO_TYPE = 7
const SCORE_PER_LEVEL = 500
const TETRAMINO_COLOR = 'black'

const TETRAMINO_HINT_COLOR = 'rgba(0, 0, 0, 0.3)'
const MAX_SPEED = 10
const MIN_SPEED = 40

const POINTS_PER_LINE = 100
const DEFAULT_NAME = "player"
const audio = new Audio("../sounds/tetris.mp3")
const TETRAMINOS = [
  [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false],
  ],

  [
    [true, false, false],
    [true, true, true],
    [false, false, false],
  ],

  [
    [false, false, true],
    [true, true, true],
    [false, false, false],
  ],

  [
    [true, true],
    [true, true],
  ],

  [
    [false, true, false],
    [true, true, true],
    [false, false, false],
  ],

  [
    [true, true, false],
    [false, true, true],
    [false, false, false],
  ],

  [
    [false, true, true],
    [true, true, false],
    [false, false, false],
  ],
]

const KEY = {
  SPACE: 32,
  ENTR: 13,
  UP: 38,
  RIGHT: 39,
  LEFT: 37,
  DOWN: 40,
}

const MAIN_CANVAS = {
  CTX: document.getElementById("main-board").getContext("2d"),
  HEIGHT: ROWS * SCALE,
  WIDTH: COLS * SCALE,
}
const NEXT_CANVAS = {
  CTX: document.getElementById("next-board").getContext("2d"),
  HEIGHT: 4 * SCALE,
  WIDTH: 4 * SCALE,
}
const score = document.getElementById("score")
const level = document.getElementById("level")
const speed = document.getElementById("speed")
const toNumber = (element) => Number(element.textContent)
const START_BUTTON =  document.getElementById("play_button")
const INPUT_NAME_BUTTON =  document.getElementById("input_name_button")
const DIALOG_NAME = document.getElementById('name_input_dialog')
const DIALOG_SCORE = document.getElementById('score_dialog')
const INPUT_NAME_TEXT = document.getElementById('input_name_text')
const RECORD_TABLE = document.getElementById('record_table')
const CLOSE_SCORE_DIALOG_BUTTON =  document.getElementById("close_score_dialog_button")
const CHANGE_NAME_SCORE_DIALOG_BUTTON =  document.getElementById("change_name_score_dialog_button")
const USER_NAME_TEXT = document.getElementById('user_name')
const HEADING = document.getElementById('heading')