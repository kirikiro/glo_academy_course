export const smoothScroll = () => {
  const upTriggers = document.querySelectorAll(".smooth-scroll");
  if (upTriggers.length === 0) return;

  const threshold = 840;

  const evaluateScrollPosition = () => {
    const currentPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const displayState = currentPosition > threshold ? "block" : "none";

    for (const trigger of upTriggers) {
      trigger.style.display = displayState;
    }
  };

  window.addEventListener("scroll", evaluateScrollPosition);

  const executeScrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  for (const trigger of upTriggers) {
    trigger.addEventListener("click", executeScrollToTop);
  }
};
