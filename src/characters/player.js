import Phaser from 'phaser'

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

        let keyA, keyS, keyD, keyW
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        // keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // console.log(this.cursors)
    }
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
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
    collider(gameObject, callback) {
        this.scene.physics.add.collider(this, gameObject, callback, null, this)
    }
}

export default Player


