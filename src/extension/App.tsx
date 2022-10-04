/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "style/theme";
import ProductoHome from "screens/home";

/*****************************************************************************
 * App
 *****************************************************************************/
function App() {
  useEffect(() => {
    console.log("LOAD EXTENSION");
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "400px", height: "500px" }}>
        <ProductoHome />
      </div>
    </ThemeProvider>
  );
}

/*****************************************************************************
 * Export
 *****************************************************************************/
export default App;
