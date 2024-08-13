import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import BookingTable from './BookingTable/BookingTable'
import CategoryList from './Category/CategoryList'


const Admin = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        
        <Route path='/tables/*' element={<BookingTable />} />
         {/* <Route path='/categories' element={<CategoryList />} /> */}
        {/* <Route path='/admin/burger' element={<CategoryList />} /> */}
      </Routes> 
    </div>
  )
}

export default Admin


