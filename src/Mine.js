import Enemy from './Enemy'

export default class Mine extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 5
        this.height = 5
        this.x = x
        this.y = y
        this.lives = 1
        this.damage = 7380085
        this.color = '#FF0101'
        this.type = 'Mine'
    }
}