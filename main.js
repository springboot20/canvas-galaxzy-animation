const canvas = document.getElementById("canvas-screen");
const context = canvas.getContext("2d");

const mouseCoords = {
  x: undefined,
  y: undefined,
};

canvas.width = innerWidth;
canvas.height = innerHeight;

let isMouseDown = false;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("mouseup", () => {
  isMouseDown = false;
});

addEventListener("mousedown", () => {
  isMouseDown = true;
});

const colors = ["#2c3e50", "#e74c3c", "#bcf0f1", "#3498db", "#2980b9"];

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw = () => {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.shadowColor = this.color;
    context.shadowBlur = 15;
    context.fill();
  };

  update = () => {
    this.draw();
  };
}

let particleArrays = [];

function init() {
  particleArrays = [];

  for (let i = 0; i < 1000; i++) {
    let canvasWidth = canvas.width + 300;
    let canvasHeight = canvas.height + 300;

    let x = Math.random() * canvasWidth - canvasWidth / 2;
    let y = Math.random() * canvasHeight - canvasHeight / 2;
    let radius = 2 * Math.random();

    particleArrays.push(new Particle(x, y, radius));
  }
}

let radians = 0;
let alpha = 0;
function animate() {
  requestAnimationFrame(animate);

  context.fillStyle = `rgba(10, 10, 10, ${alpha})`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(radians);
  particleArrays.forEach((particle) => particle.update());
  context.restore();

  radians += 0.005;

  if (isMouseDown && alpha >= 0.1) {
    alpha -= 0.01;
  } else if (!isMouseDown && alpha < 1) {
    alpha += 0.01;
  }
}

init();
animate();
