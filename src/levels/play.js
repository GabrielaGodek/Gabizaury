import Phaser from 'phaser';
import Player from '../characters/player'
import Enemy from '../characters/enemy'

class play extends Phaser.Scene {
    constructor(config) {
        super('play')
        this.config = config
    }
    create() {
        const map = this.make.tilemap({ key: 'map' })
        const tiles_mossy = map.addTilesetImage('mossy', 'tiles_mossy')
        const tiles_mossy_2 = map.addTilesetImage('mossy_2', 'tiles_mossy_2')
        const tiles_decoration = map.addTilesetImage('decoration', 'tiles_decoration')
        const tiles_plants = map.addTilesetImage('plants', 'tiles_plants')
        const tiles_collide = map.addTilesetImage('collide', 'tiles_mossy')

        // start and end points
        const startPoint = map.getObjectLayer('zones').objects.find(point => point.name === 'start')
        const endPoint = map.getObjectLayer('zones').objects.find(point => point.name === 'end')

        const env = map.createStaticLayer('env', [tiles_mossy, tiles_mossy_2, tiles_decoration, tiles_plants]);
        const platform = map.createDynamicLayer('platforms', [tiles_mossy, tiles_mossy_2, tiles_decoration, tiles_plants]);
        const collide = map.createDynamicLayer('collide', tiles_collide);

        const enemySpawns =  map.getObjectLayer('enemies')

        collide.setCollisionByExclusion(-1, true)

        const player = this.createPlayer(startPoint)
        player.collider(collide)

        
        this.finishLvl(endPoint, player)
        this.camera(player)
        
        const enemies = this.createEnemy(enemySpawns)

        enemies.forEach(enemy => {
            enemy.collider(collide)
        })






        
    }
    createPlayer(startPoint) {
        return new Player(this, startPoint.x, startPoint.y).setScale(.2);
    }
    createEnemy(points) {
        return points.objects.map(point => {
            return new Enemy(this, point.x, point.y).setScale(.08);
        })

    }
    camera(player) {
        const { width, height, mapOffset, zoomCamera } = this.config

        this.physics.world.setBounds(0, 0, width + mapOffset, height + 100)

        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomCamera)
        this.cameras.main.startFollow(player)
    }
    finishLvl(endPoint, player) {
        // create phantom object
        const end = this.physics.add.sprite(endPoint.x, endPoint.y, 'end').setSize(5, this.config.height)
            .setAlpha(0)

        const overlap = this.physics.add.overlap(player, end, () => {
            // fnc will invoke every time player .active prevents that
            overlap.active = false
        })
    }
}

export default play;