// Load navbar from navbar.html
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            const navbarContainer = document.querySelector('body');
            navbarContainer.insertAdjacentHTML('afterbegin', html);
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// Update progress bar based on completed projects
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (!progressBar || !progressText) {
        return; // Progress bar not on this page
    }

    const fullførtDiv = document.querySelector('.fullført');
    const pågårDiv = document.querySelector('.pågår');
    
    if (!fullførtDiv || !pågårDiv) {
        return;
    }

    const completedProjects = fullførtDiv.querySelectorAll('.project-card').length;
    const ongoingProjects = pågårDiv.querySelectorAll('.project-card').length;
    const totalProjects = completedProjects + ongoingProjects;

    if (totalProjects === 0) {
        progressBar.style.width = '0%';
        progressText.textContent = '0% fullført';
        return;
    }

    const percentage = (completedProjects / totalProjects) * 100;
    progressBar.style.width = percentage + '%';
    progressText.textContent = Math.round(percentage) + '% fullført';
    
    // Watch for changes to update progress bar dynamically
    const observer = new MutationObserver(() => {
        updateProgressBar();
    });
    
    const config = { childList: true, subtree: true };
    observer.observe(fullførtDiv, config);
    observer.observe(pågårDiv, config);
}

// Load navbar on page load
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    updateProgressBar();
});

const modal = document.querySelector('.image-modal');
const closeButton = document.querySelector('.modal-close');
const modalImage = document.querySelector('.modal-member-image');
const modalRole = document.querySelector('.modal-role');
const modalTitle = document.querySelector('#modal-title');
const modalStrengths = document.querySelector('.modal-strengths');
const modalDescription = document.querySelector('.modal-description');
const cards = document.querySelectorAll('.card');

function openMemberInfo(card) {
    const role = card.querySelector('.card-role');
    const title = card.querySelector('h3');
    const image = card.querySelector('img');

    if (!modal || !modalImage || !modalRole || !modalTitle || !modalStrengths || !modalDescription || !role || !title || !image) {
        return;
    }

    modalImage.src = image.getAttribute('src') || '';
    modalImage.alt = image.alt;
    modalRole.textContent = role.textContent;
    modalTitle.textContent = title.textContent;
    modalStrengths.textContent = card.dataset.goodAt || '';
    modalDescription.textContent = card.dataset.moreInfo || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    closeButton?.focus();
}

function closeImage() {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (modalImage) {
        modalImage.src = '';
    }
}

cards.forEach((card) => {
    card.addEventListener('click', () => openMemberInfo(card));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openMemberInfo(card);
        }
    });
});

closeButton?.addEventListener('click', closeImage);
modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeImage();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeImage();
    }
});
