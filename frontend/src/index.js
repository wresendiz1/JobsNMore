import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Jobs from './pages/Jobs/Jobs';
import Courses from './pages/Courses/Courses';
import Skills from './pages/Skills/Skills';
import Locations from './pages/Locations/Locations';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,

  },
  {
    path: "/Jobs",
    element: <Jobs />,

  },
  {
    path: "/Skills",
    element: <Skills />,

  },
  {
    path: "/Courses",
    element: <Courses />,

  },
  {
    path: "/Locations",
    element: <Locations />,

  },
  {
    path: "/Contact",
    element: <Contact />,

  },
  {
    path: "/Test",
    element: <App />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


// import reportWebVitals from './reportWebVitals';

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
