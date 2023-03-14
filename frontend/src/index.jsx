import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Load from "./pages/Load/Load";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const Courses = lazy(() => import("./pages/Courses/Courses"));
const Skills = lazy(() => import("./pages/Skills/Skills"));
const Locations = lazy(() => import("./pages/Locations/Locations"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Load />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/About",
    element: (
      <Suspense fallback={<Load />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/Jobs",
    element: (
      <Suspense fallback={<Load />}>
        <Jobs />
      </Suspense>
    ),
  },
  {
    path: "/Skills",
    element: (
      <Suspense fallback={<Load />}>
        <Skills />
      </Suspense>
    ),
  },
  {
    path: "/Courses",
    element: (
      <Suspense fallback={<Load />}>
        <Courses />
      </Suspense>
    ),
  },
  {
    path: "/Locations",
    element: (
      <Suspense fallback={<Load />}>
        <Locations />
      </Suspense>
    ),
  },
  {
    path: "/Contact",
    element: (
      <Suspense fallback={<Load />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "/Load",
    element: <Load />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// import reportWebVitals from './reportWebVitals';

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
