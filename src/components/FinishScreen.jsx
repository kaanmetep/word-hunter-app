function FinishScreen({ points, tempQuiz, dispatch }) {
  return (
    <div className="text-center">
      <p>Game is over.</p>
      <p>
        You did {points}/{tempQuiz.flatMap((el) => el.words).length}
      </p>
      <button
        className="bg-orange-300 py-2 px-4 rounded-lg"
        onClick={() => dispatch({ type: "onAgain" })}
      >
        Play Again
      </button>
    </div>
  );
}

export default FinishScreen;
