import React, { useState, useEffect } from "react";
import { generateOptions, generateRandomColor } from "../../utilities/common";

const ColorGame = () => {
  const [correctColor, setCorrectColor] = useState("");
  const [options, setOptions] = useState([]);
  const [resultMessage, setResultMessage] = useState("");
  const [waitingTime, setWaitingTime] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  useEffect(() => {
    if (waitingTime > 0) {
      const timer = setTimeout(() => {
        generateNewQuestion();
        setWaitingTime(0);
      }, waitingTime);
      return () => clearTimeout(timer);
    }
  }, [waitingTime]);

  useEffect(() => {
    let countdownTimer;
    if (waitingTime > 0) {
      countdownTimer = setInterval(() => {
        setWaitingTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else {
      clearInterval(countdownTimer);
    }
    return () => clearInterval(countdownTimer);
  }, [waitingTime]);

  const generateNewQuestion = () => {
    const newCorrectColor = generateRandomColor();
    const newOptions = generateOptions(newCorrectColor);
    setCorrectColor(newCorrectColor);
    setOptions(newOptions);
    setResultMessage("");
    setSelectedOption(null);
  };

  const handleOptionClick = (color) => {
    setSelectedOption(color);
    if (color === correctColor) {
      setResultMessage("Correct!");
    } else {
      setResultMessage("Wrong! Try again.");
    }
    setWaitingTime(2000);
  };

  const formatTime = (ms) => {
    const seconds = Math.ceil(ms / 1000);
    return seconds;
  };

  return (
    <div className="container">
      <p>
        Pick a color{" "}
        {formatTime(waitingTime) > 0 && `(${formatTime(waitingTime)})`}
      </p>

      <div className="result-message">
        <p>{resultMessage}</p>
      </div>

      <div className="color-box" style={{ backgroundColor: correctColor }} />

      <div className="options">
        {options.map((color, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedOption === color ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(color)}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorGame;
