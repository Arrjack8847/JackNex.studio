export type AnimationProfile = "mobile" | "tablet" | "desktop";

export const animationConfig = {
  desktop: {
    particleCount: 18,
    sideParticleCount: 6,
    shapeCount: 3,
    heroParticleCount: 10,
    glowCount: 3,
    enableCursorGlow: true,
    enableParallax: true,
    blurStrength: 80,
    gridSize: 48,
  },
  tablet: {
    particleCount: 12,
    sideParticleCount: 4,
    shapeCount: 2,
    heroParticleCount: 7,
    glowCount: 3,
    enableCursorGlow: false,
    enableParallax: true,
    blurStrength: 60,
    gridSize: 42,
  },
  mobile: {
    particleCount: 7,
    sideParticleCount: 3,
    shapeCount: 2,
    heroParticleCount: 5,
    glowCount: 2,
    enableCursorGlow: false,
    enableParallax: false,
    blurStrength: 40,
    gridSize: 34,
  },
} as const;
