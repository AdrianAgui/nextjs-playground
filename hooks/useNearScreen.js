import { useState, useEffect, useRef } from 'react';

export default function useNearScreen({ distance = '100px', ref, once = true } = {}) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer;

    const element = ref ? ref.current : fromRef.current;

    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        once && observer.disconnect();
      } else {
        !once && setShow(false);
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance
    });

    element && observer.observe(element);

    return () => observer.disconnect();
  });

  return { isNearScreen, fromRef };
}
