
class Game {

    constructor(){
      this.fields=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
      this.diceThrow= null
      this.currentPosition= 1   
      this.throws=0   
      this.sum=0
    }
    messenger(data){
      return ({
          welcome: 'Hello ! :) To play just press space on you keyboard.',
          throw :`You have rolled ${this.diceThrow}. Press space to roll the dice.`,
          field19: `You have rolled ${this.diceThrow}. Ups...field number 19. You are turning back to field number 11.`,
          tooFar: `You have rolled: ${this.diceThrow}. Field number 20 overstepped by ${data}. You are turning back to field number ${this.currentPosition}.`,
          gameOver: `Ups...You are on field number 12. Game over. Attempts: ${this.throws}. Average roll: ${(this.sum/this.throws).toFixed(2)}.Press space to play again.`,
          victory: `Victory!!!. Attempts: ${this.throws}. Average roll: ${(this.sum/this.throws).toFixed(2)}. Press space to play again.`
      })
    }

    makeBoard(){

      document.querySelector('.board').innerHTML = ""

      this.fields.map((value) => {

        const div = document.createElement('div')
        
        div.classList.add('field') 
        value === 12 || value ===19 ? div.classList.add('bad-field') : null 
        value===20&& div.classList.add('win-field')
        value===this.currentPosition&&div.classList.add('current-position')
        value !== 21 ? div.innerHTML=value : div.innerHTML='...'

        document.querySelector('.board').appendChild(div)

      })
    }

    showMessage(message){
      document.querySelector('.commentator').innerHTML=message
    }

    diceThrower(){

        const num = Math.floor(Math.random()*6+1)
        this.diceThrow = num 
        this.throws++
        this.sum +=num
        this.showMessage(this.messenger().throw)
    }

    whereAmI(){
      this.currentPosition+=this.diceThrow
      this.makeBoard()
    }

    resetGame() {
       this.diceThrow = null
       this.currentPosition = 1
       this.throws = 0
       this.sum = 0
     }

    gameGuard(){
      const position=this.currentPosition

      switch(true){
        case ( position === 20 ): {
          this.showMessage(this.messenger().victory)
          this.resetGame()
          setTimeout(()=>this.makeBoard(),2000)
        }
          break;
        case (position === 19): {
          this.currentPosition=11
          this.showMessage(this.messenger().field19)
          setTimeout(()=>this.makeBoard(),2000)       
        }
          break;
        case (position === 12): {
          this.showMessage(this.messenger().gameOver)
          this.resetGame()
          setTimeout(() => this.makeBoard(), 2000)
        }
          break;
        case (position > 20): {
          document.querySelector('.board').childNodes[20].classList.add('overstepped')
          const num = this.currentPosition - 20
          this.currentPosition = 20 - num
          this.showMessage(this.messenger(num).tooFar)
          setTimeout(()=>this.gameGuard(),2000)
          setTimeout(() => this.makeBoard(), 2000)
        }
          break;
        default: {
          // Do nothing //
        }    
      }
    }
}

const game = new Game()
 
  game.makeBoard()
  game.showMessage(game.messenger().welcome)
  
  window.addEventListener("keypress",(event)=> {
     if(event.key === ' '){
      game.diceThrower()
      game.whereAmI()
      game.gameGuard()
    }
})