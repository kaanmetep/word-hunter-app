import { useState } from "react";
function Question({
  questionObj,
  index,
  formValues,
  handleFormChange,
  showAnswers,
}) {
  return (
    <li className="flex flex-col gap-2">
      {questionObj.id === index &&
        questionObj.words.map((word, i) => (
          <Word
            word={word}
            name={`textbox${i}`}
            value={`${formValues[`textbox${i}`]}`}
            onChange={handleFormChange}
            key={i}
            answers={questionObj.answers}
            i={i}
            showAnswers={showAnswers}
          />
        ))}
    </li>
  );
}

function Word({ word, name, value, onChange, answers, i, showAnswers }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-orange-200 py-2 px-6 rounded-lg text-center">
        <p className="text-lg">{word}</p>
        <p>
          <input
            type="text"
            className="rounded-lg pl-2"
            name={name}
            value={value}
            onChange={onChange}
          />
        </p>
      </div>
      {showAnswers && (
        <p className={value === answers[i] ? "text-green-500" : "text-red-500"}>
          {value === answers[i] ? "true" : `Correct answer: ${answers[i]}`}
        </p>
      )}
    </div>
  );
}

export default Question;
