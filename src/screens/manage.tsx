/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Autocomplete, Box, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { findDuplicates } from "utils/listutils";
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
  const [originalTimers, setOriginalTimers] = useState(new Array(6).fill(""))
  const [paddedTimers, setPaddedTimers] = useState(new Array(6).fill(""))
  const { timers, updateTimer, createTimer } = useTimers();

  useEffect(() => {
    let copy = [...paddedTimers];
    timers.forEach((timer, idx) => {
      if (timer.position) {
        copy[timer.position -1 ] = timer.name;
      }
    });
    setPaddedTimers(copy);
    setOriginalTimers(copy);
  }, [timers])

  const timersChanged = paddedTimers.reduce((accum, name, idx) => {
    if (accum) return accum;
    return accum || name !== originalTimers[idx]
  }, false)

  const duplicates = findDuplicates(paddedTimers).filter(item => item !== "")
  const formValid = timersChanged && duplicates.length === 0;

  const updateTimerName = (name, idx) => {
    let copy = [ ...paddedTimers ];
    copy[idx] = name;
    setPaddedTimers(copy);
  }

  const handleChangeTimerName = (value, idx) => {
    if (value.length < 13) {
      updateTimerName(value, idx);
    }
  }

  const handleBack = () => {
    navigate("/");
  }

  const handleSave = async () => {
    // !blw: for now just go through all the timers and save em
    for (let idx = 0; idx < timers.length; idx++) {
      let timer = timers[idx];
      let position = paddedTimers.findIndex(name => name === timer.name) + 1

      if (position) {
        updateTimer(timers[idx], { position: position });
      } else {
        updateTimer(timers[idx], { position: null });
      }
    }

    // Create new timers
    const timerNames = timers.map(timer => timer.name)
    for (let idx = 0; idx < paddedTimers.length; idx++) {
      const name = paddedTimers[idx];
      if (name && !timerNames.includes(name)) {
        createTimer(name, idx + 1);
      }
    }
    
    setOriginalTimers(paddedTimers);
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
              //p="8px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                border: "2px solid",
                borderColor: duplicates.includes(timer) ? colors.accent : colors.text,
                boxSizing: "border-box",
              }}
            >
              <Autocomplete
                freeSolo
                disableClearable
                autoSelect
                autoHighlight
                disablePortal
                id="combo-box-demo"
                options={timers.map(timer => timer.name)}
                sx={{
                  width: 350,
                  "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
                    backgroundColor: "#fff5",
                    color: "white"
                  }
                }}
                value={timer}
                inputValue={timer}
                onChange={(evt, val) => handleChangeTimerName(val, idx)}
                onInputChange={(evt, val) => handleChangeTimerName(val, idx)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ input: { color: colors.text, fontSize: "1.5rem", margin: 0, padding: 0 } }}
                  />
                )}
              />
              {/* <Input
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
                  /> */}
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
            disable={!formValid}
            onClick={handleSave}
          />
        </Box>
      </Box>
    </PageContainer>
  );
}
