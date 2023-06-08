import Phaser from 'phaser';
import preload from './levels/preload';
import play from './levels/play';

const mapWidth = 1600
const width = document.body.offsetWidth
const height = 700

const shared_config = {
  mapOffset: mapWidth > width ? mapWidth - width : 0,
  width: width,
  height: height,
}

const scenes = [preload, play];
const createScene = scene => new scene(shared_config)
const initScenes = () => scenes.map(createScene)

const config = {
  /**
    Checks if the browser supports WebGL rendering and falls back to Canvas rendering if WebGL is not supported
    WebGL - rendering utilizes the power of the GPU, which generally provides better performance and advanced graphical features
    Canvas - rendering can be slower compared to WebGL but provides wider compatibility
  */
  type: Phaser.AUTO,
  ...shared_config,
  backgroundColor: '#3a5f4e',
  physics: {
    /**
      default physics engine, handles collisions, overlapping, gravity, movement, tilemap collisions
     */
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);