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
      <p className="border-t-2 border-orange-300 pt-2 text-xs">
        Time remaining:
        <span className="ml-1 text-base">
          {Math.floor(time / 60).toFixed()}:
          {(time % 60).toString().padStart(2, "0")}
        </span>
      </p>
    </div>
  );
}

export default Timer;
