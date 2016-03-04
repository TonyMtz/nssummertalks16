/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Hero from '../objects/Hero.js';
import NiceMessage from '../objects/NiceMessage.js';

import endingRoom from '../data/ending.json';

let levels = [
  require('../data/level01.json'),
  require('../data/level02.json'),
  require('../data/level03.json'),
  require('../data/level04.json'),
  require('../data/level05.json'),
  require('../data/level06.json'),
  require('../data/level07.json'),
  require('../data/level08.json'),
  require('../data/level09.json'),
  require('../data/level10.json')
];
let currentLevel;

let map;
let layer;
let player;
let cursors;
let jumpButton;

let niceMessage;

let spikes;
let jumpers;
let coin;
let enemiesGroup;

let audio;

export default class Game extends Phaser.State {

  init() {
    this.game.levelIndex = this.game.levelIndex || 0;

    if (this.game.levelIndex >= levels.length) {
      currentLevel = -1;
    } else {
      currentLevel = levels[this.game.levelIndex];
    }
  }

  preload() {
    let game = this.game;
    if (currentLevel === -1) {
      game.load.tilemap('current_level', null, endingRoom, Phaser.Tilemap.TILED_JSON);
      alert('Did you like this game? Follow me: @_TonyMtz :)');
    } else {
      game.load.tilemap('current_level', null, currentLevel, Phaser.Tilemap.TILED_JSON);
    }
  }

  create() {
    // generate map

    map = this.game.add.tilemap('current_level');
    map.addTilesetImage('summer_spritesheet', 'summer_spritesheet');

    layer = map.createLayer('Ground Layer');
    layer.resizeWorld();

    spikes = map.createLayer('Spikes Layer');
    spikes.resizeWorld();

    jumpers = map.createLayer('Jumpers Layer');
    jumpers.resizeWorld();

    coin = map.createLayer('Coin Layer');
    coin.resizeWorld();

    map.setCollisionBetween(1, 40, true, layer.index, true); // blocks
    map.setCollisionBetween(41, 60, true, spikes.index, true); // spikes
    map.setCollisionBetween(61, 62, true, jumpers.index, true); // jumpers
    map.setCollisionBetween(71, 72, true, jumpers.index, true); // jumpers
    map.setCollisionBetween(93, 104, true, coin.index, true); // coin

    enemiesGroup = this.game.add.group();
    enemiesGroup.enableBody = true;

    map.createFromObjects('Enemies', 82, 'summer_spritesheet', 81, true, false, enemiesGroup);

    enemiesGroup.forEach(function (enemy) {
      this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.facingLeft = true;
      enemy.body.velocity.x -= 80;
    }.bind(this));

    // other stuff

    this.game.physics.arcade.gravity.y = 1000;

    this.createHero();

    cursors = this.game.input.keyboard.createCursorKeys();
    jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    audio = this.game.add.audioSprite('sfx');
  }

  update() {
    this.game.physics.arcade.collide(player, layer);

    this.game.physics.arcade.collide(enemiesGroup, layer, function (enemy) {
      if (enemy.body.onWall() && !enemy.cooldown) {
        if (enemy.facingLeft) {
          enemy.body.velocity.x = 80;
          enemy.facingLeft = false;
        } else {
          enemy.body.velocity.x -= 80;
          enemy.facingLeft = true;
        }

        enemy.cooldown = true;

        this.game.time.events.add(Phaser.Timer.SECOND / 2, function () {
          enemy.cooldown = false;
        }, this);
      }
    }.bind(this));

    this.game.physics.arcade.overlap(player, enemiesGroup, this.killHero, null, this);

    this.game.physics.arcade.collide(player, spikes, this.killHero, null, this);

    this.game.physics.arcade.collide(player, coin, function (player, coin) {
      audio.play('coin');
      player.kill();
      this.game.levelIndex += 1;
      niceMessage = new NiceMessage(this.game, coin.worldX, coin.worldY);
      this.game.time.events.add(Phaser.Timer.SECOND, function () {
        this.state.start('Game');
      }, this);
    }, null, this);

    this.game.physics.arcade.collide(player, jumpers, function (player) {
      player.bigJump = true;
    }, null, this);

    if (cursors.left.isDown) {
      player.moveLeft();
    }
    else if (cursors.right.isDown) {
      player.moveRight();
    }

    if (jumpButton.isDown && player.body.onFloor()) {
      if (player.bigJump) {
        audio.play('bigjump');
      } else {
        audio.play('jump');
      }
      player.jump();
    }
  }

  createHero() {
    player = new Hero(this.game, 2 * 32, 5 * 32);
    this.game.camera.follow(player);
  }

  killHero() {
    audio.play('death');
    player.die();
    this.createHero();
  }

}
