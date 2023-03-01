import React, {useState, useEffect} from 'react'
import AboutCard from './components/AboutCard/AboutCard'

// backend data
import axios from 'axios';

// Testing 

function App() { 

  const [data, setData] = useState();
  useEffect(() => {
      axios.get('/about')
          .then(res => setData(res.data))
          .catch(err => console.log(err))

  }
      , [])
  return (
    <AboutCard data = {data}></AboutCard>
  )
}

export default App 