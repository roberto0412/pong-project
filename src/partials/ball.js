import { SVG_NS } from "../settings";
import audioFile from '../../public/sounds/pong-01.wav';
import audiofile_2 from '../../public/sounds/error.mp3';
export default class Ball {
    constructor(boardWidth, boardHeight, radius){
        this.boardWidth= boardWidth;
        this.boardHeight= boardHeight;
        this.radius = radius;
        this.direction = 1;
       this.ping = new Audio (audioFile);
       this.pang = new Audio (audiofile_2);
       this.newcolor = 'white';
        this.reset(); 
    }
    
    reset(){
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = 0;
        this.vx = 0;
        while(this.vy == 0){
            this.vy = Math.floor(Math.random() * 10-5);
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }
    wallCollision(){
        const hitsTop = this.y - this.radius <= 0;
        const hitsBottom = this.y + this.radius >= this.boardHeight;
        if (hitsTop || hitsBottom ) {
            this.vy = this.vy * -1;
        }
        
    } 
    
    goalCollision (player1, player2){
        if(this.x <= 0 ){
            player2.increaseScore();
            this.direction = this.direction * -1;
            this.pang.play();
            // this.newcolor = "red";
            if (player2.getScore() >=3) {
                this.newcolor = 'yellow';
            }
            if (player2.getScore() >=4) {
                this.newcolor = '#FF00FF';
            }
            if (player2.getScore() >=5) {
                this.newcolor = '#008000';
            }
            if (player2.getScore() >=6) {
                this.newcolor = '#00FFFF';
            }
            if (player2.getScore() >=7) {
                this.newcolor = '#800080';
            }
            if (player2.getScore() >=8) {
                this.newcolor = '#FA8072';
            }
            if (player2.getScore() >=9) {
                this.newcolor = 'red';
            }
            if (player2.getScore() >=10) {
                this.newcolor = '#800000';
            }
            this.reset();
        } else if (this.x >= this.boardWidth){
            player1.increaseScore();
            this.direction = this.direction *-1;
            this.pang.play();
            if (player1.getScore() >=3) {
                this.newcolor = 'yellow';
            }
            if (player1.getScore() >=4) {
                this.newcolor = '#FF00FF';
            }
            if (player1.getScore() >=5) {
                this.newcolor = '#008000';
            }
            if (player1.getScore() >=6) {
                this.newcolor = '#00FFFF';
            }
            if (player1.getScore() >=7) {
                this.newcolor = '#800080';
            }
            if (player1.getScore() >=8) {
                this.newcolor = '#FA8072';
            }
            if (player1.getScore() >=9) {
                this.newcolor = 'red';
            }
            if (player1.getScore() >=10) {
                this.newcolor = '#800000';
            }
            // this.newcolor = "red";
            this.reset();
        }

    }
    
    
       paddleCollision(player1, player2){
        if (this.vx > 0) {
            
            const p2 = player2.getCoordinates();
            
            
            if (this.x + this.radius >= p2.left &&
                this.x + this.radius <= p2.right &&
                this.y >= p2.top &&
                this.y <= p2.bottom ){
                    this.vx = this.vx * -1;
                    this.ping.play();
                }
                
            } else {
                const p1 = player1.getCoordinates();
                
                
                if (this.x - this.radius <= p1.right &&
                    this.x - this.radius <= p1.left &&
                    this.y >= p1.top &&
                    this.y <= p1.bottom ) {
                        this.vx = this.vx * -1;
                        this.ping.play();
                    }
                    
                    
                }
            }
            
            
            
            render(svg, player1, player2){
                let circle = document.createElementNS(SVG_NS, 'circle');
                circle.setAttributeNS(null, "fill", this.newcolor );
                circle.setAttributeNS(null, "cx", this.x );
                circle.setAttributeNS(null, "cy", this.y );
                circle.setAttributeNS(null, "r", this.radius );
                this.x = this.x + this.vx;
                this.y = this.y + this.vy;
                this.wallCollision();
                this.goalCollision(player1, player2)
                this.paddleCollision(player1, player2);
                svg.appendChild(circle);
                
                
            }
        
        }   