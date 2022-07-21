import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./features/PrivateRoute";
import Home from "./pages/Home";
import Share from "./pages/Share";

import AuthLayout from "./layout/AuthLayout";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<AuthLayout />}>
          <Route path="share" element={<Share />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
