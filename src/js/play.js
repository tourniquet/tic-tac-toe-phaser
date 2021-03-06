/* globals game */

'use strict'

const playState = {
  create () {
    // set game background image
    game.add.sprite(0, 0, 'level-background')

    // if x <= 5, don't call setO function
    this.x = 0

    // when AI set 'O', player can't set 'X'
    this.playerCanSetX = true

    this.cellWidth = 186
    this.cellHeight = 186

    this.template = this.get2dArray(3, 3, 0)

    this.playerCanSetX ? game.input.onDown.add(this.setX, this) : game.input.onDown.add(this.setO, this)
  },
  // where 'el' is default element which will be filled in every array
  get2dArray (rows, columns, el) {
    return Array(rows).fill().map(() => Array(columns).fill(el))
  },
  // player set X sprite
  setX () {
    // Figure out what position on the grid that translates to
    const cellIndexX = Math.floor(game.input.x / this.cellWidth)
    const cellIndexY = Math.floor(game.input.y / this.cellHeight)

    if (this.playerCanSetX && !this.template[cellIndexY][cellIndexX]) {
      this.template[cellIndexY][cellIndexX] = 'x'
      game.add.image(cellIndexX * this.cellWidth, cellIndexY * this.cellHeight, 'x')

      this.x += 1

      this.checkMatch()

      // AI set 'O'
      if (this.x <= 4) {
        this.setO()
      }
    }
  },
  // very stupid AI
  setO () {
    this.playerCanSetX = false

    let row
    let column

    // return template coordinates
    function randNum () {
      row = Math.floor(Math.random() * 3)
      column = Math.floor(Math.random() * 3)
    }

    randNum()

    while (this.template[row][column]) {
      randNum()
    }

    this.template[row][column] = 'o'
    game.add.image(column * this.cellWidth, row * this.cellHeight, 'o')

    this.checkMatch()

    this.playerCanSetX = true
  },
  // check who win
  checkMatch () {
    // I will use 'board' variable instead of 'this.template' because it's smaller
    let board = this.template

    // check rows
    for (let i = 0, j = 0; i <= 2; i++) {
      if (board[i][j] && board[i][j] === board[i][j + 1] && board[i][j + 1] === board[i][j + 2]) {
        board[i][j] === 'x' ? game.state.start('win') : game.state.start('lose')
      }
    }

    // check columns
    for (let i = 0, j = 0; i <= 2; i++) {
      if (board[j][i] && board[j][i] === board[j + 1][i] && board[j + 1][i] === board[j + 2][i]) {
        board[j][i] === 'x' ? game.state.start('win') : game.state.start('lose')
      }
    }

    // check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      board[0][0] === 'x' ? game.state.start('win') : game.state.start('lose')
    } else if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      board[0][2] === 'x' ? game.state.start('win') : game.state.start('lose')
    }

    // if draw, call draw game state
    if (this.x === 5) {
      game.state.start('draw')
    }
  }
}
