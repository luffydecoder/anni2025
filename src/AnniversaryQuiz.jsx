// AnniversaryQuiz.jsx
import { useState } from "react";

const quizData = [
  {
    question: "What’s my go-to order when I’m too lazy to cook?",
    options: [
      "Chicken rice",
      "7-Eleven sandwich",
      "Instant noodle with egg",
      "Whatever you’re eating",
    ],
    answer: 2, // index
  },
  {
    question: "When did I first say 'I love you'?",
    options: [
      "In a text",
      "On a call",
      "In person while panicking",
      "I still haven’t, lol",
    ],
    answer: 2,
  },
  {
    question: "What do I do when I’m nervous?",
    options: [
      "Talk too much",
      "Go silent and stare at wall",
      "Fidget like a raccoon on Red Bull",
      "Make dumb jokes",
    ],
    answer: 2,
  },
];

export default function AnniversaryQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === quizData[currentQ].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQ + 1 < quizData.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const getResultMessage = () => {
    if (score === quizData.length) return "Okay, you *do* know me. Proud of you 💘";
    if (score >= quizData.length / 2) return "Not bad... but are we even dating?? 😏";
    return "Wow. I’m hurt. Are you even my girlfriend??? 😭";
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">🎉 Anniversary Quiz 🎉</h1>
      {!finished ? (
        <div>
          <h2 className="text-xl mb-4">{quizData[currentQ].question}</h2>
          <div className="space-y-3">
            {quizData[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full py-2 px-4 rounded-xl border transition-all ${
                  selected === idx
                    ? idx === quizData[currentQ].answer
                      ? "bg-green-200 border-green-400"
                      : "bg-red-200 border-red-400"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">You scored {score}/{quizData.length}!</h2>
          <p className="mt-4 text-lg">{getResultMessage()}</p>
        </div>
      )}
    </div>
  );
}
