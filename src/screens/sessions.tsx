/*****************************************************************************
 * Import
 *****************************************************************************/
import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { Timer } from "models/timer";
import colors from "style/colors";
import CTA from "components/cta";
import { PageContainer } from "components/containers";
import { useTimers } from "hooks/timers";
import { toTimestring } from "utils/strutils";

/*****************************************************************************
 * Default Component
 *****************************************************************************/

export default function SessionsScreen () {
  const { timers } = useTimers();
  const [selectedTimerId, setSelectedTimerId] = useState<string>(null);

  const selectedTimer = timers.find(timer => timer.id === selectedTimerId)

  const handleClickTimer = (timer: Timer) => {
    setSelectedTimerId((timer.id === selectedTimerId) ? null : timer.id)
  }
  
  return (
    <PageContainer>
      <Box
        display="flex"
        minWidth="332px"
        height= "100%"
        flexDirection="column"
        alignItems="center"
        style={{ gap: "16px", overflowY: "scroll" }}
      >
        {timers.map((timer, idx) => (
          <CTA
            key={idx}
            title={timer.name}
            onClick={() => handleClickTimer(timer)}
            style={{
              width: "300px",
              opacity: selectedTimerId && (selectedTimerId !== timer.id) ? "40%" : undefined,
              borderColor: (
                selectedTimerId === timer.id  ? colors.accent : colors.text
              ),
            }}
          />
        ))}
      </Box>
      <Box width="100%" height="100%">
        <Sessions sessions={selectedTimer?.sessions} />
      </Box>
    </PageContainer>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Sessions = ({ sessions }) => {
  const sessionsByDate = (sessions || []).reduce((accum, session) => {
    let date = new Date(session.timeStarted.seconds * 1000).setHours(12, 0, 0)
    if (accum[date]) {
      accum[date] += session.runtime
    } else {
      accum[date] = session.runtime
    }
    return accum
  }, {})

  const sortedDates = Object.keys(sessionsByDate).sort((a, b) => parseInt(b) - parseInt(a))
  
  return (
    <Box>
      {sortedDates.map(date => (
        <Typography>
          {new Date(parseInt(date)).toISOString().substring(0,10)}{" "}
          {toTimestring(sessionsByDate[date])}
        </Typography>
      ))}
    </Box>
  );
}
