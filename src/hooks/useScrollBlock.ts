import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const DocumentBody = document.body;

type Response<S> = [S, Dispatch<SetStateAction<S>>];

export function useScrollBlock<S>(initialState: S | (() => S)): Response<S> {
  const [isSrollBlocked, setIsScrollBlocked] = useState<S>(initialState);

  useEffect(() => {
    isSrollBlocked
      ? disableBodyScroll(DocumentBody)
      : enableBodyScroll(DocumentBody);
    return () => enableBodyScroll(DocumentBody);
  }, [isSrollBlocked]);

  return [isSrollBlocked, setIsScrollBlocked];
}
