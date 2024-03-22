import { useReducer, useState } from "react";
import StartScreen from "./StartScreen";
import Difficulty from "./Difficulty";
const initialState = {
  diffi: "easy",
};
function reducer(state, action) {
  switch (action.type) {
    case "onEasy":
      return { ...state, diffi: action.payload };
    case "onMedium":
      return { ...state, diffi: action.payload };
    case "onHard":
      return { ...state, diffi: action.payload };
    default:
      return new Error("unknown action");
  }
}
function App() {
  const [{ diffi }, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="h-dvh flex items-center justify-center">
      <StartScreen>
        <Difficulty diffi={diffi} dispatch={dispatch} />
      </StartScreen>
    </div>
  );
}

export default App;
