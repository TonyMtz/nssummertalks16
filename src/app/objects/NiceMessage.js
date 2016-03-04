/*
 * NiceMessage
 */


class NiceMessage extends Phaser.Sprite {

  constructor (game, ... args) {
    super(game, ... args, 'summer_spritesheet_32', 16);
    game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
  }

}


export default NiceMessage;
