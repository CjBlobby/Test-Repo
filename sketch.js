var gridsize = 20;


function setup() {
    createCanvas(600, 600);
    frameRate(10);
    textSize(95);
    
    snake = new Snake(10, 10);
    apple = new Apple();
    
    
    }


function draw() {
    background(0);
    
    if (snake.dead()) {
        snake.show();
        
        fill(140);
        text("GAME OVER", 10, 425);
        
        } else {
    
            snake.move();
            snake.grow();
            snake.show();
            apple.show();

        }
    fill(255, 255, 255, 150);
    text(snake.size, 230, 100)
}


class Snake {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //list of all 'cubes' 
        this.bodylist = [[x, y]];
        this.size = 9;
        //direction
        this.dir = [1, 0];
        }
    
    move() {
        this.x = this.x + this.dir[0];
        this.y = this.y + this.dir[1];
        //add new head to list, make old head #2
        this.bodylist.splice(0, 0, [this.x, this.y]);
        
        //delete end of tail to prevent infinite growth
        if (this.bodylist.length > this.size ) {
            this.bodylist.splice(-1, 1);   
        }
    }
        

    grow() {
        //if snake eats apple
        if (this.x == apple.x && this.y == apple.y) {
            this.size++;
            //move the apple until it isn't on the snake
            while (apple.move()){}
        }
    }
    
    show() {
        fill(0, 255, 0);
        //show every 'block' of the snake
        for (var block of this.bodylist) {
            rect(block[0]*gridsize, block[1]*gridsize, gridsize - 1, gridsize - 1);

        }
    }
    
    dead() {
        //off screen horizontal
        if (this.x >= width/gridsize || this.x < 0) {
            return true;
        //off screen vertical
        }else if (this.y >= height/gridsize || this.y < 0) {
            return true;
        }
        
        //Head collides with body
        for (var i = 1; i < this.bodylist.length; i++) {
            if (this.bodylist[i][0] == this.x && this.bodylist[i][1] == this.y) {
                return true;
            }
        }
        return false;
        
    }
    
    }



class Apple {
    
    constructor() {
        this.x = 5;
        this.y = 5;
    }
    
    show() {
        fill(255, 0, 0);
        rect(this.x*gridsize, this.y*gridsize, gridsize - 1, gridsize - 1);
    }
    
    move() {
        
        //random integer coords
        this.x = floor(random(0, width/gridsize));
        this.y = floor(random(0, height/gridsize));
        
        //check if on top of snake
        for (var block of snake.bodylist) {
            if (this.x == block[0] && this.y == block[1]) {
                return true;
            }
        }
    }
    
}




function keyPressed() {
    //direction of snake, can't turn into itself
    
    if(keyCode == UP_ARROW && snake.dir[1] != 1) {
        snake.dir = [0, -1];        
        } else if (keyCode == DOWN_ARROW && snake.dir[1] != -1) {
            snake.dir = [0, 1];
        } else if (keyCode == LEFT_ARROW && snake.dir[0] != 1) {
            snake.dir = [-1, 0];
        } else if (keyCode == RIGHT_ARROW && snake.dir[0] != -1) {
            snake.dir = [1, 0];
        }
    
    }