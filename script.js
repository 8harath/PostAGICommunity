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
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let nodes = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('node-network');
    frameRate(30);
    for (let i = 0; i < 50; i++) {
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
        this.size = random(5, 15);
        this.angle = random(TWO_PI);
    }

    update() {
        this.angle += 0.05;
        this.size = 10 + sin(this.angle) * 5;
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 100) {
            this.x += random(-1, 1);
            this.y += random(-1, 1);
        }
    }

    display() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.size);
    }
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// Update tabindex attributes for keyboard navigation
function updateTabindex() {
    document.querySelectorAll('a, button').forEach(element => {
        element.setAttribute('tabindex', '0');
    });
}

document.addEventListener('DOMContentLoaded', updateTabindex);
