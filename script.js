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

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('visible');
});
