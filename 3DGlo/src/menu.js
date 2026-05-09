document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu");
  const menuContainer = document.querySelector("menu");

  if (!menuBtn || !menuContainer) return;

  const closeBtn = menuContainer.querySelector(".close-btn");
  const menuItems = menuContainer.querySelectorAll("ul > li > a");

  const toggleMenu = () => menuContainer.classList.toggle("active-menu");

  menuBtn.addEventListener("click", toggleMenu);

  if (closeBtn) {
    closeBtn.addEventListener("click", toggleMenu);
  }

  menuItems.forEach((item) => item.addEventListener("click", toggleMenu));
});
