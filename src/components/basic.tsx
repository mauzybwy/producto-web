/*****************************************************************************
 * Import
 *****************************************************************************/
import { styled } from '@mui/system';
import { Box } from "@mui/material";

/*****************************************************************************
 * Public Components
 *****************************************************************************/

export const GapBox = styled(Box)(({ gap }: { gap? }) => ({
  display: "flex",
  gap: gap || undefined,
}))

export const Row = styled(GapBox)({
  flexDirection: "row",
  ///alignItems: "center",
});

export const Column = styled(GapBox)({
  flexDirection: "column",
});

export const Centered = styled(GapBox)({
  justifyContent: "center",
  alignItems: "center",
});
