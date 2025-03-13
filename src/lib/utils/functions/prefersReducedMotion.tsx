function prefersReducedMotion() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  return prefersReducedMotion.matches;
}

export default prefersReducedMotion;
