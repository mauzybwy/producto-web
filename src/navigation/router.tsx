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

import Header from "./header";

/* Pages */
import ProductoHome from "screens/home";
import StyleGuide from "screens/style-guide"
import PageNotFound from "screens/page-not-found";

/*****************************************************************************
 * Router
 *****************************************************************************/
export default function ProductoRouter() {
  return (
    <BrowserRouter>
      <Routes>
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
