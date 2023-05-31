import Phaser from 'phaser'

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'enemy')
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
    }

    init() {
        this.g = 500
        this.v = 200

        this.body.setGravityY(this.g);
        this.setCollideWorldBounds(true);

        this.setImmovable(true)

    }
    collider(gameObject, callback) {
        this.scene.physics.add.collider(this, gameObject, callback, null, this)
    }
}

export default Enemy


