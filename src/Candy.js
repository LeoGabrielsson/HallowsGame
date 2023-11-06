import Enemy from './Enemy'

export default class Candy extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 32
        this.height = 32
        this.x = x
        this.y = y
        this.lives = 1
        this.color = '#ffff00'
        this.type = 'candy'
    }
}