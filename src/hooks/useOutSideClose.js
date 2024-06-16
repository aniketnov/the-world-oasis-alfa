import { useEffect, useRef } from "react";

function useOutSideClose(handler, listenerCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, listenerCapturing);

      return () => {
        document.removeEventListener("click", handleClick, listenerCapturing);
      };
    },
    [handler, listenerCapturing]
  );
  return ref;
}

export default useOutSideClose;
