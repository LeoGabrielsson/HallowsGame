import Projectile from "./Projectile"

export default class Super extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.width = 10
        this.height = 5
        this.x = x
        this.y = y
        this.angle = angle

        this.speed = 1000
        this.damage = 10

        this.color = '#33E0FF'
        this.type = 'super'
    }

    update(deltaTime) {
        const velocity = {
            x: this.speed * Math.cos(this.angle),
            y: this.speed * Math.sin(this.angle),
        }

        this.x += velocity.x * (deltaTime / 1000)
        this.y += velocity.y * (deltaTime / 1000)


        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }
    }
}