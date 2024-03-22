function StartScreen({ children, dispatch }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-center text-l max-w-[450px]">
        This game contains 4 levels, and 5 words for every level. You have to
        answer all the questions before the time runs out. You can select the
        difficulty of the game you want to play.
      </p>
      {children}
      <button
        className="cursor-pointer bg-orange-300 py-2 px-8 rounded-lg hover:bg-orange-400 transition-all delay-50"
        onClick={() => dispatch({ type: "onStart" })}
      >
        Start Playing
      </button>
    </div>
  );
}

export default StartScreen;
