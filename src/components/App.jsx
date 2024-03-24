import { useReducer, useState, useRef } from "react";
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
  {
    id: 3,
    words: ["computer", "black", "fork"],
    answers: ["bilgisayar", "siyah", "catal"],
    diffi: "easy",
  },
];

const initialState = {
  questions: [],
  diffi: "easy",
  status: "ready", //loading,error,ready,active,finished
  answered: [],
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
      let tempAnswers = [];
      tempQuiz[state.index].answers.forEach((answer, i) => {
        if (answer === action.payload[i]) {
          points++;
          tempAnswers[i] = true;
        } else {
          tempAnswers[i] = false;
        }
      });
      return {
        ...state,
        showAnswers: true,
        points: points,
        answered: tempAnswers,
      };
    case "onNext":
      if (state.index + 1 === tempQuiz.length) {
        return {
          ...state,
          status: "finished",
          showAnswers: false,
          answered: [],
        };
      }
      return { ...state, index: state.index + 1, showAnswers: false };
    case "onAgain":
      return { ...initialState, status: "ready" };
    default:
      return new Error("unknown action");
  }
}

function App() {
  const doneClicked = useRef(false);
  const [
    { questions, diffi, status, answered, index, showAnswers, points },
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
            <div className="flex gap-2">
              <QuizMain>
                <Questions
                  tempQuiz={tempQuiz}
                  index={index}
                  formValues={formValues}
                  handleFormChange={handleFormChange}
                />
              </QuizMain>
              <div className="flex items-center">
                {showAnswers && (
                  <ul className="flex flex-col justify-between item-center h-48">
                    {answered.map((a, i) => (
                      <li
                        className={`${
                          a === true ? "text-green-600" : "text-red-600"
                        } `}
                        key={i}
                      >
                        {a === true
                          ? "True"
                          : `Correct Answer:${tempQuiz[index].answers[i]}`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                dispatch({
                  type: "onDone",
                  payload: [
                    formValues.textbox0,
                    formValues.textbox1,
                    formValues.textbox2,
                  ],
                });
                doneClicked.current = true;
              }}
              disabled={doneClicked.current}
            >
              Done
            </button>
          </>
        )}
        {status === "finished" && (
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
        )}
      </div>
      {showAnswers && (
        <>
          <button
            onClick={() => {
              dispatch({ type: "onNext" });
              setFormValues({
                textbox0: "",
                textbox1: "",
                textbox2: "",
              });
              doneClicked.current = false;
            }}
          >
            {index + 1 === tempQuiz.length ? "Finish" : "Next"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
