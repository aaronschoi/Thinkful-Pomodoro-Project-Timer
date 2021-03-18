import React from "react";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";

export default function MainTimer({ state, setState }) {
  useInterval(
    () => {
      //ToDo: Implement what should happen when the timer is running
      if (state.firstPlayPress === 0) {
        setState({ ...state, timer: state.focusDuration });
      }

      if (state.timer === 0 && state.firstPlayPress === 2) {
        setState({
          ...state,
          isOnBreak: true,
          timerRunning: false,
          timer: state.focusDuration,
          progressBar: 0.0,
          firstPlayPress: 2,
          audio: true
        });
        return;
      }

      if (state.timer === 0 && state.firstPlayPress === 1) {
        setState({
          ...state,
          isOnBreak: true,
          timerRunning: false,
          timer: state.breakDuration,
          progressBar: 0.0,
          firstPlayPress: 2,
          audio: true
        });
        return;
      }

      if (state.isOnBreak) {
        setState({
          ...state,timer: state.timer - 1,
          progressBar: state.progressBar + 1 / state.breakDuration,
          audio: false
        });
        return;
      } else {
        setState({
          ...state,timer: state.timer - 1,
          progressBar: state.progressBar + 1 / state.focusDuration,
          audio: false
        });
        return;
      }
    },
    state.timerRunning ? 1000 : null
  );

  return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {state.isOnBreak ? (
            <h2 data-testid="session-title">
              On Break for {secondsToDuration(state.breakDuration)} minutes
            </h2>
          ) : (
            <h2 data-testid="session-title">
              Focusing for {secondsToDuration(state.focusDuration)} minutes
            </h2>
          )}
          <p className="lead" data-testid="session-sub-title">
            {state.timer <= 0 ? ('00:00') : (secondsToDuration(state.timer))} remaining
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
              aria-valuenow={state.progressBar} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${state.progressBar * 100}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}
