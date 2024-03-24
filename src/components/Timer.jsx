import { useEffect } from "react";
function Timer({ time, dispatch }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="w-full">
      {Math.floor(time / 60).toFixed()}:
      {(time % 60).toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;
