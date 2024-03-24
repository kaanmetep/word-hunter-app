import Question from "./Question";
function Questions({
  tempQuiz,
  index,
  formValues,
  handleFormChange,
  showAnswers,
}) {
  return (
    <ul>
      {tempQuiz.map((question) => (
        <Question
          questionObj={question}
          key={question.id}
          index={index}
          formValues={formValues}
          handleFormChange={handleFormChange}
          showAnswers={showAnswers}
        />
      ))}
    </ul>
  );
}

export default Questions;
