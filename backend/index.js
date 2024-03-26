const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors());
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log("db connection is succesful!");
});
const questionsSchema = new mongoose.Schema({
  words: [String],
  answers: [String],
  diffi: String,
  questionNumber: Number,
});
const Question = mongoose.model("Question", questionsSchema, "questions");

const getAllQuestions = async (req, res) => {
  try {
    const { diffi } = req.params;
    const questions = await Question.find({ diffi });
    res.status(200).json({
      status: "succes",
      data: {
        questions,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: "Invalid data sent!" });
  }
};

app.get("/api/v1/questions/:diffi", getAllQuestions);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

/*const tempQuiz = [
  {
    words: ["apple", "car", "water"],
    answers: ["elma", "araba", "su"],
    diffi: "easy",
  },
  {
    words: ["chair", "window", "orange"],
    answers: ["sandalye", "pencere", "portakal"],
    diffi: "easy",
  },
  {
    words: ["jungle", "iron", "sword"],
    answers: ["orman", "demir", "kilic"],
    diffi: "easy",
  },
  {
    words: ["computer", "black", "fork"],
    answers: ["bilgisayar", "siyah", "catal"],
    diffi: "easy",
  },
]; */
