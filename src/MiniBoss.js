import Enemy from './Enemy.js'

export default class MiniBoss extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 20
        this.height = 20
        this.x = x
        this.y = y
        this.speed = 3
        this.lives = 5
        this.damage = 2
        this.worth = 25
        this.color = 'lightgreen'
        this.type = 'miniboss'
    }

    update(player) {
        const dx = player.x - this.x // calculate the x distance to the player
        const dy = player.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        this.x += speedX // move the enemy towards the player on the x axis
        this.y += speedY // move the enemy towards the player on the y axis
    }
}