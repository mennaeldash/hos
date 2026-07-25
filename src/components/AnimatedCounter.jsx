import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ value, duration = 2000, className = '', suffix = '', prefix = '', withPulse = false }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = 0;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(start + (value - start) * easeOutQuart));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
              setDone(true);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span
      ref={ref}
      className={`${className} ${done && withPulse ? 'counter-pulse' : ''}`}
    >
      {prefix}{count.toLocaleString('ar-EG')}{suffix}
    </span>
  );
}

