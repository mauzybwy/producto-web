/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Box, Typography, TextField, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Timer } from "models/timer";
import Stopwatch from "components/stopwatch";
import CTA from "components/cta";
import LoadingAnimation from "components/loading-animation";
import { useActivity } from "hooks/activity";
import { useTimers } from "hooks/timers";
import { useMobileCheck } from "hooks/mobile";
import colors from "style/colors";
import { useMe } from "hooks/users";
import { PageContainer } from "components/containers";

import { checkIsExtension } from "extension/services/environment-service";
import ExtensionConfig from "extension/config";

import { ChevronLeft, ChevronRight } from "tabler-icons-react";

const browser = ExtensionConfig.browserBase;

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ProductoHome () {
  const me = useMe();
  const isExtension = checkIsExtension();
  const isMobile = useMobileCheck();
  const navigate = useNavigate();
  const { activity, updateActivity } = useActivity();
  const { activeTimers, updateTimer, clearTimers, saveTimerSessions } = useTimers();
  const [loading, setLoading] = useState(true);
  const countdownTime = activity?.countdownTime || 900;
  const countDown = !!activity?.countDown;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const [activeTimerId, setActiveTimerId] = useState(null);

  const totalTime = activeTimers.reduce((accum, timer) => accum + timer.runtime, 0);
  const activeTimer = activeTimers.find(timer => timer.id === activeTimerId);

  const handleClickTimer = async (timer: Timer) => {
    updateActiveTimer();

    updateActivity({
      timer: timer.id === activeTimerId ? null : timer.id,
    });

    if (me?.uid === "bgvWaZTOrAUOoIlVBc0JbV8drTh1") {
      const url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=d002d9f577024aa8841db563c35cfc89&deviceId=f928bcf493074fe6ab3859920c587cfb&text=${timer.id === activeTimerId ? "un" : ""}block_apps`
      await fetch(url, {
        method: "GET",
      });
    }
  }

  const handleNewSession = async () => {
    if (activeTimerId) {
      handleClickTimer(activeTimer)
    }
    updateActivity({
      countDown: false,
    });

    await saveTimerSessions();
    await clearTimers();
  }

  const handleGiveUp = () => {
    if (activeTimerId) {
      handleClickTimer(activeTimer)
    }
  }

  const handleClickEdit = () => {
    if (activeTimerId) {
      handleClickTimer(activeTimer)
    }
    
    if (isExtension) {
      browser.tabs.create({ url: "https://producto-1cba1.web.app/manage" })
    } else {
      navigate("/manage")
    }
  }

  const handleClickSessions = () => {
    if (isExtension) {
      browser.tabs.create({ url: "https://producto-1cba1.web.app/sessions" })
    } else {
      navigate("/sessions")
    }
  }

  const handleClickBlocklist = () => {
    if (isExtension) {
      browser.tabs.create({ url: "https://producto-1cba1.web.app/blocklist" })
    } else {
      navigate("/blocklist")
    }
  }

  const handleCountdownFinish = () => {
    updateActivity({
      countDown: false,
    });
  }

  useEffect(() => {
    if (activity) {
      setActiveTimerId(activity.timer);
    }
  }, [activity])

  useEffect(() => {
    if (activeTimer && !activeTimer.timeStarted) {
      updateTimer(activeTimer, {
        timeStarted: activeTimer.timeStarted || new Date(),
      })
    }
  }, [activeTimer])

  const updateActiveTimer = () => {
    if (activeTimer) {
      const diff = (Date.now() / 1000) - activity.timeUpdated.seconds;
      updateTimer(activeTimer, {
        ...activeTimer,
        runtime: activeTimer.runtime + Math.trunc(diff),
      });
    }
  }

  const handleClickUpDown = async () => {
    if (activeTimer) {
      handleClickTimer(activeTimer)
    }

    updateActivity({
      countDown: !countDown,
    });
  }

  const handleDecrementCountdown = () => {
    if (countdownTime > 600) {
      updateActivity({
        countdownTime: countdownTime - 300,
      });
    }
  }

  const handleIncrementCountdown = () => {
    if (countdownTime < 7200) {
      updateActivity({
        countdownTime: countdownTime + 300,
      });
    }
  }
  
  return loading ? (
    <LoadingAnimation />
  ) : (
    <PageContainer>
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
          {countDown && !activeTimerId && (
            <ChevronLeft
              size="32px"
              className="interact"
              onClick={handleDecrementCountdown}
            />
          )}
          <Stopwatch
            active
            countdown={countDown}
            size={isMobile ? "md" : "xl"}
            offset={countDown ? countdownTime : totalTime}
            onCountdownFinish={handleCountdownFinish}
          />
          {countDown && !activeTimerId && (
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
            disable={activeTimerId && countDown}
            title="+ new session"
            onClick={handleNewSession}
            style={{ flex: 1, width: isMobile ? "100%" : "300px" }}
          />
          <CTA
            disable={activeTimerId && countDown}
            title={countDown ? "down" : "up"}
            onClick={handleClickUpDown}
            style={{ width: "100px" }}
          />
        </Box>
        <Box /> {/* GAP */}
        <TimerButtons
          disable={activeTimerId && countDown}
          timers={activeTimers}
          activeTimerId={activeTimerId}
          onClickTimer={handleClickTimer}
        />
        <Box display="flex" style={{ gap: "16px" }}>
          <UnderlinedButton
            onClick={countDown && activeTimerId ? handleGiveUp : handleClickEdit}
            text={countDown && activeTimerId ? "give up?" : "manage timers"}
          />
          <UnderlinedButton
            onClick={handleClickSessions}
            text="sessions"
          />
          <UnderlinedButton
            onClick={handleClickBlocklist}
            text="blocklist"
          />
        </Box>
      </Box>
    </PageContainer>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const UnderlinedButton = ({ text, onClick }) => {
  return (
    <Typography
      style={{
        textDecoration: "underline",
        cursor: "pointer",
        //visibility: countDown && activeTimerId ? undefined : "hidden",
      }}
      className="disable-select interact"
      onClick={onClick}
    >
      {text}
    </Typography>
  );
}

/****************************************************************************/

const AddTimerButton = () => {
  const isMobile = useMobileCheck();
  
  return (
    <CTA
      title="+"
      variant="h4"
      style={{
        height: isMobile ? "44px" : "50px",
        width: isMobile ? "100%" : "50px",
      }}
    />
  );
}

/****************************************************************************/

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
          key={timer.id}
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
          borderColor: active ? colors.accent : colors.text,
          padding: isMobile ? "8px" : "16px",
          opacity: active ? "100%" : undefined,
          minWidth: "120px",
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
