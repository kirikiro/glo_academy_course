export const initReviews = () => {
  const listContainer = document.querySelector(".comments-container");

  if (!listContainer) return;

  const generateTemplate = (payload, reverseOrder, bgTheme) => {
    const imageFallback = payload.image || "avatar.png";

    const photoMarkup = `
            <div class="col-xs-3 col-sm-2">
                <div class="review-user">
                    <img src="images/users/${imageFallback}" alt="avatar" class="img-responsive avatar">
                </div>
            </div>`;

    const textMarkup = `
            <div class="col-xs-9 col-sm-9">
                <div class="review-inner ${bgTheme} review-arrow review-arrow-${reverseOrder ? "right" : "left"}">
                    <p class="text-normal">${payload.author || "Аноним"}</p>
                    <p>${payload.comment || ""}</p>
                </div>
            </div>`;

    return `
            <div class="review-margin-bottom row custom-review-node">
                ${reverseOrder ? textMarkup + photoMarkup : photoMarkup + textMarkup}
            </div>`;
  };

  const retrieveData = async () => {
    try {
      listContainer.innerHTML =
        '<img src="/glo_academy_course/images/loader.gif" class="centered-image"/>';
      const req = await fetch("./comments.json");

      if (!req.ok) throw new Error("Network response was not ok");

      const parsed = await req.json();
      return Array.isArray(parsed.comments) ? parsed.comments : [];
    } catch (err) {
      listContainer.innerHTML = "";
      return [];
    }
  };

  const applyCarousel = (records) => {
    if (!records.length) return;

    let activeIndex = 0;
    const colorPresets = ["review-green", "review-gray", "review-orange"];

    listContainer.innerHTML = "";

    for (let j = 0; j < 3; j++) {
      if (records[activeIndex]) {
        const isFlipped = j % 2 !== 0;
        const skin = colorPresets[j % colorPresets.length];
        listContainer.insertAdjacentHTML(
          "beforeend",
          generateTemplate(records[activeIndex], isFlipped, skin),
        );
        activeIndex = (activeIndex + 1) % records.length;
      }
    }

    setInterval(() => {
      const firstNode = listContainer.querySelector(".custom-review-node");
      if (firstNode) {
        firstNode.remove();
      }

      const currentRecord = records[activeIndex];
      const isFlipped = (activeIndex + 1) % 2 === 0;
      const skin = isFlipped ? "review-gray" : "review-green";

      listContainer.insertAdjacentHTML(
        "beforeend",
        generateTemplate(currentRecord, isFlipped, skin),
      );
      activeIndex = (activeIndex + 1) % records.length;
    }, 20000);
  };

  retrieveData().then(applyCarousel);
};
