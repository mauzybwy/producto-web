/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useStopwatch } from "react-use-precision-timer";

import { DefaultColors } from "style/colors";
import { Timer } from "models/timer";
import { toTimestring } from "utils/strutils";
import { useActivity } from "hooks/activity";
import { useTimers } from "hooks/timers";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ProductoHome () {
  const { activity, updateActivity } = useActivity();
  const { timers, updateTimer } = useTimers();

  const [activeTimerId, setActiveTimerId] = useState(null);

  const stopwatch = useStopwatch();
  const totalTime = timers.reduce((accum, timer) => accum + timer.runtime, 0);
  const activeTimer = timers.find(timer => timer.id === activeTimerId);

  const handleClickTimer = (timer: Timer) => {
    /* updateActiveTimer(); */

    if (timer.id === activeTimerId) {
      /* stopwatch.pause(); */
      updateActivity({
        ...activity,
        timer: null,
      });
    } else {
      /* stopwatch.start(); */
      updateActivity({
        ...activity,
        timer: timer.id,
      });
    }
  }

  useEffect(() => {
    if (activity) {
      updateActiveTimer();
      
      if (activity.timer) {
        stopwatch.start();
      } else {
        stopwatch.pause();
      }
      setActiveTimerId(activity.timer);
    }
  }, [activity])

  const updateActiveTimer = () => {
    if (activeTimer) {
      const newTime = stopwatch.getElapsedRunningTime() / 1000 + (activeTimer.runtime || 0);
      updateTimer(activeTimer, {
        ...activeTimer,
        runtime: Math.trunc(newTime),
      });
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
        <Stopwatch
          active
          size="xl"
          stopwatch={stopwatch}
          offset={totalTime}
        />
        <Box display="flex" style={{ gap: "16px" }}>
          {timers.map((timer, idx) => (
            <TimerButton
              key={timer.name}
              timer={timer}
              neutral={activeTimerId === null}
              active={activeTimerId === timer.id}
              onClick={() => handleClickTimer(timer)}
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

const Stopwatch = ({
  size,
  stopwatch,
  offset,
  active,
}: {
  size?: "sm"|"md"|"lg"|"xl",
  stopwatch: any,
  offset: number,
  active?: boolean,
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

  let runtime = offset;
  if (active && stopwatch.isRunning()) {
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
      <Stopwatch
        size="sm"
        stopwatch={stopwatch}
        offset={timer.runtime}
        active={active}
      />
    </Box>
  )
}
