import React, { useEffect, useRef, useState } from "react";
import modern_track from "./modern_track.mp4";
import countryside_track from "./countryside_track.mp4";
import crash_track from "./crash_track.mp4";
import formatElapsedTime from "format-elapsed-time";

const CarRaceQuestionPopup = ({
  setQuestions,
  questions,
  bonus,
  penalty,
  playerData,
  ranking,
  theme,
  websocket,
  setStatus,
}) => {
  const [clickToStart, setClickToStart] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(countryside_track);
  const [showTextMiddleScreen, setShowTextMiddleScreen] = useState(false);
  const [textMiddleScreen, setTextMiddleScreen] = useState("3");
  const videoRef = useRef(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [score, setScore] = useState(0);

  // useEffect(() => {
  //   videoRef.current?.load();
  // }, [currentVideo]);

  useEffect(() => {
    if (theme === "modern") {
      setCurrentVideo(modern_track);
    } else if (theme == "countryside") {
      setCurrentVideo(countryside_track);
    }
    videoRef.current?.load();
  }, [theme]);

  const handleCorrectAnswer = (score) => {
    const new_timer = formatElapsedTime(currentTime, startTime + 1000 * bonus);
    setStartTime(startTime + 1000 * bonus);
    console.log(new_timer);
    if (websocket) {
      const uid = localStorage.getItem("uid");
      const sendData = {
        uid: uid,
        name: playerData[uid].name,
        point: score,
        time: new_timer,
      };
      websocket.send(JSON.stringify(sendData));
    }
    handleShowText("Correct answer. Reduce total time");
    setTimeout(() => {
      setShowTextMiddleScreen(false);
    }, 1500);
  };

  const handleWrongAnswer = () => {
    setCurrentVideo(crash_track);
    videoRef.current?.load();
    handleShowText(`Wrong answer. Stay still for ${penalty} seconds`);
    if (videoRef.current) {
      videoRef.current.play();
    }
    setTimeout(() => {
      handleVideoEnded();
      setShowTextMiddleScreen(false);
      if (theme === "modern") {
        setCurrentVideo(modern_track);
      } else if (theme == "countryside") {
        setCurrentVideo(countryside_track);
      }
      videoRef.current?.load();
    }, penalty * 1000);
    // videoRef.current.addEventListener("ended", handleVideoEnded);
  };

  const handleFinish = () => {
    setStatus("ENDED");
  };

  const handleStartRace = () => {
    setClickToStart(false);
    handleShowText("3");
    setTimeout(() => {
      handleShowText("2");
    }, 1000);
    setTimeout(() => {
      handleShowText("1");
    }, 2000);
    setTimeout(() => {
      handleShowText("Start");
    }, 3000);
    setTimeout(() => {
      setShowTextMiddleScreen(false);
      handleStartVideo();
      setRunning(true);
      setStartTime(Date.now());
    }, 3500);
  };

  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setTimeout(handleVideoEnded, 5000);
      // videoRef.current.addEventListener("ended", handleVideoEnded);
    }
  };

  const handleShowText = (text) => {
    setTextMiddleScreen(text);
    setShowTextMiddleScreen(true);
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
        <video width="100%" height="100%" ref={videoRef} loop>
          <source src={currentVideo} type="video/mp4" />
        </video>
        {questions && (
          <div className={showQuiz ? "quiz-overlay" : "d-none"}>
            <MultipleChoiceQuiz
              score={score}
              setScore={setScore}
              questions={questions}
              setQuestions={setQuestions}
              onClose={() => setShowQuiz(false)}
              startVideo={handleStartVideo}
              onCorrectAnswer={handleCorrectAnswer}
              onWrongAnswer={handleWrongAnswer}
              onFinish={handleFinish}
            />
          </div>
        )}
        <div className={showTextMiddleScreen ? "text-in-race" : "d-none"}>
          {textMiddleScreen}
        </div>
        <div className={clickToStart ? "text-in-race" : "d-none"}>
          <button onClick={handleStartRace}>Click to start</button>
        </div>
        {!clickToStart && (
          <div className="timer">
            <Timer
              startTime={startTime}
              running={running}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          </div>
        )}
        {ranking && !clickToStart && (
          <div className="score-container">
            <div style={{ fontSize: "30px" }}>Ranking</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
              }}
            >
              <div>Name</div>
              <div>Point / Time</div>
            </div>
            {ranking.map((uid, index) => (
              <div
                key={uid}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                }}
              >
                <div>
                  {index + 1}. {playerData[uid].name}
                </div>
                <div>
                  {playerData[uid].point} / {playerData[uid].time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MultipleChoiceQuiz = ({
  score,
  setScore,
  questions,
  setQuestions,
  onClose,
  startVideo,
  onCorrectAnswer,
  onWrongAnswer,
  onFinish,
}) => {
  const handleOptionClick = (option) => {
    if (option === questions[score].answer) {
      if (score === questions.length - 1) {
        onCorrectAnswer(questions.length);
        onFinish();
      } else {
        handleNextQuestion();
      }
    } else {
      onClose();
      onWrongAnswer();
      handleSkipQuestion();
    }
  };

  const handleChangeQuestionOrder = (index) => {
    let new_list = questions;
    new_list.push(new_list.splice(index, 1)[0]);
    setQuestions([...new_list]);
    localStorage.setItem("questions", JSON.stringify(new_list));
  };

  const handleSkipQuestion = () => {
    handleChangeQuestionOrder(score);
  };

  const handleNextQuestion = () => {
    onClose();
    startVideo();
    onCorrectAnswer(score + 1);
    setScore((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-container" key={questions}>
        <h1>{questions[score] ? questions[score].question : ""}</h1>
        <div className="options-container">
          <div className="options">
            {questions[score].choices.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.choice)}
                className="option-btn"
              >
                {option.choice}
              </button>
            ))}
          </div>
        </div>
        <div className="skip-question-container" onClick={handleSkipQuestion}>
          <div>Skip Question</div>
        </div>
      </div>
    </div>
  );
};

const Timer = ({ startTime, running, currentTime, setCurrentTime }) => {
  useEffect(() => {
    let interval = setInterval(() => {
      if (running) setCurrentTime(Date.now());
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <h1>
        <time>{formatElapsedTime(currentTime, startTime)}</time>
      </h1>
    </div>
  );
};

export default CarRaceQuestionPopup;
