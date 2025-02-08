const threads = [
    { title: "Ethical Frameworks in Post-AGI", replies: 42 },
    { title: "AGI Governance Models", replies: 28 }
];

function createThreadCard(thread) {
    const card = document.createElement('div');
    card.className = 'thread-card';

    const title = document.createElement('h3');
    title.textContent = thread.title;
    card.appendChild(title);

    const replies = document.createElement('p');
    replies.textContent = `${thread.replies} replies`;
    card.appendChild(replies);

    const button = document.createElement('button');
    button.textContent = 'View Thread';
    card.appendChild(button);

    return card;
}

function loadThreads() {
    const threadsContainer = document.getElementById('threads');
    threads.forEach(thread => {
        const card = createThreadCard(thread);
        threadsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadThreads);

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

let nodes = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('node-network');
    frameRate(30);
    for (let i = 0; i < 30; i++) {
        nodes.push(new Node(random(width), random(height)));
    }
}

function draw() {
    clear();
    nodes.forEach(node => {
        node.update();
        node.display();
    });
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            if (d < 100) {
                stroke(255, 150);
                line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(5, 10);
        this.angle = random(TWO_PI);
    }

    update() {
        this.angle += 0.05;
        this.size = 7 + sin(this.angle) * 3;
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 100) {
            this.x += random(-0.5, 0.5);
            this.y += random(-0.5, 0.5);
        }
    }

    display() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.size);
    }
}
