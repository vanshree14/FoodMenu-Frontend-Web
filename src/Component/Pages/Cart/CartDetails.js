import React, { useEffect, useState } from 'react';
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import logobar from '../../../Asstes/Images/loginLogo.png';
import pizzaimg from '../../../Asstes/Images/MargheritaPizza.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ItemToCartGet } from '../../Redux/Slice/CartSlice';

const CartDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const { cart, totalCount } = useSelector(state => state.cart);
  const { auth } = useSelector(state => state.auth);

  const payload = {
    page,
    limit: rowsPerPage,
    search,
    userId: auth?._id,
  };

  useEffect(() => {
    if (auth?._id) {
      dispatch(ItemToCartGet(payload))}
  }, [page, rowsPerPage, search, auth?._id]);

  const handleClick = () => {
    navigate("/categories/:categoryName");
  };

  return (
    <div>
      <div className="CartDetails custombackgroud" style={{ backgroundImage: `url(${BannerbackgroundImg})`, height: '100vh' }}>
        <div className="container">
          <div className="row d-flex align-items-center mt-5 position-relative">
            <div className="col-6">
              <h1 className='position-relative text-light'>my cart</h1>
            </div>
            <div className="col-6">
              <div className="logobar text-center d-flex justify-content-end">
                <img src={logobar} alt="logo" className="img" />
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="retrun-icon text-light position-relative" onClick={handleClick}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-4">
            {/* Left Section */}
            <div className="col-lg-8 col-sm-12 col-xs-12" style={{ border: '1px solid #9B7A41', padding: '35px 25px', position: 'relative', borderRadius: '40px' }}>
              {cart.length > 0 ? (
                cart.map(item => (
                  <div className="card bg-light text-white" key={item._id}>
                    <div className="row g-0 align-items-center">
                      <div className="col-md-2 col-sm-3 col-xs-12 col-smm-3 text-center">
                        <div className="cart-img">
                          <img src={pizzaimg} className="img-fluid rounded-start m-3" alt='Pizza' />
                        </div>
                      </div>
                      <div className="col-md-10 col-sm-9 col-smm-9 col-xs-12">
                        <div className="card-body ps-4">
                          <div className="details d-flex justify-content-between">
                            <h5 className="card-title text-prime">{item.productName}</h5>
                            <h4 className="text-prime me-3">₹{item.price}</h4>
                          </div>
                          <ul className="list-unstyled">
                            {item.ingredients.map((ingredient, index) => (
                              <li key={index} className='text-dark'>
                                {ingredient.name} - {ingredient.price}₹
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 text-center pb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <button className='edit-details ms-3'>Edit</button>
                          <div className="quantity-control me-4">
                            <button className="btn btn-warning btn-sm">-</button>
                            <span className="mx-3 text-dark">{item.quantity}</span>
                            <button className="btn btn-warning btn-sm">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in cart</p>
              )}
            </div>

            {/* Right Section */}
            <p className='text-light position-relative order-name'>Order Summary</p>
            <div className="col-lg-4 col-sm-12 d-flex justify-content-center">
              <div className="card text-white p-3 mt-lg" style={{ borderRadius: '25px', width: '100%' }}>
                <div className="summary mt-2">
                  <div className="d-flex justify-content-between pb-3">
                    <span className='price'>Sub Total</span>
                    <span className='price'>₹{totalCount}</span>
                  </div>
                  <div className="d-flex justify-content-between pb-4" style={{ borderBottom: '1px solid #ffffff' }}>
                    <span className='price'>Total Tax</span>
                    <span className='price'>₹14</span>
                  </div>
                  <div className="d-flex justify-content-between pt-4 pb-5">
                    <span className='price'>Total</span>
                    <span className="text-warning h4 price">₹{totalCount + 14}</span>
                  </div>
                  <div className="order-btn d-flex justify-content-center">
                    <button className="order text-light fw-700">Order Now - ₹{totalCount + 14}</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-btn d-flex justify-content-center mt-3 position-relative">
              <button className="order-1 text-light fw-700">Order Now - ₹{totalCount + 14}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
