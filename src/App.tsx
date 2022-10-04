/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect } from "react";
import ProductoRouter from "./navigation/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "style/theme";

/*****************************************************************************
 * App
 *****************************************************************************/

export default function App() {
  useEffect(() => {
    console.log("LOAD WEB");
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <ProductoRouter />
    </ThemeProvider>
  );
}
