/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { useMe } from "hooks/users";
import { theme } from "style/theme";
import ProductoHome from "screens/home";
import LoginScreen from "screens/login/login";

/*****************************************************************************
 * App
 *****************************************************************************/
function App() {
  const me = useMe();
  
  useEffect(() => {
    console.log("LOAD EXTENSION");
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "432px", height: "500px" }}>
        {me?.uid ? (
          <ProductoHome />
        ) : (
          <LoginScreen />
        )}
      </div>
    </ThemeProvider>
  );
}

/*****************************************************************************
 * Export
 *****************************************************************************/
export default App;
