import { useEffect, useState, useCallback } from 'react';

interface UseVideo {
  isPlaying: boolean;
}

function useVideo(): UseVideo {
  // const [video, setVideo] = useState<HTMLVideoElement>();
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);

  const handleClick = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, [setPlaying]);

  useEffect(() => {
    const player = document.querySelector('#videoPlayer') as HTMLVideoElement;

    // eslint-disable-next-line no-unused-expressions
    playing ? player.play() : player.pause();

    player?.addEventListener('click', handleClick);

    return (): void => {
      player?.removeEventListener('click', handleClick);
    };
  }, [playing, handleClick]);

  return {
    isPlaying: playing,
  };
}

export default useVideo;
