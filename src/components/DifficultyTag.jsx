function DifficultyTag({ diffi }) {
  return (
    <p
      className={`${
        diffi === "easy"
          ? "bg-green-200"
          : diffi === "medium"
          ? "bg-red-200"
          : "bg-red-500"
      } absolute left-[-6px] top-[-8px] py-1 px-1 text-xs rounded-lg tracking-widest`}
    >
      {diffi}
    </p>
  );
}

export default DifficultyTag;
