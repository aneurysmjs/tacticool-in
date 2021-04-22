/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FunctionComponent, SyntheticEvent, useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeDown, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
// import Spinner from '~/components/base/Spinner';

import dutch from '~/assets/video/dutch_mgl-rtfm_depo-control.webm';

import './TacticPlayer.scss';

interface PropsType {
  onPlay?: (evt: SyntheticEvent) => void;
  onPause?: (evt: SyntheticEvent) => void;
}

interface StateType {
  progress: number;
  progressPercent: string;
  playbackRate: number;
  volume: number;
  isMouseDown: boolean;
}

const initialState: StateType = {
  progress: 0,
  progressPercent: '0%',
  playbackRate: 1,
  volume: 1,
  isMouseDown: false,
};

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

function filterProgressBar(evt: SyntheticEvent) {}

/**
 * Wrapper for video's currentTime and duration.
 *
 * @param {number} time time to display
 * @returns JSX.Element
 */
function labelTime(time: number): JSX.Element {
  return <span className="player__time-label">{formatTime(time)}</span>;
}

const TacticPlayer: FunctionComponent<PropsType> = ({ onPlay, onPause }: PropsType) => {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [, rerender] = useState(() => {});
  const [seekTime, setSeekTime] = useState(0);

  const [state, setState] = useState(initialState);

  /**
   * Plays the video.
   *
   * @param {SyntheticEvent} evt
   * @returns {void}
   */
  const handlePlay = (evt: SyntheticEvent): void => {
    video.current?.play();
    setPlaying(true);

    if (onPlay) {
      onPlay(evt);
    }
  };

  /**
   * Pauses the video.
   *
   * @param {SyntheticEvent} evt
   * @returns {void}
   */
  const handlePause = (evt: SyntheticEvent): void => {
    video.current?.pause();
    setPlaying(false);

    if (onPause) {
      onPause(evt);
    }
  };

  /**
   * @returns {void}
   */
  const togglePlay = useCallback(() => {
    const method = video.current?.paused ? 'play' : 'pause';
    video.current?.[method]();
  }, []);

  /**
   * @returns {void}
   */
  const handleProgress = useCallback(() => {
    let rawProgress = 0;
    let percent = '0';

    if (video.current) {
      rawProgress = video.current.currentTime / video.current.duration;
      percent = `${(video.current.currentTime / video.current.duration) * 100}%`;
    }

    // const other = Math.floor((100 / video.current?.duration) * video.current?.currentTime);

    setState((prevState) => ({
      ...prevState,
      progress: rawProgress,
      progressPercent: percent,
    }));
  }, []);

  /**
   *
   * @param {SyntheticEvent} evt
   * @returns {void}
   */
  const handleRangeUpdate = useCallback((evt: SyntheticEvent) => {
    const { name, value } = evt.target as HTMLInputElement;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (video.current) {
      video.current[name] = value;
    }
  }, []);

  /**
   *
   * @param {SyntheticEvent} evt
   * @returns {void}
   */
  const scrub = useCallback((evt: SyntheticEvent) => {
    const progressBar = evt.nativeEvent as MouseEvent;
    const target = evt.target as HTMLDivElement;

    console.log('evt.target', evt.target);

    /**
     * @link https://codepen.io/blackjacques/pen/bgamaj?editors=1010
     */
    const percent = (progressBar.offsetX / target.offsetWidth) * video.current!.duration;

    if (!Number.isNaN(percent) && video.current) {
      video.current.currentTime = percent;
    }
  }, []);

  /**
   * @returns {void}
   */
  const handleMouseDown = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMouseDown: true,
    }));
  }, []);

  // const endMouseDown = (): void => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     isMouseDown: false,
  //   }));
  // };

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

  /**
   *
   * @param {SyntheticEvent} evt
   * @returns {void}
   */
  const skip = useCallback((evt: SyntheticEvent) => {
    const target = evt.target as HTMLVideoElement;
    const skipValue = target.attributes[1].value;

    if (!Number.isNaN(skipValue)) {
      if (video.current) {
        video.current.currentTime += Number(skipValue);
      }
    }
  }, []);

  /**
   * Toggles video's volume.
   *
   * @returns {void}
   */
  const handleMute = useCallback(() => {
    if (video.current) {
      video.current.muted = !video.current.muted;
      rerender();
    }
  }, []);

  const { progress, playbackRate, volume } = state;

  console.log('progress', progress);

  return (
    <div className="player">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={video}
        className="player__video viewer"
        src={dutch}
        onClick={togglePlay}
        // onPause={handlePause}
        // onPlay={handlePlay}
        onTimeUpdate={handleProgress}
      />

      <div className="player__controls-container">
        <div className="player__controls">
          <div className="player__control-bar">
            {video.current && labelTime(video.current?.currentTime)}
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
              <div className="progress__backdrop" />
              <div className="progress__filled" style={{ transform: `scaleX(${progress})` }}></div>
            </div>
            {video.current && labelTime(video.current?.duration)}
          </div>

          <div className="player__buttons">
            <button className="player__button" title="Toggle Play" onClick={togglePlay}>
              {<FontAwesomeIcon icon={video.current?.paused ? faPlay : faPause} />}
            </button>
            <button className="player__button" title="Toggle volume" onClick={handleMute}>
              {
                <FontAwesomeIcon
                  icon={video.current?.muted ? faVolumeMute : faVolumeDown}
                  size="lg"
                />
              }
            </button>

            <input
              className="player__volume-slider"
              max="1"
              min="0"
              name="volume"
              step="0.05"
              type="range"
              value={volume}
              onChange={handleRangeUpdate}
            />
          </div>

          {/* <input
          className="player__slider"
          max="2"
          min="0.5"
          name="playbackRate"
          step="0.1"
          type="range"
          value={playbackRate}
          onChange={handleRangeUpdate}
        /> */}

          {/* <button className="player__button" data-skip="-10" onClick={skip}>
          « 10s
        </button>

        <button className="player__button" data-skip="25" onClick={skip}>
          25s »
        </button> */}
        </div>
      </div>
    </div>
  );
};
export default TacticPlayer;
