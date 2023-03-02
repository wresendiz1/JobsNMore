import React, {useState, useMemo} from 'react'
import AboutCard from './components/AboutCard/AboutCard'

// backend data
import axios from 'axios';

// Testing 

function App() { 

  const [data, setData] = useState();
  const getData = useMemo(() => {
      axios.get('/about')
          .then(res => setData(res.data))
          .catch(err => console.log(err))
      return data
  }
      , [data])
  return (
    <AboutCard onLoad = {getData} data = {data}></AboutCard>
  )
}

export default App 