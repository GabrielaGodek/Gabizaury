import Phaser from 'phaser'
import HealthBar from '../components/healthbar'

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
        this.initEvents()
    }


    init() {
        this.g = 500
        this.v = 200

        this.body.setGravityY(this.g);
        this.setCollideWorldBounds(true);

        this.health =  100
        this.healthbar = new HealthBar(
            this.scene,
            0,
            0,
            this.health
        )

        this.cursors = this.scene.input.keyboard.createCursorKeys()
    }
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }
    takeHits (player, damageValue){
        this.health -= damageValue
        // console.log(this.health)
        this.healthbar.takeDamage(this.health)
    }
    update() {
        const { left, right, up, space } = this.cursors
        if (left.isDown) {
            this.setVelocityX(-this.v);
            this.setFlipX(true)
        } else if (right.isDown) {
            this.setVelocityX(this.v);
            this.setFlipX(false)
        } else {
        this.setVelocityX(0);
        }

        if ((space.isDown || up.isDown) && this.body.onFloor()){
            this.setVelocityY(-this.v * 1.75)
        }

    }
    objectsCollider(gameObject, callback) {
        this.scene.physics.add.collider(this, gameObject, callback, null, this)
    }


}

export default Player


