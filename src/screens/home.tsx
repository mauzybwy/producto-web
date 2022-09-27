/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useStopwatch } from "react-use-precision-timer";

import { DefaultColors } from "style/colors";
import { Timer } from "models/timer";
import { toTimestring } from "utils/strutils";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ProductoHome () {
  const [activeTimerIdx, setActiveTimerIdx] = useState(null);
  const [timers, setTimers] = useState<Timer[]>([
    {
      name: "alluder",
      runtime: 0,
    },
    {
      name: "cinemetrics",
      runtime: 0,
    },
    {
      name: "producto",
      runtime: 0,
    },
    {
      name: "vintnox",
      runtime: 0,
    },
    {
      name: "weeding",
      runtime: 0,
    },
    {
      name: "butts",
      runtime: 0,
    },
  ]);

  const updateTimerAtIdx = (idx: string, key: string, val: any) => {
    let copy = [...timers];
    copy[idx][key] = Math.trunc(val);
    setTimers(copy);
  }

  const stopwatch = useStopwatch();
  const activeTimer = timers[activeTimerIdx];
  const totalTime = timers.reduce((accum, timer) => accum + timer.runtime, 0);

  const handleClickTimer = (idx: number) => {
    updateActiveTimer();

    if (idx === activeTimerIdx) {
      stopwatch.pause();
      setActiveTimerIdx(null);
    } else {
      stopwatch.start();
      setActiveTimerIdx(idx);
    }
  }

  const updateActiveTimer = () => {
    if (activeTimer) {
      const newTime = stopwatch.getElapsedRunningTime() / 1000 + (activeTimer.runtime || 0);
      updateTimerAtIdx(activeTimerIdx, 'runtime', newTime);
    }
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
        <Player
          size="xl"
          stopwatch={stopwatch}
          runtime={totalTime}
        />
        <Box display="flex" style={{ gap: "16px" }}>
          {timers.map((timer, idx) => (
            <TimerButton
              key={timer.name}
              timer={timer}
              neutral={activeTimerIdx === null}
              active={activeTimerIdx === idx}
              onClick={() => handleClickTimer(idx)}
              stopwatch={stopwatch}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Player = ({
  size,
  stopwatch,
  runtime,
}: {
  size?: "sm"|"md"|"lg"|"xl",
  stopwatch: any,
  runtime: number
}) => {
  const [forceRender, setForceRender] = useState(false);

  const variant = {
    "sm": "h6",
    "md": "h4",
    "lg": "h2",
    "xl": "h1",
  }[size] || "h4";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setForceRender(!forceRender);
    }, 200);
    
    return () => {
      clearTimeout(timeout);
    };
  })

  if (stopwatch.isRunning()) {
    runtime += stopwatch.getElapsedRunningTime() / 1000;
  }
  
  return (
    //@ts-ignore
    <Typography variant={variant}>
      {toTimestring(runtime)}
    </Typography>
  );
}

/****************************************************************************/

const TimerButton = ({
  timer,
  neutral,
  active,
  onClick,
  stopwatch,
} : {
  timer: Timer
  neutral: boolean,
  active: boolean,
  onClick: any,
  stopwatch: any
}) => {
  let runtime = timer.runtime
  if (active && stopwatch.isRunning()) {
    runtime += stopwatch.getElapsedRunningTime() / 1000;
  }
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{
        gap: "8px",
        opacity: neutral || active ? "100%" : "40%",
      }}
    >
      <Box
        p="16px"
        display="flex"
        onClick={onClick}
        sx={{
          border: "2px solid",
          borderColor: active ? DefaultColors.accent : DefaultColors.text,
        }}
        className="interact"
      >
        <Typography variant="h5">
          {timer.name}
        </Typography>
      </Box>
      <Player
        size="sm"
        stopwatch={stopwatch}
        runtime={runtime}
      />
    </Box>
  )
}
