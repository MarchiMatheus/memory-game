import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
  public cards: Array<{ value: number, show: boolean }> = [];

  private quantityOfCards: number = 20;
  private move: number = 0;
  private totalMoves = 0;
  private righCombinations = 0;
  private firstMovedCard: number = -1;
  private secondMovedCard: number = -1;
  private lockMove = false;

  constructor() { }

  ngOnInit(): void {

    this.newGame();
  }

  // Creates/Resets the game
  public newGame() {

    this.cards = this.generateCards();
    this.move = 1;
    this.totalMoves = 0;
    this.righCombinations = 0;
    this.firstMovedCard = -1;
    this.secondMovedCard = -1;
    this.lockMove = false;
  }

  // Generate the cards object array
  public generateCards() {

    let value = 1;
    let generatedCards: Array<{ value: number, show: boolean }> = [];

    while (generatedCards.length < this.quantityOfCards) {

      let objOne = {
        value: value,
        show: false
      }

      let objTwo = {
        value: value,
        show: false
      }

      generatedCards.push(objOne);
      generatedCards.push(objTwo);

      value += 1;
    }

    return this.shuffleCards(generatedCards);
  }

  // Shuffles the cards
  private shuffleCards(cards: Array<{ value: number, show: boolean }>) {

    var currentIndex = cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    return cards;
  }

  // Makes a player move
  public makeMove(index: number) {

    //If not clicked yet
    if (!this.cards[index].show && !this.lockMove) {

      this.setClickedCard(index);

      this.cards[index].show = true;

      this.checkCards();

      this.move += 1;
      this.resetsMove();

      this.endGame();
    }
  }

  // Set variables for the clicked cards
  private setClickedCard(index: number) {

    //Sets the firt move card
    if (this.move == 1)
      this.firstMovedCard = index;

    //Sets the second move card
    else if (this.move = 2)
      this.secondMovedCard = index;
  }

  // Resets user moves
  private resetsMove() {

    //Resets move
    if (this.move == 3) {
      
      this.move = 1;
      this.totalMoves += 1;
    }
  }

  // Check if cards match or not
  private async checkCards() {

    let firstCard = this.cards[this.firstMovedCard].value;
    let secondCard = this.cards[this.secondMovedCard].value;

    if (firstCard != secondCard) {

      this.lockMove = true;
      await this.delay(1000);

      this.cards[this.firstMovedCard].show = false;
      this.cards[this.secondMovedCard].show = false;

      this.firstMovedCard = -1;
      this.secondMovedCard = -1;
    }

    else if (firstCard == secondCard) {

      this.firstMovedCard = -1;
      this.secondMovedCard = -1;

      this.righCombinations += 1;
    }

    this.lockMove = false;
  }

  // Makes the user wait before continue playing
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Ends the game
  private endGame() {

    if ((this.righCombinations * 2) == this.quantityOfCards)
      alert('Parabéns!  Você terminou o jogo em ' + this.totalMoves + ' movimentos!');
  }
}