import Question from "./Question";
function Questions({ tempQuiz, index, formValues, handleFormChange }) {
  return (
    <ul>
      {tempQuiz.map((question) => (
        <Question
          questionObj={question}
          key={question.id}
          index={index}
          formValues={formValues}
          handleFormChange={handleFormChange}
        />
      ))}
    </ul>
  );
}

export default Questions;
