import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Topten from './Topten'
import Terror from './Terror';
import Missing from './Missing';
import Details from './Details';
import DetailsContext from "./DetailsContext";

import './App.css';

function App() {
  const [details, setDetails] = useState({})
  const [ten, setTopten] = useState([]);
  const value = { details, setDetails }
  
  useEffect(() =>{
    //Top Most wanted
    fetch('https://api.fbi.gov/@wanted?poster_classification=ten')
      .then(res => res.json())
      .then(data => setTopten(data.items))

    
  }, [])
  return (
    <DetailsContext.Provider value={value}>
      <Routes>
        <Route path='/' element={<Topten/>}/>
        <Route path='/terror' element={<Terror/>}/>
        <Route path='/missing' element={<Missing/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </DetailsContext.Provider>
    
  )
}

export default App
