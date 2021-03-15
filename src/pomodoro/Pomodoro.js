import React, { useState } from "react";
import classNames from "../utils/class-names";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import MainTimer from "./MainTimer"

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false); //for playPause button
  const [focusDuration, setFocusDuration] = useState(1500); //use with seconds to duration
  const [breakDuration, setBreakDuration] = useState(300); //use with seconds to duration
  const [timerValue, setTimerValue] = useState(1500); //set to be the same as focusDuration start value... this will also be converted to 
  const [stopIsPressed, setStopIsPressed] = useState(false);
  const [firstPlayPress, setFirstPlayPress] = useState(0);
  const [progressBar, setProgressBar] = useState(0.00);
  const [isOnBreak, setIsOnBreak] = useState(false);

  function playPause() {
    setIsTimerRunning(prevState => !prevState);
    if(firstPlayPress === 0){
      setTimerValue(focusDuration);
      setFirstPlayPress(firstPlayPress + 2);
    };
  };

  function stop() {
    setStopIsPressed(true);
    setIsTimerRunning(false);
    setFirstPlayPress(0);
    setFocusDuration(1500);
    setBreakDuration(300);
    setTimerValue(1500);
    setProgressBar(0);
    setStopIsPressed(false);
  };

  const handleClick = event => {//if i want this to be faster, I should probably make a cleanup function to cancel the last click
    event.preventDefault();
    const button = event.target.id;
    switch (button) {
      case "decreaseFocusButton":
        handleDecreaseFocusDuration();
        break;
      case "increaseFocusButton":
        handleIncreaseFocusDuration();
        break;
      case "decreaseBreakButton":
        handleDecreaseBreakDuration();
        break;
      case "increaseBreakButton":
        handleIncreaseBreakDuration();
        break;
    };
  };

  const handleIncreaseFocusDuration = () => {
    if(focusDuration <= 3300) setFocusDuration(focusDuration + 300);
  };

  const handleDecreaseFocusDuration = () => {
    if(focusDuration >= 600) setFocusDuration(focusDuration - 300);
  };

  const handleIncreaseBreakDuration = () => {
    if(breakDuration <= 840) setBreakDuration(breakDuration + 60);
  };

  const handleDecreaseBreakDuration = () => {
    if(breakDuration >= 120) setBreakDuration(breakDuration -60);
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              <FocusDuration duration={focusDuration} />
            </span>
            <div className="input-group-append">
              <button //decrease focus
                id="decreaseFocusButton"
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={handleClick}
                disabled={isTimerRunning || stopIsPressed}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                id= "increaseFocusButton"
                type="button" //increase focus
                className="btn btn-secondary focusButtonIncrease"
                data-testid="increase-focus"
                onClick={handleClick}
                disabled={isTimerRunning || stopIsPressed}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                <BreakDuration duration={breakDuration} />
              </span>
              <div className="input-group-append">
                <button //decrease break
                  id="decreaseBreakButton"
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={handleClick}
                  disabled={isTimerRunning || stopIsPressed}
                >
                  <span className="oi oi-minus" />
                </button>
                <button //increase break
                  id="increaseBreakButton"
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={handleClick}
                  disabled={isTimerRunning || stopIsPressed}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <MainTimer 
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
        timerValue={timerValue}
        setTimerValue={setTimerValue}
        firstPlayPress={firstPlayPress}
        progressBar={progressBar}
        setProgressBar={setProgressBar}
        isOnBreak={isOnBreak}
        setIsOnBreak={setIsOnBreak}
        />
    </div>
  );
}

export default Pomodoro;
