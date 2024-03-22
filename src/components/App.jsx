import { useReducer, useState } from "react";
import StartScreen from "./StartScreen";
import Difficulty from "./Difficulty";
import Header from "./Header";
import Loading from "./Loading";
import Error from "./Error";
import QuizMain from "./QuizMain";

const tempQuiz = [
  { id: 0, word: "apple", answer: "elma", diffi: "easy" },
  { id: 1, word: "car", answer: "araba", diffi: "easy" },
  { id: 2, word: "water", answer: "su", diffi: "easy" },
];

const initialState = {
  questions: [],
  diffi: "easy",
  status: "ready", //loading,error,ready,active,finished
};
function reducer(state, action) {
  switch (action.type) {
    case "onEasy":
      return { ...state, diffi: action.payload };
    case "onMedium":
      return { ...state, diffi: action.payload };
    case "onHard":
      return { ...state, diffi: action.payload };
    case "onStart":
      return { ...state, status: "active" };
    default:
      return new Error("unknown action");
  }
}
function App() {
  const [{ questions, diffi, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="w-5/6 mx-auto mt-24 max-w-[600px]">
      <Header />
      <div className="bg-orange-100 flex flex-col items-center justify-center gap-6 rounded-lg p-8 mx-auto mt-6">
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch}>
            <Difficulty diffi={diffi} dispatch={dispatch} />
          </StartScreen>
        )}
        {status === "active" && <QuizMain />}
      </div>
    </div>
  );
}

export default App;
