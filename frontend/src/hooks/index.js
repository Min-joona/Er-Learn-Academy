import { useEffect, useRef, useState } from 'react';

export function useIntersection(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.1, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export function useCountUp(end, duration = 2000, start = 0) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return value;
}

export function useGSAP() {
  const gsapRef = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    import('gsap').then((mod) => { gsapRef.current = mod.default; setReady(true); });
  }, []);
  return { gsap: gsapRef.current, ready };
}
