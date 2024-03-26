function FinishScreen({ points, questions, dispatch, diffi }) {
  return (
    <div className="text-center flex flex-col gap-3">
      <p className="text-sm">Game is over.</p>
      <p className="text-lg">
        You did {points}/{questions.flatMap((el) => el.words).length} in {diffi}{" "}
        mode!
      </p>
      <button
        className="bg-orange-300 py-2 px-8 rounded-lg hover:bg-orange-400 transition-all delay-50"
        onClick={() => dispatch({ type: "onAgain" })}
      >
        Play Again
      </button>
    </div>
  );
}

export default FinishScreen;
