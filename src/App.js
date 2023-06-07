import './App.css';
import React, { useState } from 'react'
import {
BrowserRouter as Router,
Routes,
Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import News from './component/News';
import Search from './component/Search';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress, setProgress] = useState(0)

  const setProgressAmount = (progress) =>{
    setProgress(progress)
  }

    return (
      <div>
        <Router>  
        <LoadingBar
        color='#f11946'
        progress={progress}
        />
        <Navbar/>
        <Routes>
          <Route path="/" element={<News setProgressAmount = {setProgressAmount} key="general" pageSize="12" country="in" category="general"/>}/>
          <Route path="/science" element={<News setProgressAmount = {setProgressAmount} key="science" pageSize="12" country="in" category="science"/>}/>
          <Route path="/business" element={<News setProgressAmount = {setProgressAmount} key="business" pageSize="12" country="in" category="business"/>}/>
          <Route path="/entertainment" element={<News setProgressAmount = {setProgressAmount} key="entertainment" pageSize="12" country="in" category="entertainment"/>}/>
          <Route path="/health" element={<News setProgressAmount = {setProgressAmount} key="health" pageSize="12" country="in" category="health"/>}/>
          <Route path="/sports" element={<News setProgressAmount = {setProgressAmount} key="sports" pageSize="12" country="in" category="sports"/>}/>
          <Route path="/technology" element={<News setProgressAmount = {setProgressAmount} key="technology" pageSize="12" country="in" category="technology"/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
        </Router>  
      </div>
    )
}

export default App;