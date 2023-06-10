import Phaser from 'phaser';

class preload extends Phaser.Scene {
    constructor() {
        super('preload')
    }
    preload() {
        // tilemap for lvl1 
        this.load.tilemapTiledJSON('map', '../assets/lvls/lvl1_jungle/lvl1_jungle.json')
        this.load.image('tiles_mossy', '../assets/lvls/lvl1_jungle/lvl1_Mossy.png')
        this.load.image('tiles_mossy_2', '../assets/lvls/lvl1_jungle/lv1_Mossy_2.png')
        this.load.image('tiles_decoration', '../assets/lvls/lvl1_jungle/lvl1_Decoration.png')
        this.load.image('tiles_plants', '../assets/lvls/lvl1_jungle/lvl1_Hanging Plants.png')
        this.load.image('bg', '../assets/lvls/lvl1_jungle/jungle_bg.jpg')

        // player
        this.load.image('player', '../assets/player/player_dino.png')
        // enemy
        this.load.image('enemy', '../assets/player/enemy.png')
    }
    create() {
        /**
         * starts the execution of another scene with the key 'play'. 
         * allows for transitioning from one scene to another.
         */
        this.scene.start('play')
    }
}

export default preload;