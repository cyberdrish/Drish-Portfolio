import { useEffect, useState } from "react";

type Star = {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
};

type Meteor = {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  animationDuration: number;
};

const MAX_STARS = 300;
const REDUCED_MOTION_STARS = 40;
const RESIZE_DEBOUNCE_MS = 200;

const createStars = (reduceMotion: boolean): Star[] => {
  const areaBasedCount = Math.floor(
    (window.innerWidth * window.innerHeight) / 10000
  );
  const numberOfStars = Math.min(
    areaBasedCount,
    reduceMotion ? REDUCED_MOTION_STARS : MAX_STARS
  );

  return Array.from({ length: numberOfStars }, (_, id) => ({
    id,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.5,
    animationDuration: Math.random() * 4 + 2,
  }));
};

const createMeteors = (): Meteor[] =>
  Array.from({ length: 6 }, (_, id) => ({
    id,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 20,
    delay: Math.random() * 15,
    animationDuration: Math.random() * 3 + 3,
  }));

const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let resizeTimeout = 0;

    const generateBackground = () => {
      setStars(createStars(reducedMotionQuery.matches));
      setMeteors(reducedMotionQuery.matches ? [] : createMeteors());
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(generateBackground, RESIZE_DEBOUNCE_MS);
    };

    generateBackground();
    window.addEventListener("resize", handleResize, { passive: true });
    reducedMotionQuery.addEventListener("change", generateBackground);

    return () => {
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", generateBackground);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: `${star.opacity}`,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${Math.min(meteor.size * 70, 175)}px`,
            height: `${meteor.size * 1.6}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `-${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
