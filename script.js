import { threads } from './threads.js';

function createThreadCard(thread) {
    const card = document.createElement('div');
    card.className = 'thread-card';

    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = thread.title;
    title.appendChild(titleLink);
    card.appendChild(title);

    const replies = document.createElement('p');
    replies.textContent = `${thread.replies} replies`;
    card.appendChild(replies);

    const tags = document.createElement('p');
    tags.textContent = `Tags: ${thread.tags.join(', ')}`;
    card.appendChild(tags);

    return card;
}

function loadThreads() {
    const threadsContainer = document.getElementById('threads');
    threadsContainer.innerHTML = '';
    threads.forEach(thread => {
        const card = createThreadCard(thread);
        threadsContainer.appendChild(card);
    });
}

function sortThreads(criteria) {
    if (criteria === 'replies') {
        threads.sort((a, b) => b.replies - a.replies);
    } else if (criteria === 'tags') {
        threads.sort((a, b) => a.tags[0].localeCompare(b.tags[0]));
    }
    loadThreads();
}

document.addEventListener('DOMContentLoaded', () => {
    loadThreads();

    const sortSelect = document.getElementById('sort-threads');
    sortSelect.addEventListener('change', (e) => {
        sortThreads(e.target.value);
    });
});

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('visible');
});
