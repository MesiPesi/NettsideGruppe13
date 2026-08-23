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
