/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { Timer } from "models/timer";
import Stopwatch from "components/stopwatch";
import CTA from "components/cta";
import LoadingAnimation from "components/loading-animation";
import { useActivity } from "hooks/activity";
import { useTimers } from "hooks/timers";
import { useMobileCheck } from "hooks/mobile";
import { checkIsExtension } from "extension/services/environment-service";
import { DefaultColors } from "style/colors";

import { ChevronLeft, ChevronRight } from "tabler-icons-react";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ProductoHome () {
  const isExtension = checkIsExtension();
  const isMobile = useMobileCheck();
  const { activity, updateActivity } = useActivity();
  const { timers, updateTimer, clearTimers } = useTimers();
  const [loading, setLoading] = useState(true);
  const [countUp, setCountUp] = useState(true);
  const [countdownTime, setCountdownTime] = useState(900);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [])

  const [activeTimerId, setActiveTimerId] = useState(null);

  const totalTime = timers.reduce((accum, timer) => accum + timer.runtime, 0);
  const activeTimer = timers.find(timer => timer.id === activeTimerId);

  const handleClickTimer = async (timer: Timer) => {
    updateActiveTimer();

    updateActivity({
      ...activity,
      timer: timer.id === activeTimerId ? null : timer.id,
    });

    const url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=d002d9f577024aa8841db563c35cfc89&deviceId=f928bcf493074fe6ab3859920c587cfb&text=${timer.id === activeTimerId ? "un" : ""}block_apps`
    await fetch(url, {
      method: "GET",
    });
  }

  const handleNewSession = () => {
    if (activeTimerId) {
      handleClickTimer(activeTimer)
    }
    clearTimers();
  }

  useEffect(() => {
    if (activity) {
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

  const handleClickUpDown = () => {
    if (activeTimer) {
      handleClickTimer(activeTimer)
    }
    setCountUp(!countUp)
  }

  const handleDecrementCountdown = () => {
    if (countdownTime > 600) {
      setCountdownTime(countdownTime - 300);
    }
  }

  const handleIncrementCountdown = () => {
    if (countdownTime < 7200) {
      setCountdownTime(countdownTime + 300);
    }
  }
  
  return loading ? (
    <LoadingAnimation />
  ) : (
    <Box
      pt={(isMobile && !isExtension) ? "96px" : undefined}
      width={isMobile ? "100%" : "100vw"}
      height={isMobile ? "100%" : "100vh"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={isMobile ? "16px" : "0px"}
        style={{
          gap: "16px",
        }}
      >
        <Box display="flex" alignItems="center" style={{ gap: "16px" }}>
          {!countUp && !activeTimerId && (
            <ChevronLeft
              size="32px"
              className="interact"
              onClick={handleDecrementCountdown}
            />
          )}
          <Stopwatch
            active
            countdown={!countUp}
            size={isMobile ? "md" : "xl"}
            offset={countUp ? totalTime : countdownTime}
            onCountdownFinish={() => {}}
          />
          {!countUp && !activeTimerId && (
            <ChevronRight
              size="32px"
              className="interact"
              onClick={handleIncrementCountdown}
            />
          )}
        </Box>
        <Box
          width={isMobile ? "100%" : undefined}
          display="flex"
          style={{ gap: "8px" }}
        >
          <CTA
            disable={activeTimerId && !countUp}
            title="+ new session"
            onClick={handleNewSession}
            style={{ flex: 1, width: isMobile ? "100%" : "300px" }}
          />
          <CTA
            disable={activeTimerId && !countUp}
            title={countUp ? "up" : "down"}
            onClick={handleClickUpDown}
            style={{ width: "100px" }}
          />
        </Box>
        <Box /> {/* GAP */}
        <TimerButtons
          disable={activeTimerId && !countUp}
          timers={timers}
          activeTimerId={activeTimerId}
          onClickTimer={handleClickTimer}
        />
      </Box>
    </Box>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const TimerButtons = ({ timers, activeTimerId, onClickTimer, disable }) => {
  const isMobile = useMobileCheck();
  
  return (
    <Box
      display="flex"
      style={{
        gap: isMobile ? "32px" : "16px",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}
    >
      {timers.map((timer, idx) => (
        <TimerButton
          key={timer.name}
          disable={disable}
          timer={timer}
          neutral={activeTimerId === null}
          active={activeTimerId === timer.id}
          onClick={() => onClickTimer(timer)}
          style={{ width: isMobile ? "100%" : undefined }}
        />
      ))}
    </Box>
  );
}

/****************************************************************************/

const TimerButton = ({
  timer,
  neutral,
  active,
  onClick,
  style,
  disable,
} : {
  timer: Timer
  neutral: boolean,
  active: boolean,
  onClick: any,
  style?: any,
  disable?: boolean,
}) => {
  const isMobile = useMobileCheck();
  
  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "row" : "column"}
      alignItems="center"
      justifyContent={isMobile ? "space-between" : undefined}
      style={{
        gap: "8px",
        opacity: neutral || active ? "100%" : "40%",
        ...style,
      }}
    >
      <CTA
        disable={disable}
        variant="h5"
        title={timer.name}
        style={{
          borderColor: active ? DefaultColors.accent : DefaultColors.text,
          padding: isMobile ? "8px" : "16px",
          opacity: active ? "100%" : undefined
        }}
        onClick={onClick}
      />
      <Stopwatch
        size="sm"
        offset={timer.runtime}
        active={active}
      />
    </Box>
  )
}
