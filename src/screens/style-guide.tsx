/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box, Typography } from "@mui/material";
import colors from "style/colors";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ProductoHome () {
  const typeVariants = ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2", "button", "caption", "inherit", "subtitle1", "subtitle2", "overline"];
  
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column">
        {typeVariants.map(variant => (
          <Box key={variant} display="flex" alignItems="center">
            <Typography variant="body2" style={{ width: "300px", textAlign: "center" }}>
              ({variant})
            </Typography>
            {/* @ts-ignore */}
            <Typography variant={variant}>
              hello world.
            </Typography>
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" style={{
          height: "50px",
          width: "50px",
          backgroundColor: colors.accent,
        }}>
          <Typography style={{
            fontSize: "72px",
            lineHeight: "0px",
            paddingTop: "20px",
            paddingLeft: "7px",
            color: colors.light,
          }}>
            p
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
