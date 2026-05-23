export const documentModal = () => {
  const certLinks = document.querySelectorAll(".sertificate-document");
  const popupWrapper = document.getElementById("myModal");
  const displayImage = document.getElementById("img01");
  const crossBtn = document.querySelector(".doc-close");

  if (!certLinks.length || !popupWrapper || !displayImage) return;

  const hidePopup = () => {
    popupWrapper.style.display = "none";
    displayImage.removeAttribute("src");
  };

  const detectOutsideOrClose = (e) => {
    const clickedElement = e.target;
    const isCross = clickedElement === crossBtn;
    const isContent = clickedElement.closest(".doc-modal-content");
    const isImg = clickedElement === displayImage;

    if (isCross || (!isContent && !isImg)) {
      hidePopup();
    }
  };

  popupWrapper.addEventListener("click", detectOutsideOrClose);

  const launchViewer = (e) => {
    e.preventDefault();
    const currentAnchor = e.currentTarget;
    const path = currentAnchor.getAttribute("href");

    if (typeof path === "string" && path.trim() !== "") {
      displayImage.setAttribute("src", path);
      popupWrapper.style.display = "block";
    }
  };

  for (const link of certLinks) {
    link.addEventListener("click", launchViewer);
  }
};
