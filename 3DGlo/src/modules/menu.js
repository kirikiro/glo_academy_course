document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu');
  const menuContainer = document.querySelector('menu');

  if (!menuBtn || !menuContainer) return;

  const toggleMenu = (e) => {
    const target = e.target;

    if (target.closest('.menu')) {
      menuContainer.classList.toggle('active-menu');
      return;
    }

    const isClose = target.closest('.close-btn');
    const isLink = target.closest('menu ul > li > a');

    if (isClose || isLink) {
      menuContainer.classList.remove('active-menu');
    }
  };

  document.addEventListener('click', toggleMenu);

  document.addEventListener('click', (e) => {
    const isOut = !menuContainer.contains(e.target) && !menuBtn.contains(e.target);
    if (isOut) {
      menuContainer.classList.remove('active-menu');
    }
  });
});