canvas = document.querySelector("canvas");
canvas.width = 750//window.innerWidth;
canvas.height = 500//window.innerHeight;
ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
canvas.addEventListener("mousedown",click,false)
function click(event){
    cx = (event.pageX)-(window.innerWidth-canvas.width)/2;
    cy = (event.pageY)-25;
    for(b=0;b<circles.length;b++){
        circles[b].clicked();
    }
}

function Circle(){

    this.draw = function(){
        this.circleRadius = startingCircleRadius
        this.x = (Math.floor(Math.random()*(canvas.width-this.circleRadius*2)))+this.circleRadius
        this.y = (Math.floor(Math.random()*(canvas.height-this.circleRadius*2)))+this.circleRadius
        this.xvel = Math.random()*(velocityRange*2)-velocityRange
        this.yvel = Math.random()*(velocityRange*2)-velocityRange
        this.circleType = 0
        this.alive = true
        this.timer = 0;
        this.colfor = "Black";
    }
    
    this.clicked = function(){
        
        if (Math.abs(this.y-cy)<=this.circleRadius && Math.abs(this.x-cx)<=this.circleRadius && this.alive == true && gameOver==false){
            if(this.circleType == 0){
            this.color = "rgb(189,228,255)"
            score = score+1
            this.alive = false
            this.timer = 0
            timerVelocity = Math.sqrt(score)/1500
            }
            else if(this.circleType == 1){
                gameOver = true;
            }
        }
    }
    
    this.move = function(){
        if (gameOver == true){
            ctx.font = "200px Arial";
            ctx.fillStyle = 'white';
            ctx.fillText(score, 10, 220); 
            ctx.font = "50px Arial";
            ctx.fillStyle = 'white';
            ctx.fillText("Game Over!", 10, 55);
        }
        else{
            this.x = this.x+this.xvel
            this.y = this.y+this.yvel
            this.timer = this.timer + timerVelocity;
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.circleRadius,0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "rgb(0,165,255)";
            ctx.lineWidth = 10;
            ctx.arc(this.x, this.y, this.circleRadius-5,0, Math.PI*2*this.timer);
            ctx.stroke();
            ctx.font = "200px Arial";
            ctx.fillStyle = 'white'
            ctx.fillText(score, 10, 175);  
            
            if (this.circleType == 0 && this.alive==true){
                this.color = "rgb(76,192,255)"
            }
            else if (this.circleType == 1 && this.alive==true){
                this.color = "rgb(249, 64, 64)"
            }
            
            else if (this.alive == false){
                this.color = "rgb(189,228,255)"
            }
            
            if(this.alive == true && this.timer >= 1 && this.circleType == 0){ 
                gameOver= true;
            }
            else if(this.alive == true && this.timer >= 1 && this.circleType == 1){
                score = score+1
                this.alive = false
                this.timer = 0
                timerVelocity = Math.sqrt(score)/1500
            }
            

            if (this.alive == false && this.circleRadius>= deathCircleRadius){
                this.circleRadius = this.circleRadius-2
            }
            else if (this.alive == true && this.circleRadius<=startingCircleRadius){
                this.circleRadius = this.circleRadius+2
            }

            if(this.timer >= 1 && this.alive == false){
                this.alive = true;
                this.timer = 0
                this.circleType = Math.floor(Math.random()*4)
                if (this.circleType < 3){
                    this.circleType = 0
                }
                else if (this.circleType == 3){
                    this.circleType = 1
                }
            }

            if (this.x >= canvas.width-this.circleRadius){
                this.xvel = -Math.abs(this.xvel);
            }
            else if (this.y >= canvas.height-this.circleRadius){
                this.yvel = -Math.abs(this.yvel);
            }
            else if (this.x <= 0+this.circleRadius){
                this.xvel = Math.abs(this.xvel);
            }
            else if(this.y <= 0+this.circleRadius){
                this.yvel = Math.abs(this.yvel);
            }
            
            if (this.x >= canvas.width){
                this.x = canvas.width/2
            }
            else if (this.y >= canvas.height){
                this.y = canvas.height/2
            }
            else if (this.x <= 0){
                this.x = canvas.width/2
            }
            else if(this.y <= 0){
                this.y = canvas.height/2
            }
            for(a=0;a<totalCircles;a++){
                if(a != i){
                    distance = Math.sqrt(Math.abs(this.x-circles[a].x)*Math.abs(this.x-circles[a].x)+Math.abs(this.y-circles[a].y)*Math.abs(this.y-circles[a].y))
                    if (distance <= this.circleRadius+circles[a].circleRadius){
                        overlap = circles[a].circleRadius+this.circleRadius-distance
                        xDistance = Math.abs(this.x-circles[a].x)
                        yDistance = Math.abs(this.y-circles[a].y)
                        percentOverlap = overlap/distance
                        if(this.x<=circles[a].x){
                            this.x = this.x - xDistance*percentOverlap
                            circles[a].x = circles[a].x + xDistance*percentOverlap
                        }
                        if(this.x>circles[a].x){
                            this.x = this.x + xDistance*percentOverlap
                            circles[a].x = circles[a].x - xDistance*percentOverlap
                        }
                        if(this.y<=circles[a].y){
                            this.y = this.y - yDistance*percentOverlap
                            circles[a].y = circles[a].y + yDistance*percentOverlap
                        }
                        if(this.y>circles[a].y){
                            this.y = this.y + yDistance*percentOverlap
                            circles[a].y = circles[a].y - yDistance*percentOverlap
                        }

                    }
                }
            }
        }
    }
}

function init(){
    circles = [];
    typesOfCircles = ["red","blue"]
    deathCircleRadius=40;
    totalCircles = 10;
    velocityRange = 3;
    score = 0;
    gameOver = false;
    timerVelocity = Math.sqrt(score)/1500
    ;
    startingCircleRadius = 50;
    for(i=0;i<totalCircles;i++){
        circles.push(new Circle);
        console.log(circles[i]);
        circles[i].draw();
    }
}
init()

function run(){
    ctx.beginPath();
    ctx.fillStyle="rgb(61, 61, 61)";
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill()
    for(i=0;i<circles.length;i++){
        circles[i].move();
    }
}

function animate(){
    run();
    requestAnimationFrame(animate);
}

animate()