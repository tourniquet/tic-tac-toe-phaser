/* globals game */

'use strict'

const loseState = {
  create () {
    game.stage.backgroundColor = '#000000'

    // display won message
    const loseMessage = game.add.text(
      game.world.centerX, 200, 'Loser, you play like my dead cat!',
      { font: '50px Arial', fill: '#ffffff' }
    )
    loseMessage.anchor.setTo(0.5, 0.5)

    // explain how to start the game
    const startGame = game.add.text(
      game.world.centerX, 250, 'click to start',
      { font: '20px Arial', fill: '#ffffff' }
    )
    startGame.anchor.setTo(0.5, 0.5)

    // start game on click
    game.input.onDown.add(this.startGame, this)
  },
  startGame () {
    game.state.start('play')
  }
}
