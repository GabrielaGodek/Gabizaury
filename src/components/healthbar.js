import Phaser from 'phaser'

class healthbar {
    constructor(scene, x, y, health) {
        // create visual graphical object
        this.bar = new Phaser.GameObjects.Graphics(scene)

        /**
         * first param - scroll X - horizontal scroll factor,
         * second param - scroll Y - vertical scroll factor,
         * value of 1 means the object moves at the same speed as the camera, while a value of 0 means the object remains stationary relative to the camera's movement
         */
        this.bar.setScrollFactor(0, 0)

        this.x = x
        this.y = y
        this.health = health 
        this.healthbar_config = {
            w: 250,
            h: 10,
            x: 10,
            y: 10
        }

        this.pxPerHealth = this.healthbar_config.w / this.health
        scene.add.existing(this.bar)
        // display first healthbar with full health
        this.displayHealthbar(this.healthbar_config.x, this.healthbar_config.y)
    }
    takeDamage(value) {
        this.health = value
        this.displayHealthbar(this.healthbar_config.x, this.healthbar_config.y)
    }
    displayHealthbar (x, y) {
        const { w, h } = this.healthbar_config
        // removes existing healthbar 
        this.bar.clear()

        // new health value after player take a hit
        const hp = Math.floor(this.health * this.pxPerHealth)
        
        // set the white color of rectangle
        this.bar.fillStyle(0xffffff)
        //draw a filled rectangle
        this.bar.fillRect(x, y, w, h)

        // set the light green color of overlapping rectangle
        this.bar.fillStyle(0x00ff00)
        this.bar.fillRect(x, y, hp, h)
        
    }
}

export default healthbar