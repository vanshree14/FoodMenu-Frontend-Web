import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import BookingTable from './BookingTable/BookingTable'
import CategoryList from './Category/CategoryList'
import CategoryProducts from './Category/CategoryProducts '
import CartDetails from './Cart/CartDetails'
import ProductDetails from './Category/ProductDetails'
import WishList from './WishList/WishList'
import Orders from './Order/Orders'
import OrderDetails from './Order/OrderDetails'


const Admin = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        
        <Route path='/tables/*' element={<BookingTable />} />

        <Route path='/categories' element={<CategoryList />} />
        <Route path="/categories/:categoryName" element={<CategoryProducts />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/cart' element={<CartDetails />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orderdetails' element={<OrderDetails />} />
        <Route path='/productDetails' element={<ProductDetails />} />

        {/* <Route path='/admin/burger' element={<CategoryList />} /> */}
      </Routes> 
    </div>
  )
}

export default Admin


