import { Component } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import SignIn from "./pages/SignIn";
import DemoForm from "./pages/Form";
import ProductPage from "./pages/Product";
import CalendarPage from "./pages/Calendar";
import RouteGuard from "./RouteGuard";
import MotionPage from "./pages/Motion";
import FlowDesignPage from "./pages/FlowDesign";

import 'flowbite';

const App: Component = () => (
  <Routes>
    <Route path="/signin" component={SignIn} />
    <Route path="/" component={RouteGuard}>
      <Route path="/" component={DemoForm} /> {/* 👈 Define the home page route */}
      <Route path="/product" component={ProductPage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/motion" component={MotionPage} />
      <Route path="/tree" component={FlowDesignPage} />
    </Route>
  </Routes >
);


export default App;