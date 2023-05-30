import Phaser from 'phaser';
import Player from '../player'

class play extends Phaser.Scene {
    constructor() {
        super('play')
    }
    create() {
        const map = this.make.tilemap({key: 'map'})
        const tiles_mossy = map.addTilesetImage('mossy', 'tiles_mossy')
        const tiles_mossy_2 = map.addTilesetImage('mossy_2', 'tiles_mossy_2')
        const tiles_decoration = map.addTilesetImage('decoration', 'tiles_decoration')
        const tiles_plants = map.addTilesetImage('plants', 'tiles_plants')
        const tiles_collide = map.addTilesetImage('collide', 'tiles_mossy')

        

        const env = map.createStaticLayer('env', [tiles_mossy, tiles_mossy_2, tiles_decoration, tiles_plants]);
        const platform = map.createDynamicLayer('platforms', [tiles_mossy, tiles_mossy_2, tiles_decoration, tiles_plants]);
        const collide = map.createDynamicLayer('collide', tiles_collide);
        collide.setCollisionByExclusion(-1, true)
    
        const player = this.createPlayer()
        this.physics.add.collider(player, collide)
        


        // this.init()
        // this.initEvents()
    
    }
   createPlayer() {
        return new Player(this, 100, 550).setScale(.15);
   }

    update() {
        
    }
}

export default play;