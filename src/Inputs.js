export default class InputHandler {
    constructor(game) {
        this.game = game
        this.mouseX = 0
        this.mouseY = 0
        this.mouseDown = false
        this.shootTimer = 0.5

        window.addEventListener('keydown', (event) => {
            if (
                (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight' ||
                    event.key === 'w' ||
                    event.key === 'a' ||
                    event.key === 's' ||
                    event.key === 'd') &&
                this.game.keys.indexOf(event.key) === -1
            ) {
                this.game.keys.push(event.key)
            }

            if (event.key === 'b') {
                this.game.debug = !this.game.debug
            }
        })

        window.addEventListener('keyup', (event) => {
            if (this.game.keys.indexOf(event.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
            }
        })

        window.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX - this.game.canvasPosition.left
            this.mouseY = event.clientY - this.game.canvasPosition.top
        })

        window.addEventListener('mousedown', (event) => {
            this.mouseDown = true
        })
        window.addEventListener('mouseup', (event) => {
            this.mouseDown = false
        })
    }
    update(deltaTime) {
        if (this.shootTimer > 0) {
            this.shootTimer -= deltaTime
        }
        while (this.shootTimer <= 0 && this.mouseDown == true) {
            this.game.player.shoot(this.mouseX, this.mouseY)
            this.shootTimer = 200
        }

    }
}