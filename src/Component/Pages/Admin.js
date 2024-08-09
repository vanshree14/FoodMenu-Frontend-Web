import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import BookingTable from './BookingTable/BookingTable'


const Admin = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <BookingTable />
      {/* <Routes>
        <Route path='/admin/burger' element={<CategoryList />} />
      </Routes> */}
    </div>
  )
}

export default Admin


