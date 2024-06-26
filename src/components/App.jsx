import { useReducer, useState, useRef, useEffect } from "react";
import StartScreen from "./StartScreen";
import Difficulty from "./Difficulty";
import Header from "./Header";
import Loading from "./Loading";
import Error from "./Error";
import QuizMain from "./QuizMain";
import Questions from "./Questions";
import Answers from "./Answers";
import FinishScreen from "./FinishScreen";
import DifficultyTag from "./DifficultyTag";
import Timer from "./Timer";
import QuestionHead from "./QuestionHead";
// const tempQuiz = [
//   {
//     id: 0,
//     words: ["apple", "car", "water"],
//     answers: ["elma", "araba", "su"],
//     diffi: "easy",
//   },
//   {
//     id: 1,
//     words: ["chair", "window", "orange"],
//     answers: ["sandalye", "pencere", "portakal"],
//     diffi: "easy",
//   },
//   {
//     id: 2,
//     words: ["jungle", "iron", "sword"],
//     answers: ["orman", "demir", "kilic"],
//     diffi: "easy",
//   },
//   {
//     id: 3,
//     words: ["computer", "black", "fork"],
//     answers: ["bilgisayar", "siyah", "catal"],
//     diffi: "easy",
//   },
// ];

const initialState = {
  questions: [],
  diffi: "easy",
  status: "ready", //loading,error,ready,active,finished
  answered: [],
  index: 0,
  showAnswers: false,
  points: 0,
  time: 180,
};
function reducer(state, action) {
  switch (action.type) {
    case "onError":
      return { ...state, status: "error" };
    case "onLoading":
      return { ...state, status: "loading" };
    case "onEasy":
      return { ...state, diffi: action.payload };
    case "onMedium":
      return { ...state, diffi: action.payload };
    case "onHard":
      return { ...state, diffi: action.payload };
    case "onStart":
      return { ...state, status: "active" };
    case "dataReceived":
      return { ...state, questions: action.payload };
    case "onDone":
      let points = state.points;
      let tempAnswers = [];
      state.questions[state.index].answers.forEach((answer, i) => {
        let modifiedAnswer = action.payload[i]
          .toLocaleLowerCase()
          .replaceAll("ı", "i");
        if (answer.toLocaleLowerCase() === modifiedAnswer) {
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
      if (state.index + 1 === state.questions.length) {
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
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finished" : state.status,
      };
    default:
      return new Error("unknown action");
  }
}

function App() {
  const doneClicked = useRef(false);
  const [
    { questions, diffi, status, answered, index, showAnswers, points, time },
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
  const startGame = () => {
    (async () => {
      dispatch({ type: "onLoading" });
      try {
        const res = await fetch(
          `https://word-hunter-server.vercel.app/api/v1/questions/${diffi}`
        );
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data.data.questions });
        dispatch({ type: "onStart" });
      } catch (err) {
        dispatch({ type: "onError" });
      }
    })();
  };

  return (
    <div className="w-5/6 mx-auto mt-24 max-w-[600px]">
      <Header />
      <div className="bg-orange-100 flex flex-col items-center justify-center gap-6 rounded-lg p-8 mx-auto mt-6 relative">
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} startGame={startGame}>
            <Difficulty diffi={diffi} dispatch={dispatch} />
          </StartScreen>
        )}
        {status === "active" && (
          <>
            <DifficultyTag diffi={diffi} />
            <QuestionHead />
            <div className="flex gap-2 text-xs md:text-base">
              <QuizMain>
                <Questions
                  questions={questions}
                  index={index}
                  formValues={formValues}
                  handleFormChange={handleFormChange}
                />
              </QuizMain>
              <div className="flex items-center">
                {showAnswers && (
                  <Answers
                    answered={answered}
                    questions={questions}
                    index={index}
                  />
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
              className="bg-orange-300 py-2 px-4 rounded-lg hover:bg-orange-400 transition-all delay-50 disabed:bg-gray-300"
            >
              Done
            </button>
            <Timer time={time} dispatch={dispatch} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            questions={questions}
            diffi={diffi}
          />
        )}
      </div>
      {showAnswers && (
        <div className="flex justify-end">
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
            className="bg-gradient-to-r from-orange-300 to-yellow-300 py-2 px-6 rounded-lg mt-3 hover:bg-gradient-to-l transition-all"
          >
            {index + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
