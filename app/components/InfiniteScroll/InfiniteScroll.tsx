"use client";

import { FC, PropsWithChildren, ReactElement, useRef, useEffect } from "react";

type InfiniteScrollProps = PropsWithChildren<{
  hasMore?: boolean;
  rootMargin?: string;
  scrollThreshold?: number;
  loader?: ReactElement;
  next?: () => Promise<void>;
}>;

const InfiniteScroll: FC<InfiniteScrollProps> = ({
  children,
  hasMore = false,
  rootMargin = "80px",
  next = null,
  scrollThreshold = 0.8,
  loader = <div>Loading...</div>,
}): ReactElement => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasMore && next) {
      await next();
    }
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null, // observes within the viewport
      rootMargin: rootMargin, // Start loading before reaching the target
      threshold: scrollThreshold, // trigger when the sentinel is fully visible
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, scrollThreshold, rootMargin]);

  return (
    <>
      {children}
      {hasMore && loader}
      <div ref={sentinelRef} />
    </>
  );
};

export default InfiniteScroll;
