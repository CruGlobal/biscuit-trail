import { useEffect, useState } from 'react';
import { RootState } from 'reducers';
import { useSelector } from 'react-redux';

export function useOnClickOutside(ref: any, handler: Function) {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener, { passive: false });
    document.addEventListener('touchstart', listener, { passive: false });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export function useLangChange() {
  const lang = useSelector(({ auth }: RootState) => auth.lang);
  const [_, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, [lang]);
}
