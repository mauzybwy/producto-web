/*****************************************************************************
 * Import
 *****************************************************************************/
import React from "react";
import { Box, Typography } from "@mui/material";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ProductoHome () {
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column">
        <Typography variant="h1">
          home.
        </Typography>
      </Box>
    </Box>
  );
}
