import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListEmployeeComponents from './component/ListEmployeeComponents'
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import EmployeeComponent from './component/EmployeeComponent'
import ListDepartmentComponent from './component/ListDepartmentComponent'
import DepartmentComponent from './component/DepartmentComponent'

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListEmployeeComponents />} />
          <Route path='/employees' element={<ListEmployeeComponents />} />
          <Route path='/add-employee' element={<EmployeeComponent />} />
          <Route path='/edit-employee/:id' element={<EmployeeComponent />} />

          {/* Department Routes */}
          <Route path='/departments' element={<ListDepartmentComponent />} />
          <Route path='/add-department' element={<DepartmentComponent />} />
          <Route path='/edit-department/:id' element={<DepartmentComponent />} />
        </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App