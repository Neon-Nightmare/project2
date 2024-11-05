import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Topten from './Topten'
import Terror from './Terror';
import Missing from './Missing';
import './App.css'

function App() {

  const [ten, setTopten] = useState([]);
  
  const [Missinglist, setMissinglist] = useState([]);
  
  useEffect(() =>{
    //Top Most wanted
    fetch('https://api.fbi.gov/@wanted?poster_classification=ten')
      .then(res => res.json())
      .then(data => setTopten(data.items))

    
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Topten ten={ten}/>}/>
      <Route path='/terror' element={<Terror/>}/>
      <Route path='/missing' element={<Missing/>}/>
    </Routes>
    
    
  )
}

export default App
