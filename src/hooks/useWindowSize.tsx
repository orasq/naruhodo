import { useLayoutEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 640,
};

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [currentBreakpoint, setCurrentBreakpoint] = useState({
    isMobile: false,
  });

  useLayoutEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setCurrentBreakpoint({
        isMobile: window.innerWidth <= BREAKPOINTS.mobile,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    size,
    currentBreakpoint,
  };
}

export default useWindowSize;
