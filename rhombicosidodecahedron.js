let ball;
let vertices = [];
let maxRadius;
let ballRadius = 10;
let isPaused = false;

function setup() {
  let canvas = createCanvas(800, 600, WEBGL);
  canvas.parent('rhombicosidodecahedron');
  vertices = generateVertices();
  maxRadius = calculateMaxRadius();
  
  ball = {
    pos: createVector(0, 0, 0),
    vel: createVector(random(-2, 2), random(-2, 2), random(-2, 2)),
  };
}

function draw() {
  if (isPaused) return;
  background(0);
  orbitControl();
  
  // Rotate the entire shape
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  drawShape();
  updateBall();
  drawBall();
}

function generateVertices() {
  let phi = (1 + Math.sqrt(5)) / 2;
  let bases = [
    [2 + phi, 1, 1 + 2*phi],
    [1 + 2*phi, 2 + phi, 1],
    [1, 1 + 2*phi, 2 + phi],
    [1 + phi, phi, 3 + phi]
  ];
  
  let vertices = [];
  for (let base of bases) {
    let [a, b, c] = base;
    let perms = [
      [a, b, c], [b, c, a], [c, a, b]
    ];
    
    for (let [x, y, z] of perms) {
      vertices.push(createVector(-x, -y, -z));
      vertices.push(createVector(x, y, -z));
      vertices.push(createVector(x, -y, z));
      vertices.push(createVector(-x, y, z));
    }
  }
  return vertices;
}

function calculateMaxRadius() {
  return vertices.reduce((max, v) => max(v.mag()), 0);
}

function drawShape() {
  stroke(150, 200, 255);
  strokeWeight(3);
  for (let v of vertices) {
    push();
    translate(v.x, v.y, v.z);
    point(0, 0, 0);
    pop();
  }
}

function updateBall() {
  ball.pos.add(ball.vel);
  let currentRadius = ball.pos.mag();
  
  if (currentRadius + ballRadius > maxRadius) {
    let normal = ball.pos.copy().normalize();
    ball.vel = reflect(ball.vel, normal);
    ball.pos = normal.mult(maxRadius - ballRadius - 0.1);
  }
}

function reflect(vec, normal) {
  return vec.sub(normal.mult(2 * vec.dot(normal)));
}

function drawBall() {
  push();
  translate(ball.pos.x, ball.pos.y, ball.pos.z);
  fill(255, 255, 0);
  noStroke();
  sphere(ballRadius);
  pop();
}

// Pause/Play Toggle
const pausePlayToggle = document.getElementById('pause-play-toggle');
pausePlayToggle.addEventListener('click', () => {
  isPaused = !isPaused;
  pausePlayToggle.textContent = isPaused ? 'Play Animation' : 'Pause Animation';
});
