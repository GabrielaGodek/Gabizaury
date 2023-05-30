import Phaser from 'phaser';

class preload extends Phaser.Scene {
    constructor() {
        super('preload')
    }
    preload() {
        // tileset for lvl1 
        this.load.tilemapTiledJSON('map', '../assets/lvls/lvl1_jungle/lvl1_jungle.json')
        this.load.image('tiles_mossy', '../assets/lvls/lvl1_jungle/lvl1_Mossy.png')
        this.load.image('tiles_mossy_2', '../assets/lvls/lvl1_jungle/lv1_Mossy_2.png')
        this.load.image('tiles_decoration', '../assets/lvls/lvl1_jungle/lvl1_Decoration.png')
        this.load.image('tiles_plants', '../assets/lvls/lvl1_jungle/lvl1_Hanging Plants.png')

        // player
        this.load.image('player', '../assets/player/player_dino.png')

    }
    create() {
        this.scene.start('play')
    }
}

export default preload;