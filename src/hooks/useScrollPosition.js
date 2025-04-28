import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const currentPosition = window.pageYOffset;
      if (!isScrolled && currentPosition > 50) {
        setIsScrolled(true);
      } else if (isScrolled && currentPosition <= 50) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, [isScrolled]);

  return isScrolled;
};

export default useScrollPosition;
