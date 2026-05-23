export const phoneModal = () => {
  const uiElements = {
    callButton: document.querySelector("#header .button"),
    popupBox: document.querySelector(".header-modal"),
    backdrop: document.querySelector(".overlay"),
  };

  if (!uiElements.callButton || !uiElements.popupBox || !uiElements.backdrop) {
    return;
  }

  const closeTrigger = uiElements.popupBox.querySelector(
    ".header-modal__close",
  );
  const rootElement = document.body;

  const changeModalState = (activate) => {
    const viewMode = activate ? "flex" : "none";

    uiElements.popupBox.style.display = viewMode;
    uiElements.backdrop.style.display = viewMode;

    if (activate) {
      rootElement.classList.add("no-scroll");
    } else {
      rootElement.classList.remove("no-scroll");
    }
  };

  const handleOpen = (e) => {
    e.preventDefault();
    changeModalState(true);
  };

  const handleClose = () => {
    changeModalState(false);
  };

  uiElements.callButton.addEventListener("click", handleOpen);

  if (closeTrigger) {
    closeTrigger.addEventListener("click", handleClose);
  }

  uiElements.backdrop.addEventListener("click", (e) => {
    if (e.target === uiElements.backdrop) {
      handleClose();
    }
  });
};
