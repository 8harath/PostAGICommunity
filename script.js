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

// P18be
function initializeHeroAnimation() {
    // Assuming p5.js is used for the animation
    new p5((p) => {
        let nodes = [];

        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            for (let i = 0; i < 100; i++) {
                nodes.push(new Node(p.random(p.width), p.random(p.height)));
            }
        };

        p.draw = function() {
            p.background(0);
            for (let node of nodes) {
                node.update();
                node.display();
            }
        };

        class Node {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = p.random(5, 15);
                this.speed = p.random(1, 3);
            }

            update() {
                this.x += p.random(-this.speed, this.speed);
                this.y += p.random(-this.speed, this.speed);
            }

            display() {
                p.noStroke();
                p.fill(0, 201, 167, 150);
                p.ellipse(this.x, this.y, this.size);
            }
        }
    }, 'hero-animation');
}

// P605c
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.fade-in').classList.add('visible');
    initializeHeroAnimation();
});

// P009b
document.querySelector('.hero button').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.05)';
});

document.querySelector('.hero button').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});
