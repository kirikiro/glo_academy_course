export const animate = ({ duration, draw, onComplete }) => {
  let start = null;

  const frame = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);

    draw(progress);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else if (onComplete) {
      onComplete();
    }
  };

  requestAnimationFrame(frame);
};