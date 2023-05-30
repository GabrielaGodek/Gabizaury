import Phaser from 'phaser';
import lvl1 from '../levels/lvl1';
import preload from '../levels/preload';
import play from '../levels/play';

const width = 1280;
const height = 700;

const shared_config = {
  width: width,
  height: height,
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