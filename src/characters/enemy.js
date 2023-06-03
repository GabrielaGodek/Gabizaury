import Phaser from 'phaser'

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.init()
    }

    init() {
        this.g = 500
        this.v = 50

        this.edge = null
        this.rayBeam = this.scene.add.graphics({
            lineStyle: {
                width: 2,
                color: 0
            }
        })

        this.body.setGravityY(this.g)
        this.setSize(250, 250).setOffset(500, 500).setOrigin(.5, 1);
        this.setVelocityX(this.v)
        this.setCollideWorldBounds(true);

        this.setImmovable(true)

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    collider(gameObject, callback) {
        this.scene.physics.add.collider(this, gameObject, callback, null, this)
    }
    setPlatformEdge(edge) {
        this.edge = edge
    }
    update() {
        const { ray, ifReachedEdge } = this.raycasting(this.body, this.edge, 30, 1)

        if(!ifReachedEdge) {
            this.setFlipX(!this.flipX)
            this.setVelocityX(this.v = -this.v)
        }

        this.rayBeam.clear()
        this.rayBeam.strokeLineShape(ray)

    }

    /*
    Raycasting is a technique commonly used in game development to simulate the behavior of rays or beams of light and to determine what objects or surfaces they intersect with in a game environment. It involves casting virtual rays from a specific point in a given direction and then detecting any collisions or intersections with objects in the scene.
    
    Raycasting can be used to check for collisions between the ray and game objects such as walls, floors, or other entities. This information is useful for implementing features like shooting mechanics, line-of-sight calculations, or detecting object interactions.

    By casting rays from the player's perspective, raycasting can help determine which objects or areas are visible or obstructed. This is particularly useful for implementing visibility calculations, fog of war, or AI behaviors based on line-of-sight.
    
    Raycasting can also be used for physics simulations, such as detecting intersections between rays and dynamic objects like projectiles or moving platforms. This information can be used to calculate reflections, refractions, or other interactions.

    Some rendering techniques, like ray tracing or ray marching, rely on casting rays into a scene to simulate realistic lighting and reflections.
    */
    bodyPositionDifferenceX = 0
    prevRay = null
    prevHit = null

    // bodyPositionDifferenceX: 0,
    // prevRay: null,
    // prevHasHit: null,
    
    raycasting(body, edge, len = 30, precision = 0) {
        const { x, y, width, halfHeight } = body
        
        this.bodyPositionDifferenceX += body.prev.x
        if ((Math.abs(this.bodyPositionDifferenceX) <= precision) && this.prevHit !== null) {
            return {
                ray: this.prevRay,
                ifReachedEdge: this.prevHit
            }
        }
        
        let ifReachedEdge = false
        const line = new Phaser.Geom.Line()

        if(body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
            line.x1 = x + width
            line.y1 = y + halfHeight
            line.x2 = line.x1 + len
            line.y2 = line.y1 + len
        } else if(body.facing === Phaser.Physics.Arcade.FACING_LEFT) {
            line.x1 = x
            line.y1 = y + halfHeight
            line.x2 = line.x1 - len
            line.y2 = line.y1 + len
        }

        const hits = edge.getTilesWithinShape(line)
        if(hits.length > 0){

            /*
                some() method checks if at least one element in an array satisfies a given
                condition, and it returns true 
            */
           
            ifReachedEdge = this.prevHit = hits.some(hit => hit.index !== -1)
        }

        this.prevRay = line;
        this.bodyPositionDifferenceX = 0;

        return { ray: line, ifReachedEdge }
    }
}

export default Enemy


