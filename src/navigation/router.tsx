/*****************************************************************************
 * Import
 *****************************************************************************/
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import LoadingAnimation from "components/loading-animation";
import Header from "./header";
import { useMe } from "hooks/users";

/* Pages */
import ProductoHome from "screens/home";
import LoginScreen from "screens/login";
import StyleGuide from "screens/style-guide"
import PageNotFound from "screens/page-not-found";

/*****************************************************************************
 * Router
 *****************************************************************************/
export default function ProductoRouter() {
  const me = useMe();
  
  return me === undefined ? (
    <LoadingAnimation />
  ) : (
    <BrowserRouter>
      <Routes>
        {me ? (
          <>
            <Route
              path="/"
              element={<Layout />}
            >
              <Route
                index
                element={<ProductoHome />}
              />

              <Route
                path="/style"
                element={<StyleGuide />}
              />
              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Route>

            <Route
              path="/noheader"
              element={<p>No header!!!</p>}
            />
          </>
        ) : (
          <Route
            path="*"
            element={<Layout />}
          >
            <Route
              path="*"
              element={<LoginScreen />}
            />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
}
