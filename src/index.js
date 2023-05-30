import Phaser from 'phaser';
import lvl1 from '../levels/lvl1';
import preload from '../levels/preload';
import play from '../levels/play';

const mapWidth = 1600


const width = document.body.offsetWidth
const height = 700

const shared_config = {
  mapOffset: mapWidth > width ? mapWidth - width : 0,
  width: width,
  height: height,
  zoomCamera: 1.3,
}

const scenes = [preload, play];
const createScene = scene => new scene(shared_config)
const initScenes = () => scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...shared_config,
  pixelArt: true,
  backgroundColor: '#3a5f4e',
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);