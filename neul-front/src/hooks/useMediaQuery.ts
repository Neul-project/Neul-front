import { useEffect, useState, useCallback } from "react";

/**
 * Custom hook for media queries.
 * @param query CSS media query string (e.g. "(max-width: 768px)")
 * @returns `true` if the media query matches.
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [query]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const matchMedia = window.matchMedia(query);

    // 초기 체크
    handleChange();

    // 이벤트 등록
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query, handleChange]);

  return matches;
}
