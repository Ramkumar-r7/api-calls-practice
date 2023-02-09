import React from 'react'
import { Route,  BrowserRouter as Router, Routes } from 'react-router-dom';
import CreatingFormData from '../Forms/CreatingFormData';
import FormDataview from '../Forms/FormDataView';

function RoutingPage() {
 
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/forms' element={<CreatingFormData />} />
          <Route path='/' element={<FormDataview />} />
      <Route path='/:id' element={<CreatingFormData />} />
        </Routes>
      </Router>
    </div>
  )
}

export default RoutingPage
