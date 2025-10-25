import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Tooltip from '@mui/material/Tooltip';
import "./MusicCard.css";
import { CurrentSongContext } from '../../../Context/SongContext';
import { toast } from 'react-toastify';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 403,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'white',
  backdropFilter: 'blur(40px)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0,0,0,0.6)',
  }),
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [paused, setPaused] = React.useState(true);
  const [volume, setVolume] = React.useState(30);
  const [showcontrol, setShowControl] = React.useState(false);
  const [toastShown, setToastShown] = React.useState(false);
  const audioRef = React.useRef(null);
  const { songData } = React.useContext(CurrentSongContext);

  React.useEffect(() => {
    if (!songData.songUrl) {
      setShowControl(false)
    }
    else{
      setShowControl(true)
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (!songData.songUrl) {
      return;
    }
    else{
      audioRef.current.play();
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setPosition(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    audio.play();
    setPaused(false);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [songData, toastShown]);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value % 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <>
        <div className='main-music-card' style={{ display: showcontrol ? 'block' : 'none' }}>
          <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', p: 3 }}>
            <Widget>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CoverImage>
                  <img
                    alt="Cover"
                    src={songData.coverUrl || "CoverImage"}
                  />
                </CoverImage>
                <Box sx={{ ml: 1.5, minWidth: 0 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontWeight: 500 }}
                  >
                    {songData.Artist || "Artist"}
                  </Typography>
                  <Typography noWrap>{songData.Songname || "SongName"}</Typography>
                  <Typography noWrap sx={{ letterSpacing: -0.25 }}>
                    {songData.Language || "Language"}
                  </Typography>
                </Box>
              </Box>

              <Slider
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={duration || 0}
                onChange={(_, value) => {
                  setPosition(value);
                  if (audioRef.current) audioRef.current.currentTime = value;
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -2 }}>
                <TinyText>{formatDuration(position)}</TinyText>
                <TinyText>-{formatDuration(duration - position)}</TinyText>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -1 }}>
                <IconButton
                  aria-label={paused ? 'play' : 'pause'}
                  onClick={() => {
                    if (paused) {
                      audioRef.current.play();
                    } else {
                      audioRef.current.pause();
                    }
                    setPaused(!paused);
                  }}
                >
                  {paused ? (
                    <PlayArrowRounded sx={{ fontSize: '3rem' }} />
                  ) : (
                    <PauseRounded sx={{ fontSize: '3rem' }} />
                  )}
                </IconButton>
              </Box>

              <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                <VolumeDownRounded />
                <Slider
                  aria-label="Volume"
                  value={volume}
                  min={0}
                  max={100}
                  onChange={(_, value) => {
                    setVolume(value);
                    if (audioRef.current) audioRef.current.volume = value / 100;
                  }}
                />
                <VolumeUpRounded />
              </Stack>
            </Widget>
            <audio ref={audioRef} src={songData.songUrl || ""} preload="auto" />
          </Box>
        </div>
      <div className="music-toogle-btn" onClick={() => setShowControl(!showcontrol)}>
        <Tooltip title="Expand Controller" placement="top-start">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/>
          </svg>
        </Tooltip>
      </div>
    </>
  );
}
