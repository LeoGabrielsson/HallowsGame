import Inputs from './Inputs.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Candy from './Candy.js'
import Boss from './Boss.js'
import MiniBoss from './MiniBoss.js'
import Mine from './Mine.js'

export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.inputs = new Inputs(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.debug = false
    this.gameTime = 0
    this.score = 0

    //Enemies + spawn
    this.enemies = []
    this.things = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.gameRound = 1
    this.enemiesPerWave = this.gameRound * 2
    this.enemiesSpawned = 0

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
      this.player.update(deltaTime)
      this.inputs.update(deltaTime)
      this.enemiesPerWave = this.gameRound * 2

      //Oob check
      if (this.player.x < 0) {
        this.player.x = 0;
      }
      if (this.player.x + this.player.width > this.width) {
        this.player.x = this.width - this.player.width;
      }
      if (this.player.y < 0) {
        this.player.y = 0;
      }
      if (this.player.y + this.player.height > this.height) {
        this.player.y = this.height - this.player.height;
      }

      //Wave managment
      if (this.enemiesSpawned < this.enemiesPerWave) {
        if (this.enemyTimer > this.enemyInterval) {
          while (this.enemiesSpawned < this.enemiesPerWave) {
            let x = Math.random() < 0.5 ? 0 : this.width + 0.2;
            let y = Math.random() < 0.5 ? 0 : this.height + 0.2;
            if (x === 0) {
              y = Math.random() * this.height;
            } else if (x === this.width) {
              y = Math.random() * this.height;
            } else if (y === 0) {
              x = Math.random() * this.width;
            } else {
              y = Math.random() * this.height;
            }
            this.enemies.push(new Pumpkin(this, x, y));
            this.enemiesSpawned++;
          }
          this.enemyTimer = 0;
          //Boss spawns
          if (this.gameRound % 5 == 0) {
            let x = Math.random() < 0.5 ? 0 : this.width + 0.2;
            let y = Math.random() < 0.5 ? 0 : this.height + 0.2;
            this.enemies.push(new Boss(this, x, y));
          } else if (this.gameRound % 3 == 0) {
            let x = Math.random() < 0.5 ? 0 : this.width + 0.2;
            let y = Math.random() < 0.5 ? 0 : this.height + 0.2;
            this.enemies.push(new MiniBoss(this, x, y));
          }
        } else {
          this.enemyTimer += deltaTime;
        }

      } else {
        if (this.enemies.length === 0) {
          this.startWave()
        }
      }

      this.player.update(deltaTime)

      //Collision
      this.things.forEach((enemy) => {
        enemy.update(this.player)
        if (this.checkCollision(this.player, enemy)) {
          this.player.lives -= enemy.damage
          enemy.markedForDeletion = true
        }

        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.markedForDeletion = true
            projectile.markedForDeletion = true
          }
        })
      })


      this.enemies.forEach((enemy) => {
        enemy.update(this.player)
        if (this.checkCollision(this.player, enemy)) {
          this.player.lives -= enemy.damage
          enemy.markedForDeletion = true
          if (enemy.type === 'candy') {
            this.player.superAmmo += 1
          }
        }


        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            if (enemy.type !== 'candy') {
              enemy.lives -= projectile.damage
              if (enemy.lives < 1) {
                this.score += enemy.worth
                enemy.markedForDeletion = true
                if (enemy.type === 'boss') {
                  this.enemies.push(new Candy(this, enemy.x, enemy.y))
                } else if (enemy.type === 'miniboss') {
                  this.things.push(new Mine(this, enemy.x, enemy.y))
                }
              }
              projectile.markedForDeletion = true
            }
          }
        })
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
      this.things = this.things.filter((enemy) => !enemy.markedForDeletion)
    }
    else {
    }
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.things.forEach((enemy) => {
      enemy.draw(context)
    })
  }

  //Collision rules setup
  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }

  startWave() {
    this.gameRound++
    this.enemiesSpawned = 0
    this.enemyTimer = 0
  }
}
