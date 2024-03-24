function Answers({ answered, tempQuiz, index }) {
  return (
    <div>
      <ul className="flex flex-col justify-between item-center h-48">
        {answered.map((a, i) => (
          <li
            className={`${a === true ? "text-green-600" : "text-red-600"} `}
            key={i}
          >
            {a === true
              ? "True"
              : `Correct Answer:${tempQuiz[index].answers[i]}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Answers;
