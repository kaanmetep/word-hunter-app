function StartScreen({ children }) {
  return (
    <div className=" bg-orange-100 w-2/3 flex flex-col items-center justify-center gap-6 rounded-lg p-8 max-w-[620px]">
      <h1 className="text-4xl bg-gradient-to-r from-orange-300 to-yellow-200 px-16 py-2 rounded-lg ">
        Word Hunter
      </h1>
      <p className="text-center text-l max-w-96">
        This game contains 4 levels, and 6 words for every level. You have to
        answer all the questions before the time runs out. You can select the
        difficulty of the game you want to play.
      </p>
      {children}
      <button className="cursor-pointer bg-orange-300 py-2 px-8 rounded-lg hover:bg-orange-400 transition-all delay-50">
        Start Playing
      </button>
    </div>
  );
}

export default StartScreen;
