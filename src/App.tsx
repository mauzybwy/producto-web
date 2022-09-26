/*****************************************************************************
 * Import
 *****************************************************************************/
import ProductoRouter from "./navigation/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "style/theme";

/*****************************************************************************
 * App
 *****************************************************************************/

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProductoRouter />
    </ThemeProvider>
  );
}
