import { useEffect, useRef } from "react";

interface Props {
  hasMore: boolean;
  loading: boolean;
  onIntersect: () => void;
}

export default function useInfiniteScroll({
  hasMore,
  loading,
  onIntersect,
}: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        onIntersect();
      }
    });

    if (targetRef.current) observerRef.current.observe(targetRef.current);

    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, onIntersect]);

  return targetRef;
}
