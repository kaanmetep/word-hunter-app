const radioStyle =
  "accent-orange-300 w-4 h-4 cursor-pointer border-orange-200 transition-all delay-300";
function Difficulty({ diffi, dispatch }) {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex gap-2 items-center">
        <label htmlFor="easy">Easy</label>
        <input
          type="radio"
          name="options"
          className={radioStyle}
          checked={diffi === "easy"}
          onChange={() => dispatch({ type: "onEasy", payload: "easy" })}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="easy">Medium</label>
        <input
          type="radio"
          name="options"
          className={radioStyle}
          onChange={() => dispatch({ type: "onMedium", payload: "medium" })}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="easy">Hard</label>
        <input
          type="radio"
          name="options"
          className={radioStyle}
          onChange={() => dispatch({ type: "onHard", payload: "hard" })}
        />
      </div>
    </div>
  );
}

export default Difficulty;
