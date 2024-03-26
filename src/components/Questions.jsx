import Question from "./Question";
function Questions({ questions, index, formValues, handleFormChange }) {
  return (
    <ul>
      {questions.map((question) => (
        <Question
          questionObj={question}
          key={question._id}
          index={index}
          formValues={formValues}
          handleFormChange={handleFormChange}
        />
      ))}
    </ul>
  );
}

export default Questions;
