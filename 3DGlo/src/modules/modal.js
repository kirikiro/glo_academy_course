import { animate } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.popup');
  const openButtons = document.querySelectorAll('.popup-btn');
  const closeBtn = modal?.querySelector('.popup-close');

  if (!modal || openButtons.length === 0 || !closeBtn) return;

  modal.style.transition = 'none';
  modal.style.display = 'none';

  const DURATION = 200;
  const SHIFT = 10;

  const toggleModal = (isOpen) => {
    if (window.innerWidth < 768) {
      modal.style.display = isOpen ? 'block' : 'none';
      modal.style.opacity = isOpen ? '1' : '0';
      modal.style.transform = isOpen ? 'translateY(0)' : `translateY(${SHIFT}px)`;
      return;
    }
    modal.style.display = 'block';
    modal.style.opacity = isOpen ? '0' : '1';
    modal.style.transform = isOpen ? `translateY(${SHIFT}px)` : 'translateY(0)';

    animate({
      duration: DURATION,
      draw: (progress) => {
        if (isOpen) {
          modal.style.opacity = progress;
          modal.style.transform = `translateY(${SHIFT * (1 - progress)}px)`;
        } else {
          modal.style.opacity = 1 - progress;
          modal.style.transform = `translateY(${-SHIFT * progress}px)`;
        }
      },
      onComplete: () => {
        if (!isOpen) modal.style.display = 'none';
      }
    });
  };

  openButtons.forEach(btn => btn.addEventListener('click', () => toggleModal(true)));
  closeBtn.addEventListener('click', () => toggleModal(false));
  modal.addEventListener('click', (e) => e.target === modal && toggleModal(false));
});