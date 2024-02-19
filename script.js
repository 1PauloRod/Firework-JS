canvas = document.getElementById("canvas");
context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(positionX, positionY, velocityX, velocityY, radius, color){
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.radius = radius;
    this.color = color;
}


class Firework{
    constructor(){
        this.gravity = 0.1;
        this.vetFirework = [];
        this.numFireworks = 15;
        this.numParticles = 150;
        this.createFirework();
    }  

    createFirework(){
        for (let i = 0; i < this.numFireworks; i++){
            var position = {'x':Math.floor(Math.random() * (canvas.width - 100) + 50), 'y':canvas.height};
            var velocity = {'x': Math.random() * 2 - 1, 'y': Math.floor(Math.random() * (14 - 10)) + 10};
            var radius = 3;
            this.vetFirework.push({'position': position, 'velocity': velocity, 'particles': [],'radius': radius});
        }
    }

    createExplosion(){
        for (let i = 0; i < this.numFireworks; i++){
            if (this.vetFirework[i].velocity.y < 0){
                this.vetFirework[i].radius = 0;
                var color = {'R': Math.random() * 255, 'G': Math.random() * 255, 'B': Math.random() * 255};
                for (let j = 0; j < this.numParticles; j++){
                    var angle = Math.random() * (2 * Math.PI);
                    var power = (Math.random() * (5 - 1)) + 1;
                    var particle = new Particle(this.vetFirework[i].position.x, this.vetFirework[i].position.y, power * Math.sin(angle), power * Math.cos(angle), 5, color);
                    this.vetFirework[i].particles.push(particle);
                }
            }else{
                this.vetFirework[i].radius = 5;
            }
        }
    }

    DrawFirework(){
        for (let i = 0; i < this.numFireworks; i++){
            context.fillStyle = "grey";
            context.beginPath();
            context.arc(this.vetFirework[i].position.x, this.vetFirework[i].position.y, this.vetFirework[i].radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
    }

    DrawParticles(posX, posY, radius, R, G, B){
        context.fillStyle = "rgb(" + R + ',' + G + ',' + B + ')';
        context.beginPath();
        context.arc(posX, posY, radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }

    Update(){
        for (let i = 0; i < this.numFireworks; i++){
            this.vetFirework[i].velocity.y -= this.gravity;
            this.vetFirework[i].position.y -= this.vetFirework[i].velocity.y;
            this.vetFirework[i].position.x += this.vetFirework[i].velocity.x;
            
            if (this.vetFirework[i].radius < 1){
                for (let j = 0; j < this.numParticles; j++){
                    this.vetFirework[i].particles[j].velocityY -= this.gravity;
                    this.vetFirework[i].particles[j].positionY -= this.vetFirework[i].particles[j].velocityY;
                    this.vetFirework[i].particles[j].positionX += this.vetFirework[i].particles[j].velocityX;
                    
                    this.DrawParticles(this.vetFirework[i].particles[j].positionX, this.vetFirework[i].particles[j].positionY, 
                        this.vetFirework[i].particles[j].radius, 
                        this.vetFirework[i].particles[j].color.R, this.vetFirework[i].particles[j].color.G, this.vetFirework[i].particles[j].color.B);
                
                        this.vetFirework[i].particles[j].color.R-=0.02;
                        this.vetFirework[i].particles[j].color.G-=0.02;
                        this.vetFirework[i].particles[j].color.B-=0.02;
                }
        }
            
            if (this.vetFirework[i].position.y > canvas.height + 900){
                this.vetFirework[i].position.y = canvas.height + 200;
                this.vetFirework[i].velocity.y = Math.floor(Math.random() * (13 - 10)) + 10;
                this.vetFirework[i].position.x = Math.floor(Math.random() * (canvas.width - 100) + 50);
                this.vetFirework[i].velocity.x = Math.random() * 2 - 1;
                this.vetFirework[i].particles = [];
            }  
        }
        this.createExplosion();
        this.DrawFirework();

        
    }
}

var firework = new Firework();

function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    firework.Update();
    requestAnimationFrame(animate);
    
    
}
animate();