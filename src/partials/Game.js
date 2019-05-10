import{SVG_NS, PADDLE_WIDTH, PADDLE_HEIGHT, BOARD_GAP, KEYS, RADIUS} from '../settings';
import Board from './board';
import Paddles from './paddle';
import Ball from './ball';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
   
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    const boardMid = (this.height - PADDLE_HEIGHT) /2;

    this.paddle1 = new Paddles(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, BOARD_GAP, boardMid, KEYS.p1up, KEYS.p1down);
    
    const paddle2Gap = this.width - BOARD_GAP - PADDLE_WIDTH;
    this.paddle2 = new Paddles(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, paddle2Gap, boardMid, KEYS.p2up, KEYS.p2down);

    this.ball = new Ball (this.width, this.height,RADIUS );
    

    

		// Other code goes here...
  }

  render() {
    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", ` 0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
     this.board.render(svg);
     this.paddle1.render(svg);
     this.paddle2.render(svg);
     this.ball.render(svg);

		// More code goes here....
  }
}
