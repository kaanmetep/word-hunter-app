import { useState } from "react";
function Question({ questionObj, index, formValues, handleFormChange }) {
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
          />
        ))}
    </li>
  );
}

function Word({ word, name, value, onChange, answers, i }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-orange-200 py-2 px-6 rounded-lg text-center">
        <p className="text-sm md:text-lg">{word}</p>
        <p>
          <input
            type="text"
            className="rounded-lg pl-2"
            name={name}
            value={value}
            onChange={onChange}
            maxLength={12}
          />
        </p>
      </div>
    </div>
  );
}

export default Question;
