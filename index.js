
class Game {

    constructor(){
      this.fields=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
      this.diceThrow= null
      this.currentPosition= 0   
      this.throws=0   
      this.sum=0
    }
    
    diceThrower(){

        const num = Math.floor(Math.random()*6+1)
        this.diceThrow = num 
        this.throws++
        this.sum +=num
        console.log(`Wyrzuciłeś ${this.diceThrow}`)
    }
    whereAmI(){
      this.currentPosition+=this.diceThrow
      console.log(`Znajdujesz się na polu o numerze ${this.currentPosition}`)
    }

     calcAverage() {
       return Math.round((this.sum / this.throws) * 100 / 100)
     }
     resetGame() {
       this.diceThrow = null
       this.currentPosition = 0
       this.throws = 0
       this.sum = 0
     }

    gameGuard(){

      const position=this.currentPosition

      switch(true){
        case ( position === 20 ): {
          console.log(`You win! Throws:${this.throws} Scores:${this.calcAverage()}. Press any key to play again.`)
          this.resetGame()
        }
          break;
        case (position === 19): {
          this.currentPosition=11
          console.log(`Ups, wracasz na pole o numerze 11`)
        }
          break;
        case (position === 12): {
          console.log('Game Over. Press any key to play again.')
          this.resetGame()
        }
          break;
        case (position > 20): {
          const num = this.currentPosition - 20
          this.currentPosition = 20 - num
          console.log(`Przekroczyłeś 20 wracasz na pole ${this.currentPosition}`)
        }
          break;
        default: {
          console.log('Throw a dice!')
        }
      }
    }
   
}

const game = new Game()

window.addEventListener("keypress",(event)=> {

  game.diceThrower()
  game.whereAmI()
  game.gameGuard()
})