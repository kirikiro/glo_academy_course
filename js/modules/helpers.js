export const animate = ({ timing, draw, duration }) => {
  const initTime = performance.now();

  const step = (timestamp) => {
    const elapsed = timestamp - initTime;
    const ratio = Math.min(elapsed / duration, 1);

    draw(timing(ratio));

    if (ratio < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};
