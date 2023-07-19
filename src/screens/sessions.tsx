/*****************************************************************************
 * Import
 *****************************************************************************/
import { useState } from "react";
import { Box, Checkbox, TextField, Typography, FormControlLabel } from "@mui/material";

import { Row, Column } from "components/basic";
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
  const { timers, createPayPeriod } = useTimers();
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
        {selectedTimer && (
          <Sessions sessions={selectedTimer?.sessions} createPayPeriod={createPayPeriod} timer={selectedTimer} />
        )}
      </Box>
    </PageContainer>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Sessions = ({ sessions, createPayPeriod, timer }) => {
  const [hourly, setHourly] = useState(0);
  const [selectedSessionIds, setSelectedSessionIds] = useState([]);
  const sortedSessions = (sessions || []).sort((a,b) => b.timeStarted.seconds - a.timeStarted.seconds);
  
  const selectedSessions = sortedSessions
    .filter((session, idx) => selectedSessionIds.includes(idx))
    .sort((a,b) => b.timeStarted.seconds - a.timeStarted.seconds);
  const selectedRuntime = selectedSessions.reduce((accum, session) => accum + session.runtime, 0);
  
  /* const sessionsByDate = (sessions || []).reduce((accum, session) => {
   *   let date = new Date(session.timeStarted.seconds * 1000).setHours(12, 0, 0)
   *   if (accum[date]) {
   *     accum[date] = {
   *       ...accum[date],
   *       runtime: accum[date] + session.runtime,
   *       ids: [ ...accum[date].ids, session.id ],
   *     }
   *   } else {
   *     accum[date] = {
   *       runtime: session.runtime,
   *       ids: [session.id],
   *     }
   *   }
   *   return accum
   * }, {})

   * const sortedDates = Object.keys(sessionsByDate).sort((a, b) => parseInt(b) - parseInt(a)) */

  const clickSession = (idx: number) => {
    
    if (selectedSessionIds.includes(idx)) {
      setSelectedSessionIds([...selectedSessionIds].filter(item => item != idx));
    } else {
      setSelectedSessionIds([ ...selectedSessionIds, idx ])
    }
  }

  const toDateStr = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().substring(0,10);
  }

  const submitPayPeriod = async () => {
        
  }
  
  return (
    <Row gap="32px">
      <Column gap="8px">
        {(sortedSessions || []).map((session, idx) => (
          <FormControlLabel
            key={idx}
            //disabled={inRange(idx)}
            //style={{ opacity: inRange(idx) ? 0.5 : undefined }}
            control={
              <Checkbox
                name="SomeName"
                value="SomeValue"
                onClick={() => clickSession(idx)}
              />
            }
            label={(
              <Typography pl="8px">
                {toDateStr(session.timeStarted.seconds)}{" "}
                {toTimestring(session.runtime)}
              </Typography>
            )}/>
        ))}
      </Column>

      {!!selectedSessionIds.length && (
        <Column gap="16px">
          <Column>
            <Typography variant="h4" style={{ textDecoration: "underline" }}>
              Create Pay Period
            </Typography>
            <Typography style={{ fontWeight: 700 }}>
              ({toDateStr(selectedSessions[selectedSessions.length - 1].timeStarted.seconds)}{" → "}{toDateStr(selectedSessions[0].timeStarted.seconds)})
            </Typography>
          </Column>
          <Row gap="16px">
            <Column gap="8px">
              <Typography variant="h6">
                {toTimestring(selectedRuntime)}
              </Typography>
              <Row alignItems="center" gap="8px">
                <Typography>
                  $
                </Typography>
                <TextField
                  value={`${hourly}`}
                  onChange={(evt) => setHourly(parseInt(evt.target.value) || 0)}
                  sx={{
                    input: { color: colors.text, fontSize: "1.5rem", margin: 0, padding: 0 },
                    border: "2px solid",
                    borderColor: colors.accent,
                    boxSizing: "border-box",
                    width: "100px"
                  }}
                />
              </Row>
            </Column>
            <Typography variant="h3">
              ${(hourly * (selectedRuntime / 3600)).toFixed(2)}
            </Typography>
          </Row>

          <CTA
            title="SUBMIT"
            onClick={submitPayPeriod}
            disable={!hourly}
          />
        </Column>
      )}
    </Row>
  );
}
