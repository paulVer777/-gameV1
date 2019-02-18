
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
          throw :`Wyrzuciłeś ${this.diceThrow}. Press space to throw a dice.`,
          field19: `Wyrzucono ${this.diceThrow}. Ups...pole numer 19. Wracasz do pola 11.`,
          tooFar: `Wyrzucono: ${this.diceThrow}. Przekroczyłeś pole 20 o ${data}. Wracasz na pole ${this.currentPosition}.`,
          gameOver: 'Ups pole 12. Game over. Press space to play again.',
          victory: `Victory. Próby: ${this.throws}. Średnia: ${this.sum/this.throws}. Press space to play again.`
      })
    }

    makeBoard(){

      document.querySelector('.board').innerHTML = ""

      this.fields.map((value,index) => {

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
      setTimeout(() => this.makeBoard(), 500)
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

          // document.querySelector('.board').childNodes[20].classList.add('happy')

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
          const num = this.currentPosition - 20
          this.currentPosition = 20 - num
          this.showMessage(this.messenger(num).tooFar)
          setTimeout(()=>this.gameGuard(),2000)
          setTimeout(() => this.makeBoard(), 2000)
        }
          break;
        default: {
          // this.showMessage(this.messenger().throw)
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