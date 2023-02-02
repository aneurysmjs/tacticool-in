/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FunctionComponent, SyntheticEvent, useState, useCallback } from 'react';

/**
 *
 * @param {number} seconds time in seconds
 * @returns {string} formatted tiime
 */
function formatTime(seconds: number): string {
  let minutes: string | number = Math.floor(seconds / 60);
  let secs: string | number = Math.floor(seconds % 60);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (secs < 10) {
    secs = `0${secs}`;
  }

  return `${minutes}:${secs}`;
}

interface StateType {
  progress: string;
  volume: number;
  isMouseDown: boolean;
}

const initialState: StateType = {
  progress: '0%',
  volume: 1,
  isMouseDown: false,
};

interface PropsType {
  currentTime: number;
  duration: number;
  // onTimeUpdate: (percentage: number) => void;
  onScrub: (newCurrentTime: number) => void;
}

const Bar: FunctionComponent<PropsType> = ({ currentTime, duration, onScrub }: PropsType) => {
  const [state, setState] = useState(initialState);

  /**
   *
   * @param {SyntheticEvent} evt
   * @returns {void}
   */
  const scrub = useCallback(
    (evt: SyntheticEvent) => {
      const progressBar = evt.nativeEvent as MouseEvent;
      const target = evt.target as HTMLDivElement;

      /**
       * @link https://codepen.io/blackjacques/pen/bgamaj?editors=1010
       */
      const percent = (progressBar.offsetX / target.offsetWidth) * duration;

      onScrub(percent);
    },
    [duration, onScrub],
  );

  /**
   * @returns {void}
   */
  const handleMouseDown = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMouseDown: true,
    }));
  }, []);

  /**
   * @returns {void}
   */
  const handleMouseLeave = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMouseDown: false,
    }));
  }, []);

  /**
   *
   * @param {SyntheticEvent} evt
   * @returns {void}
   */
  const handleMouseMove = useCallback(
    (evt: SyntheticEvent) => {
      if (state.isMouseDown) {
        scrub(evt);
      }
    },
    [state, scrub],
  );

  const { progress } = state;

  return (
    <div className="player__control-bar">
      <span className="player__time-label">{formatTime(currentTime)}</span>
      <div
        className="progress"
        role="progressbar"
        tabIndex={-1}
        onClick={scrub}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseLeave}
      >
        <div className="progress__filled" style={{ flexBasis: progress }}></div>
      </div>
      <span className="player__time-label">{formatTime(duration)}</span>
    </div>
  );
};

export default Bar;
