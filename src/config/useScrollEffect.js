import { useEffect } from "react";

const useScrollEffect = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      callback(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
};

export default useScrollEffect;
