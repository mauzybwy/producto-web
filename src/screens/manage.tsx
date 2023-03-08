/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Box, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CTA from "components/cta";
import { useTimers } from "hooks/timers";
import { useMobileCheck } from "hooks/mobile";
import colors from "style/colors";
import { useMe } from "hooks/users";
import { PageContainer } from "components/containers";


/*****************************************************************************
 * Default Component
 *****************************************************************************/

export default function ManageScreen () {
  const me = useMe();
  const navigate = useNavigate();
  const isMobile = useMobileCheck();
  const [paddedTimers, setPaddedTimers] = useState(new Array(6).fill(""))
  const { timers, updateTimer, createTimer } = useTimers();

  useEffect(() => {
    let copy = [...paddedTimers];
    timers.forEach((timer, idx) => copy[idx] = timer.name);
    setPaddedTimers(copy);
  }, [timers])
  
  const timersChanged = paddedTimers.reduce((accum, timer, idx) => {
    if (accum) return accum;
    
    if (idx < timers.length) {
      return timers[idx].name !== timer;
    } else {
      return !!timer;
    }
  }, false);

  const updateTimerName = (name, idx) => {
    let copy = [ ...paddedTimers ];
    copy[idx] = name;
    setPaddedTimers(copy);
  }

  const handleChangeTimerName = (evt, idx) => {
    if (evt.target.value.length < 13) {
      updateTimerName(evt.target.value, idx);
    }
  }

  const handleBack = () => {
    navigate("/");
  }

  const handleSave = async () => {
    for (let idx = 0; idx < paddedTimers.length; idx++) {
      const name = paddedTimers[idx];
      if (idx < timers.length) {
        if (timers[idx].name !== name) {
          updateTimer(timers[idx], { name })
        }
      } else if (!!name) {
        createTimer(name);
      }
    }
  }
  
  return (
    <PageContainer>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ gap: "32px" }}
      >
        <Box
          display="flex"
          px={isMobile ? "16px" : undefined}
          width={isMobile ? undefined : "414px"}
          style={{
            gap: isMobile ? "32px" : "16px",
            //flexWrap: isMobile ? "wrap" : "nowrap",
            flexWrap: "wrap",
          }}
        >
          {paddedTimers.map((timer, idx) => (
            <Box
              key={idx}
              p="8px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                border: "2px solid",
                borderColor: colors.text,
                boxSizing: "border-box",
              }}
            >
              <Input
                value={timer}
                onChange={(evt) => handleChangeTimerName(evt, idx)}
                disableUnderline
                style={{ width: "175px" }}
                inputProps={{
                  style: {
                    color: "white",
                    borderColor: "white",
                    fontSize: "1.5rem",
                  }
                }}
              />
            </Box>
          ))}
        </Box>
        <Box display="flex" style={{ gap: "16px" }}>
          <CTA
            title="back"
            onClick={handleBack}
          />
          <CTA
            title="save"
            disable={!timersChanged}
            onClick={handleSave}
          />
        </Box>
      </Box>
    </PageContainer>
  );
}
