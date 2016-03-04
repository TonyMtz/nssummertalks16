/*
 * SplashScreen
 * ============================================================================
 *
 * Shows a busy, decorated image, containing a widget displaying the resource
 * loading progress rate.
 */


class SplashScreen extends Phaser.Group {

  constructor (game) {
    super(game);

    this.classType = Phaser.Image;

    window.a = this.create(game.world.centerX - 100, 50, 'informal-penguins');
    window.b = this.progressBar = this.create(20, 300, 'progress-bar');
  }

}


export default SplashScreen;
