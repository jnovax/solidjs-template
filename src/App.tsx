import { Component } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import SignIn from "./pages/SignIn";
import DemoForm from "./pages/Form";
import ProductPage from "./pages/Product";
import RouteGuard from "./RouteGuard";

import 'flowbite';

const App: Component = () => (
  <Routes>
    <Route path="/signin" component={SignIn} />
    <Route path="/" component={RouteGuard}>
      <Route path="/" component={DemoForm} /> {/* 👈 Define the home page route */}
      <Route path="/product" component={ProductPage} />
    </Route>
  </Routes >
);

export default App;