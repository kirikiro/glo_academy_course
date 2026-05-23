export const servicesModal = () => {
  const triggers = document.querySelectorAll(".service-button .btn");
  const modalContainer = document.querySelector(".services-modal");
  const pageOverlay = document.querySelector(".overlay");

  if (triggers.length === 0 || !modalContainer || !pageOverlay) {
    return;
  }

  const dismissBtn = modalContainer.querySelector(".services-modal__close");
  const bodyTag = document.body;

  const updateModalDisplay = (isVisible) => {
    const cssDisplay = isVisible ? "flex" : "none";
    modalContainer.style.display = cssDisplay;
    pageOverlay.style.display = cssDisplay;

    if (isVisible) {
      bodyTag.classList.add("no-scroll");
    } else {
      bodyTag.classList.remove("no-scroll");
    }
  };

  triggers.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      updateModalDisplay(true);
    });
  });

  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      updateModalDisplay(false);
    });
  }

  pageOverlay.addEventListener("click", (event) => {
    if (event.target === pageOverlay) {
      updateModalDisplay(false);
    }
  });
};
