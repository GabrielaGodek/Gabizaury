import Phaser from 'phaser'
import HealthBar from '../components/healthbar'

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
    }


    init() {
        this.g = 500
        this.v = 200

        this.body.setGravityY(this.g);
        this.setCollideWorldBounds(true);

        this.health =  100
        this.healthbar = new HealthBar(this.scene, 0, 0, this.health)


        /**
         * create an object that represents the keyboard arrow keys as input controls
         * this.scene refers to the current scene where this code is executed]
         * handles user input events
         * createCursorKeys() is a method provided by the keyboard module to create an object that represents the arrow keys on the keyboard
         */
        this.cursors = this.scene.input.keyboard.createCursorKeys()

        /**
         * register a callback function that will be called on every update cycle of the scene
         * this.scene.events - refers to the event emitter of the scene
         * @param {} Phaser.Scenes.Events.UPDATE - represents the "update" event of a scene
         * @param {} this.update - refers to the callback function that will be executed when the "update" event is triggered
         * @param {global object} this - refers to the current scene object
         */
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }
    takeHits (player, damageValue){
        this.health -= damageValue
        if(this.health > 0){
            this.healthbar.takeDamage(this.health)
        } else {
            window.location.reload();
        }
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
        /**
         * this.scene.physics - refers to the physics manager of the scene, which handles physics-related operations and collisions
         * add.collider - method provided by the physics manager to create a collider between two game objects
         * @param {global object} this - represents the first game object involved in the collision
         * @param {object} gameObject - represents the second game object involved in the collision
         * @param {function} callback - function that will be called when the collision occurs between the two game objects
         * @param {object} null - no additional parameters passed to the callback function
         * @param {global object} this - refers to the current scene object
         */
        this.scene.physics.add.collider(this, gameObject, callback, null, this)
    }


}

export default Player


