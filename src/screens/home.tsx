/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

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

  const totalTime = timers.reduce((accum, timer) => accum + timer.runtime, 0);
  const activeTimer = timers.find(timer => timer.id === activeTimerId);

  const handleClickTimer = (timer: Timer) => {
    updateActiveTimer();

    updateActivity({
      ...activity,
      timer: timer.id === activeTimerId ? null : timer.id,
    });
  }

  useEffect(() => {
    if (activity) {
      /* updateActiveTimer(); */
      setActiveTimerId(activity.timer);
    }
  }, [activity])

  const updateActiveTimer = () => {
    if (activeTimer) {
      const diff = (Date.now() / 1000) - activity.timeUpdated.seconds;
      updateTimer(activeTimer, {
        ...activeTimer,
        runtime: activeTimer.runtime + Math.trunc(diff),
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
  offset,
  active,
}: {
  size?: "sm"|"md"|"lg"|"xl",
  offset: number,
  active?: boolean,
}) => {
  const [forceRender, setForceRender] = useState(false);
  const { activity } = useActivity();

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
  if (active && activity?.timer) {
    const diff = (Date.now() / 1000) - activity.timeUpdated.seconds;
    runtime += diff;
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
} : {
  timer: Timer
  neutral: boolean,
  active: boolean,
  onClick: any,
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
        offset={timer.runtime}
        active={active}
      />
    </Box>
  )
}
