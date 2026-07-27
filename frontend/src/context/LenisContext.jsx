import { createContext, useContext, useEffect, useRef } from 'react';

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;
    const init = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          autoRaf: true,
        });
        lenisRef.current = lenis;
      } catch (e) { console.warn('Lenis not available'); }
    };
    init();
    return () => { lenis?.destroy(); };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
