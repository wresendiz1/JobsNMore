import React, { useState, useMemo } from "react";
import axios from "axios";
import AboutCard from "./components/AboutCard/AboutCard";

// backend data

// Testing

function App() {
  const [data, setData] = useState();
  useMemo(() => {
    axios
      .get("/about")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    return data;
  }, [data]);
  return <AboutCard data={data} />;
}

export default App;
