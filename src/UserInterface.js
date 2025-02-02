export default class UserInterface {
    gameRound
    constructor(game) {
        this.game = game
        this.fontSize = 25
        this.fontFamily = 'Arial'
        this.color = 'white'
    }

    draw(context) {
        context.save()
        context.fillStyle = this.color
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'black'

        context.textAlign = 'left'
        context.font = `${this.fontSize}px ${this.fontFamily}`
        context.fillText(`Lives: ${this.game.player.lives}`, 20, 30)
        context.fillText(`Special Ammo: ${this.game.player.superAmmo}`, 20, 60)
        context.fillText(`Use with "F"`, 20, 90)
        context.fillText(`Score: ${this.game.score}`, 20, 120)
        context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 1125, 30)
        context.fillText(`Round: ${this.game.gameRound}`, 1125, 60)
        context.fillText(`Enemies Left: ${this.game.enemies.length}`, 1050, 90)

        if (!this.game.gameStarted) {
            context.fillStyle = "#5A5A5A"
            context.fillRect(this.game.width / 2 - 600, this.game.height / 2 - 300, 1200, 600)
            context.fillStyle = "white"
            context.shadowColor = 'black'
            context.fillText(
                `Ghoul Hunter Open Alpha`,
                this.game.width / 2 - 150,
                this.game.height / 2 - 250,
            )
            context.fillText(
                `W A S D keys control your character`,
                this.game.width / 2 - 570,
                this.game.height / 4,
            )
            context.fillText(
                `Use your mouse to aim and fire normal rounds`,
                this.game.width / 2 - 570,
                this.game.height / 2 - 130,
            )
            context.fillText(
                `Use F to fire a faster and higher damage round. This costs "Special Ammo"`,
                this.game.width / 2 - 570,
                this.game.height / 2 - 80,
            )
            context.fillText(
                `These boxes grand you one round of Special Ammo =>`,
                this.game.width / 2 - 570,
                this.game.height / 2 + 80,
            )
            context.fillText(
                `Everything else will try to kill you`,
                this.game.width / 2 - 570,
                this.game.height / 2 + 130,
            )
            context.fillStyle = "#ffff00"
            context.fillRect(this.game.width / 2 + 50, this.game.height / 2 + 56, 32, 32)

            context.fillStyle = "white"
            context.fillText(
                `Press E to start`,
                this.game.width / 2 + 420,
                this.game.height / 2 + 280,
            )
        }



        if (this.game.gameOver) {
            context.textAlign = 'center'
            context.font = `50px ${this.fontFamily}`
            context.fillText(
                'Game over',
                this.game.width / 2,
                this.game.height / 2 - 20
            )
        }

        // debug
        if (this.game.debug) {
            context.font = `15px Arial`
            context.textAlign = 'right'
            context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
            context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
            context.fillText(
                `mouseX: ${this.game.inputs.mouseX}`,
                this.game.width - 20,
                75
            )
            context.fillText(
                `mouseY: ${this.game.inputs.mouseY}`,
                this.game.width - 20,
                100
            )
            context.fillText(
                `maxSpeed: ${this.game.player.maxSpeed}`,
                this.game.width - 20,
                125
            )
            context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
        }

        context.restore()
    }
}