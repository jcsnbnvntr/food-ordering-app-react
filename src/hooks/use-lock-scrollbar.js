import { useEffect, useState } from "react";

const useLockScrollbar = () => {
  const [isLocked, setIsLocked] = useState(false);
  const body = document.body;

  const lockScrollbar = () => {
    setIsLocked(true);
  };

  const unlockScrollbar = () => {
    setIsLocked(false);
  };

  useEffect(() => {
    if (isLocked) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "unset";
    }
  }, [isLocked, body]);

  return {
    lockScrollbar,
    unlockScrollbar,
  };
};

export default useLockScrollbar;
