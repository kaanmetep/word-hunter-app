function Answers({ answered, tempQuiz, index }) {
  return (
    <div>
      <ul className="flex flex-col justify-between item-center h-48">
        {answered.map((a, i) => (
          <li key={i}>
            {a === true ? (
              <div className="flex gap-1 text-green-600 text-base">
                <p>✔</p>
                <p>True</p>
              </div>
            ) : (
              <div className="flex gap-1 text-xs items-center justify-start">
                <span>❌</span>
                <p className="text-red-400">
                  Correct Answer:
                  <span className="ml-1 text-red-600 bg-red-200 py-1 px-2 rounded-lg">{`${tempQuiz[index].answers[i]}`}</span>
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Answers;
