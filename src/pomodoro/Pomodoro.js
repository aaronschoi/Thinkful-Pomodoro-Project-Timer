import React, { useEffect, useState } from "react";
import classNames from "../utils/class-names";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import MainTimer from "./MainTimer";

export default function Pomodoro() {
  // Timer starts out paused

  const [state, setState] = useState({
    timerRunning: false,
    focusDuration: 1500,
    breakDuration: 300,
    timer: 1500,
    stop: false,
    firstPlayPress: 0,
    progressBar: 0.0,
    isOnBreak: false,
    audio: false
  });

  useEffect(()=>{
    if(state.audio){
    new Audio(`https://onlineclock.net/audio/options/default.mp3`).play()}
  }, [state.audio])

  function playPause() {
    if (state.firstPlayPress === 0) {
      setState({
        ...state,
        timerRunning: true,
        timer: state.focusDuration,
        firstPlayPress: 1,
      });
    } else if (state.timerRunning) {
      setState({
        ...state,
        timerRunning: false,
      });
    } else {
      setState({
        ...state,
        timerRunning: true,
      });
    }
  }

  function stop() {
    setState({
      ...state,
      stop: true,
      timerRunning: false,
      firstPlayPress: 0,
      focusDuration: 1500,
      breakDuration: 300,
      timer: 1500,
      progressBar: 0,
      audio: false
    });
    setState({...state, stop: false});
  }

  const handleClick = (event) => {
    //if i want this to be faster, I should probably make a cleanup function to cancel the last click
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
      default:
        console.log("error");
    }
  };

  const handleIncreaseFocusDuration = () => {
    if (state.focusDuration <= 3300)
      setState({ ...state, focusDuration: state.focusDuration + 300 });
  };

  const handleDecreaseFocusDuration = () => {
    if (state.focusDuration >= 600)
      setState({ ...state, focusDuration: state.focusDuration - 300 });
  };

  const handleIncreaseBreakDuration = () => {
    if (state.breakDuration <= 840)
      setState({ ...state, breakDuration: state.breakDuration + 60 });
  };

  const handleDecreaseBreakDuration = () => {
    if (state.breakDuration >= 120)
      setState({ ...state, breakDuration: state.breakDuration - 60 });
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              <FocusDuration duration={state.focusDuration} />
            </span>
            <div className="input-group-append">
              <button //decrease focus
                id="decreaseFocusButton"
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={handleClick}
                disabled={state.timerRunning || state.stop}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                id="increaseFocusButton"
                type="button" //increase focus
                className="btn btn-secondary focusButtonIncrease"
                data-testid="increase-focus"
                onClick={handleClick}
                disabled={state.timerRunning || state.stop}
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
                <BreakDuration duration={state.breakDuration} />
              </span>
              <div className="input-group-append">
                <button //decrease break
                  id="decreaseBreakButton"
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={handleClick}
                  disabled={state.timerRunning || state.stop}
                >
                  <span className="oi oi-minus" />
                </button>
                <button //increase break
                  id="increaseBreakButton"
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={handleClick}
                  disabled={state.timerRunning || state.stop}
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
                  "oi-media-play": !state.timerRunning,
                  "oi-media-pause": state.timerRunning,
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
      <MainTimer state={state} setState={setState} />
    </div>
  );
}
