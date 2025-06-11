// AnniversaryQuiz.jsx
import { useState, useEffect, useRef } from "react";

const quizData = [
  {
    question: "What’s my go-to order when I’m too lazy to cook?",
    options: [
      "Chicken rice",
      "7-Eleven sandwich",
      "Instant noodle with egg",
      "Whatever you’re eating",
    ],
    answer: 2,
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
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dinnerPlan, setDinnerPlan] = useState("");
  const [dinnerTime, setDinnerTime] = useState("");
  const [dinnerSubmitted, setDinnerSubmitted] = useState(false);
  const [gift, setGift] = useState("");
  const [giftSubmitted, setGiftSubmitted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

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

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
    setStarted(false);
    setDinnerPlan("");
    setDinnerTime("");
    setDinnerSubmitted(false);
    setGift("");
    setGiftSubmitted(false);
    setShowLetter(false);
  };

  const getResultMessage = () => {
    if (score === quizData.length) return "Okay, you *do* know me. Proud of you 💘";
    if (score === 0) return "...0/10?? We need to talk. Joking (or am I?) 😂";
    if (score >= quizData.length / 2) return "Not bad... but are we even dating?? 😏";
    return "Wow. I’m hurt. Are you even my girlfriend??? 😭";
  };

  useEffect(() => {
    if (finished && score === quizData.length) {
      import("canvas-confetti").then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      });
    }
  }, [finished, score]);

  useEffect(() => {
    const bgm = new Audio("/bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.3;
    if (started && !finished) {
      bgm.play().catch(() => {});
    }
    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, [started, finished]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>🎉 Anniversary Quiz 🎉</h1>
      {!started ? (
        <div>
          <p style={{ fontSize: "18px", marginBottom: "24px" }}>Welcome to the ultimate relationship test (don’t worry, it’s rigged in your favor... maybe 😏)</p>
          <button
            onClick={() => setStarted(true)}
            style={{ backgroundColor: "#ec4899", color: "white", padding: "12px 24px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" }}
          >
            Let’s Do This 💥
          </button>
        </div>
      ) : !finished ? (
        <div>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>{quizData[currentQ].question}</h2>
          <div>
            {quizData[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  backgroundColor:
                    selected === idx
                      ? idx === quizData[currentQ].answer
                        ? "#d4edda"
                        : "#f8d7da"
                      : "#ffffff",
                  border: "2px solid",
                  borderColor:
                    selected === idx
                      ? idx === quizData[currentQ].answer
                        ? "#28a745"
                        : "#dc3545"
                      : "#ccc",
                  color: "#333",
                  fontWeight: "bold",
                  padding: "12px",
                  marginBottom: "10px",
                  width: "100%",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease"
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>You scored {score}/{quizData.length}!</h2>
          <p style={{ marginTop: "16px", fontSize: "18px" }}>{getResultMessage()}</p>
        </div>
      )}
    </div>
  );
}