import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";

export default function MainTimer({
  focusDuration,
  breakDuration,
  isTimerRunning,
  timerValue,
  setTimerValue,
  firstPlayPress,
  progressBar,
  setProgressBar,
  isOnBreak,
  setIsOnBreak,
}) {
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (firstPlayPress === 0) setTimerValue(focusDuration);
      if (timerValue > 0) {
        setTimerValue(timerValue - 1);
        if (isOnBreak) {
          setProgressBar(progressBar + 1 / breakDuration);
        } else {
          setProgressBar(progressBar + 1 / focusDuration);
        }
        return secondsToDuration(timerValue);
      } else if (timerValue === 0 && !isOnBreak) {
        setIsOnBreak(true);
        setTimerValue(breakDuration);
        setProgressBar(0);
        //setIsTimerRunning(false);
      } else if (timerValue === 0 && isOnBreak) {
        setIsOnBreak(false);
        setTimerValue(focusDuration);
        setProgressBar(0);
        //setIsTimerRunning(false);
      }
    },
    isTimerRunning ? 1000 : null
  );

  return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {isOnBreak ? (
            <h2 data-testid="session-title">
              On Break for {secondsToDuration(breakDuration)} minutes
            </h2>
          ) : (
            <h2 data-testid="session-title">
              Focusing for {secondsToDuration(focusDuration)} minutes
            </h2>
          )}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(timerValue)} remaining
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={ `${progressBar * 100}` } // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${progressBar * 100}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}
