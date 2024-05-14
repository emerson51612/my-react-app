import React, { useEffect, useRef, useState } from "react";
import "./car_race_question_popup.css";
import video from "./video.mp4";
import video_sound from "./video_sound.mp4";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    // Add more questions here
  ]);

  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.addEventListener("ended", handleVideoEnded);
    }
  };

  const handleVideoEnded = () => {
    setShowQuiz(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div>
      <div className="video-container">
        <video width="100%" height="100%" ref={videoRef} onClick={handleStartVideo}>
          <source src={video_sound} type="video/mp4" />
        </video>
        {showQuiz && (
          <div className="quiz-overlay">
            <MultipleChoiceQuiz
              questions={quizQuestions}
              onClose={() => setShowQuiz(false)}
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

const MultipleChoiceQuiz = ({ questions, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-overlay">
      <div className="score-container">Your Score:</div>
      <div className="quiz-container">
        <h1>{currentQuestion.question}</h1>
        <div className="options-container">
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`option-btn ${
                  selectedOption === option ? "selected" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {selectedOption && (
          <div>
            <p>
              You selected: <strong>{selectedOption}</strong>
            </p>
            {selectedOption === currentQuestion.answer ? (
              <p>Correct!</p>
            ) : (
              <p>Incorrect. The correct answer is: {currentQuestion.answer}</p>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion}>Next Question</button>
            ) : (
              <button onClick={onClose}>Close Quiz</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
