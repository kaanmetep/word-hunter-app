import { useReducer, useState } from "react";
import StartScreen from "./StartScreen";
import Difficulty from "./Difficulty";
import Header from "./Header";
import Loading from "./Loading";
import Error from "./Error";
import QuizMain from "./QuizMain";
import Questions from "./Questions";
const tempQuiz = [
  {
    id: 0,
    words: ["apple", "car", "water"],
    answers: ["elma", "araba", "su"],
    diffi: "easy",
  },
  {
    id: 1,
    words: ["chair", "window", "orange"],
    answers: ["sandalye", "pencere", "portakal"],
    diffi: "easy",
  },
  {
    id: 2,
    words: ["jungle", "iron", "sword"],
    answers: ["orman", "demir", "kilic"],
    diffi: "easy",
  },
];

const initialState = {
  questions: [],
  diffi: "easy",
  status: "ready", //loading,error,ready,active,finished
  answers: [],
  index: 0,
  showAnswers: false,
  points: 0,
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
    case "onDone":
      let points = state.points;
      tempQuiz[state.index].answers.forEach((answer, i) =>
        answer === action.payload[i] ? (points += 10) : ""
      );
      return { ...state, showAnswers: true, points: points };
    case "onNext":
      return { ...state, index: state.index + 1, showAnswers: false };
    default:
      return new Error("unknown action");
  }
}
function App() {
  const [
    { questions, diffi, status, answers, index, showAnswers, points },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [formValues, setFormValues] = useState({
    textbox0: "",
    textbox1: "",
    textbox2: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        {status === "active" && (
          <>
            <QuizMain>
              <Questions
                tempQuiz={tempQuiz}
                index={index}
                formValues={formValues}
                handleFormChange={handleFormChange}
                showAnswers={showAnswers}
              />
            </QuizMain>
            <button
              onClick={() =>
                dispatch({
                  type: "onDone",
                  payload: [
                    formValues.textbox0,
                    formValues.textbox1,
                    formValues.textbox2,
                  ],
                })
              }
            >
              Done
            </button>
          </>
        )}
      </div>
      {showAnswers && (
        <button
          onClick={() => {
            dispatch({ type: "onNext" });
            setFormValues({
              textbox0: "",
              textbox1: "",
              textbox2: "",
            });
          }}
        >
          Next
        </button>
      )}
      <p>{points}</p>
    </div>
  );
}

export default App;
