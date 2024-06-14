import './App.css'
import React from "react"
import Moneda from "./components/Moneda.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <>


        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Moneda />} />
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App

