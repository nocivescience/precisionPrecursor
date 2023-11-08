const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const image1 = new Image();
image1.src = "./assets/mono1.png";
const image2 = new Image();
image2.src = "./assets/mono2.png";
const imagenes = [image1, image2];

// variables
let score, scoreText, highscore, highscoreText, player, gravity, gameSpeed;
let keys = {};
let obstacles = [];

// event listeners
document.addEventListener('keydown', function(evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function(evt) {
    keys[evt.code] = false;
});

class Player {
    constructor(x, y, images){
        this.x = x;
        this.y = y;
        this.images = images;
        this.currentIndex = 0;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.images[this.currentIndex], this.x, this.y, 100, 100);

        // Cambiar al siguiente índice de imagen (0 o 1) para la siguiente llamada a draw
        this.currentIndex = (this.currentIndex + 1) % this.images.length;

        // Llamar al método draw en el próximo fotograma de animación
        requestAnimationFrame(() => this.draw());
    }
}

// Esperar a que las imágenes se carguen antes de crear al jugador y llamar a draw
Promise.all([image1, image2].map(image => new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
})))
.then(() => {
    // Imágenes totalmente cargadas, ahora puedes crear al jugador y llamar a draw
    const jugador = new Player(100, 100, imagenes);
    jugador.draw();
})
.catch(error => {
    console.error("Error al cargar las imágenes:", error);
});

