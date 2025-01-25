function setup() {
    createCanvas(windowWidth, windowHeight);
    nodes = [];
    for (let i = 0; i < 100; i++) {
        nodes.push(new Node(random(width), random(height)));
    }
}

function draw() {
    background(0);
    for (let node of nodes) {
        node.update();
        node.display();
    }
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(5, 15);
        this.speed = random(1, 3);
    }

    update() {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
    }

    display() {
        noStroke();
        fill(0, 201, 167, 150);
        ellipse(this.x, this.y, this.size);
    }
}
