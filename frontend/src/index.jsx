/* eslint-disable no-promise-executor-return */
/* eslint-disable arrow-body-style */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import MainLayout from "./components/Layout/MainLayout";
import Test from "./App";

// Prevent sudden flash of fallback component when lazy loading
const getPageComponent = (pageName, page) =>
  lazy(() =>
    Promise.all([
      import(`./pages/${!page ? pageName : page}/${pageName}`),
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]).then(([moduleExports]) => moduleExports)
  );
const Home = getPageComponent("Home");
const About = getPageComponent("About");
const Contact = getPageComponent("Contact");
const Jobs = getPageComponent("Jobs");
const ViewJob = getPageComponent("ViewJob", "Jobs");
const JobsExtra = getPageComponent("JobsExtra", "Jobs");
const Occupations = getPageComponent("Occupations");
const ViewOccupation = getPageComponent("ViewOccupation", "Occupations");
const Courses = getPageComponent("Courses");
const ViewCourse = getPageComponent("ViewCourse", "Courses");
const Locations = getPageComponent("Locations");
const ViewLocation = getPageComponent("ViewLocation", "Locations");
const Clusters = getPageComponent("Clusters");
const ViewCluster = getPageComponent("ViewCluster", "Clusters");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Jobs",
        children: [
          {
            index: true,
            element: <Jobs />,
          },
          {
            path: ":id",
            element: <ViewJob />,
          },
          {
            path: "occupation/:id",
            element: <JobsExtra url="/api/jobs/onet" />,
          },
          {
            path: "location/:id",
            element: <JobsExtra url="/api/jobs/location" />,
          },
          {
            path: "cluster/:id",
            element: <JobsExtra url="/api/jobs/cluster" />,
          },
          {
            path: "course/:id",
            element: <JobsExtra url="/api/jobs/course" />,
          },
        ],
      },
      {
        path: "Occupations",
        children: [
          {
            index: true,
            element: <Occupations />,
          },
          {
            path: ":id",
            element: <ViewOccupation />,
          },
        ],
      },
      {
        path: "Courses",
        children: [
          {
            index: true,
            element: <Courses />,
          },
          {
            path: ":id",
            element: <ViewCourse />,
          },
        ],
      },
      {
        path: "Locations",
        children: [
          {
            index: true,
            element: <Locations />,
          },
          {
            path: ":id",
            element: <ViewLocation />,
          },
        ],
      },
      {
        path: "Clusters",
        children: [
          {
            index: true,
            element: <Clusters />,
          },
          {
            path: ":id",
            element: <ViewCluster />,
          },
        ],
      },
      {
        path: "Test",
        element: <Test />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
