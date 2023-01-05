/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import ProductoRouter from "./navigation/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "style/theme";
import LoadingAnimation from "components/loading-animation";
import { useMe } from "hooks/users";

/*****************************************************************************
 * App
 *****************************************************************************/

export default function App() {
  const [loading, setLoading] = useState(true);
  const me = useMe();
  
  useEffect(() => {
    console.log("LOAD WEB");
  }, []);
  
  return me === undefined ? (
    <LoadingAnimation />
  ) : (
    <ThemeProvider theme={theme}>
      <ProductoRouter />
    </ThemeProvider>
  );
}
