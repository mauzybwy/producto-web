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
import SessionsScreen from "screens/sessions";
import ManageScreen from "screens/manage";
import BlocklistScreen from "screens/blocklist";
import LoginScreen from "screens/login/login";
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
                path="/extension.html"
                element={<ProductoHome />}
              />
              <Route
                path="/blocklist"
                element={<BlocklistScreen />}
              />
              <Route
                path="/sessions"
                element={<SessionsScreen />}
              />
              <Route
                path="/manage"
                element={<ManageScreen />}
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
