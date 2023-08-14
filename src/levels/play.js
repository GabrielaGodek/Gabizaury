import Phaser from 'phaser';
import Player from '../characters/player'
import Enemy from '../characters/enemy'

class play extends Phaser.Scene {
    constructor(config) {
        super('play')
        this.config = config
    }
    create() {
// silnik regul
        // get necessary layers from tilesheets in json format
        const map = this.make.tilemap({ key: 'map' })
        const tiles_mossy = map.addTilesetImage('mossy', 'tiles_mossy')
        const tiles_mossy_2 = map.addTilesetImage('mossy_2', 'tiles_mossy_2')
        const tiles_decoration = map.addTilesetImage('decoration', 'tiles_decoration')
        const tiles_plants = map.addTilesetImage('plants', 'tiles_plants')
        const tiles_collide = map.addTilesetImage('collide', 'tiles_mossy')
        
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.config.width + this.config.mapOffset, this.config.height)

        // bond layers in useful game objects
        const platform = map.createLayer('platforms', [tiles_mossy, tiles_mossy_2, tiles_decoration, tiles_plants]);
        const collide = map.createLayer('collide', tiles_collide);

        // start & end points from json
        const startPoint = map.getObjectLayer('zones').objects.find(point => point.name === 'start')
        const endPoint = map.getObjectLayer('zones').objects.find(point => point.name === 'end')

        // extract from the object enemy spawns points
        const enemySpawns =  map.getObjectLayer('enemies')


        /**
         * method is called on collide layer of a tilemap.
         * first param represents index of tiles, -1 all tiles in the "collide" layer with index greater than 0 will have collision enabled
         * second param specifies whether the collision property should be set to true (enabled) or false (disabled)
         */
        collide.setCollisionByExclusion(-1, true)

        const player = this.createPlayer(startPoint)
        player.objectsCollider(collide)
                
        this.finishLvl(endPoint, player)
        this.camera(player)
        
        const enemies = this.createEnemy(enemySpawns, collide)
        enemies.forEach(enemy => {
            enemy.objectsCollider(collide)
            player.objectsCollider(enemy, this.playerGotDamage)
        })

    }
    playerGotDamage(player, enemy, damageValue = 200) {
        player.takeHits(player, damageValue)
    }

    createPlayer(startPoint) {
        // create player on starting point marked in tilemap 
        return new Player(this, startPoint.x, startPoint.y).setScale(.2)
    }

    createEnemy(points, edge) {
        return points.objects.map(point => {
            const enemy = new Enemy(this, point.x, point.y).setScale(.08)

            // allowing the enemy to interact with and navigate the platform's boundaries or collision behavior effectively
            enemy.setPlatformEdge(edge)
            return enemy
        })

    }

    camera(player) {
        const { width, height, mapOffset } = this.config

        /**
         * set the boundaries of the physics world in the game. The parameters specify the x, y, width, and height values of the world's bounds.
         */
        this.physics.world.setBounds(0, 0, width + mapOffset, height)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height)

        /**
         * startFollow() method tells the camera to start following the player object, so the camera view will move and track the player's position as they move within the game world
         */
        this.cameras.main.startFollow(player)
    }

    finishLvl(endPoint, player) {
        /**
         * creates an invisible sprite as an endpoint.
         * sets up an overlap callback between the player and the endpoint
         */
        const end = this.physics.add.sprite(endPoint.x, endPoint.y, 'end').setSize(5, this.config.height)
            .setAlpha(0)

        const overlap = this.physics.add.overlap(player, end, () => {
            // Deactivates the overlap collider, prevent the callback function from being invoked multiple times
            overlap.active = false
            window.location.reload();
        })
    }
}

export default play;