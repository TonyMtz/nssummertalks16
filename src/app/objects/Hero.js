/*
 * Hero
 * ============================================================================
 *
 * playable object
 */

let onKillEmitter;

class Hero extends Phaser.Sprite {

  constructor(game, ...args) {
    super(game, ... args, 'summer_spritesheet', 80);

    game.add.existing(this);

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.bringToTop();
  }

  update() {
    if (this.body.velocity.x > 0) {
      this.body.velocity.x -= 20;
    } else if (this.body.velocity.x < 0) {
      this.body.velocity.x += 20;
    }
  }

  moveLeft() {
    this.body.velocity.x = -160;
  }

  moveRight() {
    this.body.velocity.x = +160;
  }

  jump() {
    if (this.bigJump) {
      this.body.velocity.y = -500;
      this.bigJump = false;
    } else {
      this.body.velocity.y = -350;
    }
  }

  die() {
    // killEmitter
    onKillEmitter = this.game.add.emitter(this.x, this.y);
    onKillEmitter.makeParticles('summer_spritesheet', 80);
    onKillEmitter.gravity = 0;
    onKillEmitter.setScale(1, 0.1, 0.8, 0.1, 500);
    onKillEmitter.start(true, 300, null, 5);

    this.kill();
  }

}


export default Hero;
