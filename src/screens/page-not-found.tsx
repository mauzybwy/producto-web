/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box, Typography } from "@mui/material";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function PageNotFound () {
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Typography>
        404: what's someone like you doing in a place like this?
      </Typography>
    </Box>
  );
}
