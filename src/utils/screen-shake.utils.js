export function screenShake(duration =500, intensity =7 ) {
  const element = document.body;
  const startTime = performance.now();
  const originalTransform = element.style.transform; // Store original transform

  function animateShake() {
    const elapsed = performance.now() - startTime;
    const progress = elapsed / duration;
    if (progress < 1) {
      const currentIntensity = intensity * (1 - progress);

      // const offsetX = (Math.random() - 0.5) * intensity * (1 - progress);
      // const offsetY = (Math.random() - 0.5) * intensity * (1 - progress);
      const offsetX = (Math.random() - 0.5) * 2 * currentIntensity;
      const offsetY = (Math.random() - 0.5) * 2 * currentIntensity;

      const flickerOpacity = Math.random() * 1;

      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      // Use box-shadow for the full-screen red flicker overlay
      element.style.boxShadow = `inset 0 0 100vw 100vh rgba(255, 0, 0, ${flickerOpacity * 0.3})`;
      element.style.transition = "transform 0.05s, box-shadow 0.05s";
      element.style.zIndex = 999;
      // Optional: Add a class for visual debugging or more complex styling
      // className: 'shake-effect flicker-effect'

      // element.style.backgroundColor = 'red';
      requestAnimationFrame(animateShake);
    } else {
      element.style.transform = originalTransform; // Restore original transform
      element.style.boxShadow = "none";
    }
  }

  requestAnimationFrame(animateShake);
}
