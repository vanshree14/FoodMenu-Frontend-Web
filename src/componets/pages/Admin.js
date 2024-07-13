import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MenuList from './MenuList'
import Navbar from './Navbar'


const Admin = () => {
  return (
    <div>
      <Navbar />
      <MenuList />
      {/* <Routes>
        <Route path='/admin/burger' element={<CategoryList />} />
      </Routes> */}
    </div>
  )
}

export default Admin
