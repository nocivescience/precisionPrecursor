const game = document.getElementById('game');
const ctx = game.getContext('2d');
const image1 = new Image();
image1.src = "./assets/mono1.png";
const image2 = new Image();
image2.src = "./assets/mono2.png";
const imagenes = [image1, image2];

let keys = {};
let obstacles = [];
let score, scoreText, highscore, highscoreText, player, gravity, gameSpeed;

document.addEventListener('keydown', function(evt) {
    keys[evt.code] = true;
});
 document.addEventListener('keyup', function(evt) {
    keys[evt.code] = false;
})

class Player {
    constructor(x, y, images){
        this.x = x;
        this.y = y;
        this.images = images;
        this.currentIndex = 0;
    }
    draw(){
        ctx.clearRect(0, 0, game.width, game.height);
        ctx.drawImage(this.images[this.currentIndex], this.x, this.y, 100, 100);
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        setInterval(() => this.draw(), 100);
    }
}
Promise.all([image1, image2].map(image => new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
})))
.then(() => {
    const jugador = new Player(50, 50, imagenes);
    jugador.draw();
})
.catch(error => {
    console.error("Error al cargar las imágenes:", error);
});