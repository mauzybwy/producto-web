/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useStopwatch } from "react-use-precision-timer";

import { DefaultColors } from "style/colors";
import { Timer } from "models/timer";
import { toTimestring } from "utils/strutils";

import { PlayerPlay, PlayerPause } from "tabler-icons-react";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ProductoHome () {
  const [selectedTimerIdx, setSelectedTimerIdx] = useState(null);
  const [timers, setTimers] = useState<Timer[]>([
    {
      name: "alluder",
      runtime: 0,
      active: false,
    },
    {
      name: "cinemetrics",
      runtime: 0,
      active: false,
    },
    {
      name: "producto",
      runtime: 0,
      active: false,
    },
    {
      name: "vintnox",
      runtime: 0,
      active: false,
    },
    {
      name: "weeding",
      runtime: 0,
      active: false,
    },
    {
      name: "butthole",
      runtime: 0,
      active: false,
    },
  ]);

  const stopwatch = useStopwatch();
  const selectedTimer = timers[selectedTimerIdx];
  const activeTimerIdx = timers.reduce((accum, timer, idx) => {
      if (accum === null && timer.active) {
        return idx;
      } else {
        return accum;
      }
  }, null) as number;
  const activeTimer = timers[activeTimerIdx];

  const handleClickTimer = (idx) => {
    setSelectedTimerIdx(selectedTimerIdx === idx ? activeTimerIdx : idx);
  }

  const playPauseStopwatch = () => {
    var active = false;
    
    if (stopwatch.isRunning()) {
      stopwatch.pause();
      console.log("PAUSE")
      active = false;
    } else if (stopwatch.isStarted()) {
      stopwatch.resume();
      console.log("RESUME")
      active = true;
    } else {
      stopwatch.start();
      console.log("START")
      active = true;
    }

    return active;
  }

  const updateActiveTimer = () => {
    if (activeTimer) {
      const newTime = stopwatch.getElapsedRunningTime() / 1000 + (activeTimer.runtime || 0);
      console.log(newTime);
      handleRuntimeChange(activeTimerIdx, newTime);
    }
  }

  const handlePlayPause = () => {
    let copy = [...timers];
    for (var idx = 0; idx < copy.length; idx++) {
      let timer = copy[idx];
      let active = false;

      if (idx === selectedTimerIdx) {
        if (timer.active) {
          active = playPauseStopwatch();
          const newTime = stopwatch.getElapsedRunningTime() / 1000 + (timer.runtime || 0);
          handleRuntimeChange(idx, newTime);
        } else {
          stopwatch.start();
          updateActiveTimer();
          active = true;
        }
      }

      timer.active = active;
    }

    setTimers(copy);
  }

  const handleRuntimeChange = (idx, time) => {
    let copy = [...timers];
    copy[idx].runtime = time

    setTimers(copy);
  }
  
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ gap: "32px" }}
      >
        <Box display="flex" style={{ gap: "16px" }}>
          {timers.map((timer, idx) => (
            <TimerButton
              key={timer.name}
              timer={timer}
              selected={selectedTimerIdx === idx}
              neutral={selectedTimerIdx === null}
              onClick={() => handleClickTimer(idx)}
            />
          ))}
        </Box>
        <Player
          timer={selectedTimer}
          onPlayPause={handlePlayPause}
          stopwatch={stopwatch}
        />
      </Box>
    </Box>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Player = ({
  timer,
  onPlayPause,
  stopwatch,
}: {
  timer: Timer,
  onPlayPause: any,
  stopwatch: any,
}) => {
  const [forceRender, setForceRender] = useState(false);
  
  const PlayerButton = timer?.active ? PlayerPause : PlayerPlay;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setForceRender(!forceRender);
    }, 200);
    
    return () => {
      clearTimeout(timeout);
    };
  })

  const elapsedTime = stopwatch.getElapsedRunningTime() / 1000 + (timer?.runtime || 0);

  return (
    <Box
      display="flex"
      alignItems="center"
      style={{ opacity: !!timer ? "100%" : "40%", gap: "32px" }}
    >
      <Typography variant="h1">
        {toTimestring(timer?.active ? elapsedTime : timer?.runtime)}
      </Typography>
      <PlayerButton
        className={!!timer ? "interact" : ""}
        size="72px"
        onClick={!!timer ? onPlayPause : () => {}}
      />
    </Box>
  );
}

/****************************************************************************/

const TimerButton = ({
  timer,
  selected,
  neutral,
  onClick,
} : {
  timer: Timer
  selected: boolean,
  neutral: boolean,
  onClick: any,
}) => {
  return (
    <Box
      p="16px"
      display="flex"
      onClick={onClick}
      sx={{
        border: "2px solid",
        borderColor: timer.active ? DefaultColors.accent : DefaultColors.text,
        opacity: selected || neutral || timer.active ? "100%" : "40%",
      }}
      className="interact"
    >
      <Typography variant="h5">
        {timer.name}
      </Typography>
    </Box>
  )
}
