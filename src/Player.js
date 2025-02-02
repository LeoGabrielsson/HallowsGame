import Projectile from './Projectile.js'
import Super from './Super.js'

export default class Player {
    constructor(game) {
        this.game = game
        this.width = 30
        this.height = 60
        this.x = this.game.width / 2 - this.width / 2
        this.y = this.game.height / 2 - this.height / 2

        this.projectiles = []

        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 1.5

        this.lives = 3
        this.superAmmo = 0

        this.color = '#0d407f'
    }

    update(deltaTime) {
        if (this.lives <= 0) {
            this.game.score += (this.superAmmo * 50)
            this.game.score += (this.game.things.length * 250)
            this.superAmmo = 0
            this.game.gameOver = true
        }

        if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
            this.speedX = -this.maxSpeed
        } else if (
            this.game.keys.includes('ArrowRight') ||
            this.game.keys.includes('d')
        ) {
            this.speedX = this.maxSpeed
        } else {
            this.speedX = 0
        }

        if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) {
            this.speedY = -this.maxSpeed
        } else if (
            this.game.keys.includes('ArrowDown') ||
            this.game.keys.includes('s')
        ) {
            this.speedY = this.maxSpeed
        } else {
            this.speedY = 0
        }

        this.y += this.speedY
        this.x += this.speedX

        //Projectiles
        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime)
        })
        this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
        )
    }

    draw(context) {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
        if (this.game.debug) {
            context.strokeStyle = '#000'
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.lineWidth = 1
            context.beginPath()
            const dx = this.game.inputs.mouseX - (this.x + this.width / 2)
            const dy = this.game.inputs.mouseY - (this.y + this.height / 2)
            const maxLength = 60
            const angle = Math.atan2(dy, dx)
            const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
            const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
            context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
            context.lineTo(x, y)
            context.stroke()
        }

        this.projectiles.forEach((projectile) => {
            projectile.draw(context)
        })
    }

    shoot(mouseX, mouseY) {
        const angle = Math.atan2(
            mouseY - (this.y + this.height / 2),
            mouseX - (this.x + this.width / 2)
        )

        this.projectiles.push(
            new Projectile(
                this.game,
                this.x + this.width / 2,
                this.y + this.height / 2,
                angle
            )
        )
    }

    super(mouseX, mouseY) {
        const angle = Math.atan2(
            mouseY - (this.y + this.height / 2),
            mouseX - (this.x + this.width / 2)
        )

        this.projectiles.push(
            new Super(
                this.game,
                this.x + this.width / 2,
                this.y + this.height / 2,
                angle
            )
        )
    }
}