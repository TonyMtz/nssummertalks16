/*
 * The `assets` module
 * ============================================================================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `node_modules/phaser/resources/` directory, for a more complete
 * reference.
 *
 */


export default {

  // - Boot Assets ------------------------------------------------------------
  boot: [
    {
      key: 'informal-penguins',
      type: 'image'
    },

    {
      key: 'progress-bar',
      type: 'image'
    }
  ],

  // - Game assets ------------------------------------------------------------
  game: [

    {
      key: 'summer_spritesheet',
      type: 'spritesheet',
      "frameWidth": 16,
      "frameHeight": 16
    },

    {
      key: 'summer_spritesheet_32',
      url: 'summer_spritesheet.png',
      type: 'spritesheet',
      "frameWidth": 32,
      "frameHeight": 32
    },

    {
      key: 'sfx',
      type: 'audiosprite',
      urls: ['sfx.m4a'],
      jsonURL: 'sfx.json'
    }

    // Example: adding a background music.
    // {
    //   key: 'tune',
    //   type: 'audio',
    //   urls: [ 'tune.oga', 'tune.m4a' ]
    // }

    // Example: adding a audio sprite containing sound effects.
    // {
    //   key: 'sfx',
    //   type: 'audiosprite',
    //   urls: [ 'sfx.m4a' ],
    //   jsonURL: 'sfx.json'
    // }
  ]

};
