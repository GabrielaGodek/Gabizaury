import Phaser from 'phaser'

class healthbar {
    constructor(scene, x, y, health) {
        this.bar = new Phaser.GameObjects.Graphics(scene)

        // object will follow the camera
        this.bar.setScrollFactor(0, 0)

        this.x = x
        this.y = y
        this.health = health 
        this.size = {
            w: 200,
            h: 10
        }

        this.pxPerHealth = this.size.w / this.health
        scene.add.existing(this.bar)
        this.displayHealthbar(10, 10)
    }
    takeDamage(value) {
        this.health = value
        this.displayHealthbar(this.x, this.y)
    }
    displayHealthbar (x, y) {
        const { w, h } = this.size
        this.bar.clear()

        const hp = Math.floor(this.health * this.pxPerHealth)
        this.bar.fillStyle(0xffffff)
        this.bar.fillRect(x, y, w, h)
        
        this.bar.fillStyle(0x00ff00)
        this.bar.fillRect(x, y, hp, h)
        
    }
}

export default healthbar