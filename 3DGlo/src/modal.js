document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.popup');
  const openButtons = document.querySelectorAll('.popup-btn');
  const closeBtn = modal?.querySelector('.popup-close');

  if (!modal || openButtons.length === 0 || !closeBtn) return;

  modal.style.display = 'none';
  modal.style.opacity = '0';
  modal.style.transform = 'translateY(10px)';
  modal.style.transition = 'none';

  const DURATION = 200; 
  const SHIFT = 10;

  const animate = (isOpen) => {
    if (window.innerWidth < 768) {
      modal.style.display = isOpen ? 'block' : 'none';
      if (isOpen) {
        modal.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
      }
      return;
    }

    modal.style.display = 'block';
    let start = null;

    const frame = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / DURATION, 1);

      if (isOpen) {
        modal.style.opacity = progress;
        modal.style.transform = `translateY(${SHIFT * (1 - progress)}px)`;
      } else {
        modal.style.opacity = 1 - progress;
        modal.style.transform = `translateY(${-SHIFT * progress}px)`;
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else if (!isOpen) {
        modal.style.display = 'none';
      }
    };

    requestAnimationFrame(frame);
  };

  openButtons.forEach(btn => btn.addEventListener('click', () => animate(true)));
  closeBtn.addEventListener('click', () => animate(false));
  modal.addEventListener('click', (e) => e.target === modal && animate(false));
});