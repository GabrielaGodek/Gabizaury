import Phaser from 'phaser'

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

        this.cursors = this.scene.input.keyboard.createCursorKeys()
    }
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        
        // console.log(this.cursors)
        const { left, right, up, space } = this.cursors
        if (left.isDown) {
            this.setVelocityX(-this.v);
            this.flipY(true)
        } else if (right.isDown) {
            this.setVelocityX(this.v);
            this.flipY(true)
          } else {
            this.setVelocityX(0);
          }

        // if((up.isDown || space.isDown) && this.player.body.onFloor()){
        //     // this.player.setAccelerationX(this.playerSpeed)
        //     // console.log(this.player.body.blocked.down)
        //     // this.player.body.setGravity(0, -300)
        //     this.player.setVelocityY(-this.g)
        // } else {
        //     // this.player.body.setGravity(0, 300)
        //     this.player.setVelocityY(this.g)
        // }
    }

    // initEvents() {
    //     this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    // }
}

export default Player


