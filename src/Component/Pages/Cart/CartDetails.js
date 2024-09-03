import React, { useEffect, useState } from 'react';
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import logobar from '../../../Asstes/Images/loginLogo.png';
import pizzaimg from '../../../Asstes/Images/MargheritaPizza.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartQuntityUpdate, DeleteFromCart, ItemToCartGet } from '../../Redux/Slice/CartSlice';
import { baseURL } from '../../Utils/Config';
import Delete from '../../../Asstes/Icon/delete.png';
import CartDetailsEdit from './CartDetailsEdit';

const CartDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [selectedProductId, setSelectedProductId] = useState(null); 

  const { cart } = useSelector(state => state.cart);
  const { auth } = useSelector(state => state.auth);

  const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = 14;
  const finalTotal = totalPrice + tax;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(token);
      const userId = decodedToken?._id;

      if (userId) {
        const payload = {
          page,
          limit: rowsPerPage,
          search,
          userId,
        };

        dispatch(ItemToCartGet(payload));
      }
    }
  }, [page, rowsPerPage, search, dispatch]);

  const handleClick = () => {
    navigate("/booking/categories/:categoryName");
  };

  const handleQuantityChange = (cartId, action) => {
    dispatch(CartQuntityUpdate({ cartId, action }));
  };

  const handleRemoveFromCart = (cartId) => {
    dispatch(DeleteFromCart(cartId));
  };

  const handleEditClick = (cartId) => {
    setSelectedProductId(cartId); 
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); 
    setSelectedProductId(null); 
    // Refresh cart data after editing
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(token);
      const userId = decodedToken?._id;

      if (userId) {
        const payload = {
          page,
          limit: rowsPerPage,
          search,
          userId,
        };

        dispatch(ItemToCartGet(payload));
      }
    }
  };

  return (
    <div>
      {/* Cart Details */}
      <div className="CartDetails">
        <div className="container">
          <div className="row d-flex align-items-center mt-5 position-relative">
            <div className="col-sm-6 col-smm-6 col-md-6 order-md-1 order-sm-1 order-xl-0 d-flex justify-content-xl-start justify-content-md-end justify-content-sm-end justify-content-center align-items-center mt-lg-2 order-1 col-xsm-6 col-xs-6">
              <h1 className='position-relative text-light'>My Cart</h1>
            </div>
            <div className="col-xl-6 col-md-12 col-sm-12 col-smm-12 d-flex justify-content-xl-end order-xl-0 justify-content-md-center justify-content-sm-center align-items-center justify-content-center">
              <div className="logobar">
                <img src={logobar} alt="logo" className="img" />
              </div>
            </div>
            <div className="col-smm-6 col-md-6 col-sm-6 col-xsm-6 col-xs-6 mt-4 d-flex align-items-center mt-lg-2">
              <div className="retrun-icon text-light position-relative" onClick={handleClick}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-4">
            <div className="col-lg-8 col-sm-12 col-xs-12 position-relative rounded-5 border-responsive p35-top p20-bottom p25-x d-flex align-items-center flex-column justify-content-center">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div className="card bg-light text-white mb-4 w-100" key={item._id}>
                    <div className="row g-0">
                      <div className="col-md-2 col-sm-3 col-xs-12 col-smm-3 text-center">
                        <div className="cart-img m-3 w-100">
                          <img
                            src={item?.product?.images?.[0] ? baseURL + item.product.images[0] : pizzaimg}
                            alt=""
                            className='w-100'
                          />
                        </div>
                      </div>
                      <div className="col-md-10 col-sm-9 col-smm-9 col-xs-12">
                        <div className="card-body pt-4">
                          <div className="details d-flex justify-content-between">
                            <h5 className="card-title text-prime fw-900 fs-22">{item?.product?.title}</h5>
                            <h4 className="text-prime me-3 fw-900 fs-22">₹{item.totalPrice}</h4>
                          </div>
                          <ul className="list-unstyled mt-2">
                            {/* Display Customize Ingredients */}
                            {item.product && Array.isArray(item.product.customizeIngridiances) && item.product.customizeIngridiances.length > 0 && (
                              <>
                                {item.product.customizeIngridiances.map((ingredient, index) => (
                                  <li key={index} className='ingredient'>
                                    {ingredient.name} - {ingredient.price}₹
                                  </li>
                                ))}
                              </>
                            )}

                            {/* Display Add-Ons */}
                            {item.product && Array.isArray(item.product.addOnIngridiances) && item.product.addOnIngridiances.length > 0 && (
                              <>
                                {item.product.addOnIngridiances.map((addOn, index) => (
                                  <li key={index} className='ingredient'>
                                    {addOn.name} - {addOn.price}₹
                                  </li>
                                ))}
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 text-center pb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="cart-edit d-flex ms-3">
                            <button className='edit-details ms-3 me-3' onClick={() => handleEditClick(item._id)}>Edit</button>
                            <div className="Delte-button bg-prime">
                              <img src={Delete} alt="Delete" onClick={() => handleRemoveFromCart(item._id)} />
                            </div>
                          </div>
                          <div className="quantity-control me-4 d-flex justify-content-between align-items-center">
                            <button className="btn bg-prime text-light btn-sm height-29 width-29 fs-30 d-flex justify-content-between align-items-center text-center" onClick={() => handleQuantityChange(item._id, 'false')}>-</button>
                            <span className="mx-3 text-dark">{item.productCount}</span>
                            <button className="btn bg-prime text-light btn-sm height-29 width-29 fs-22 d-flex justify-content-between align-items-center text-center" onClick={() => handleQuantityChange(item._id, 'true')}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-light fs-20">Your cart is empty</p>
              )}
            </div>

           {/* Right Section */}
           <p className='text-light position-relative order-name'>Order Summary</p>
            <div className="col-lg-4 col-sm-12 d-flex justify-content-center">
              <div className="card m33-x text-white p-3 mt-lg height-361 w-100 rounded-5">
                <div className="summary mt-2 p-4">
                  <div className="d-flex justify-content-between pb-4">
                    <span className='price'>Sub Total</span>
                    <span className='price'>₹{totalPrice}</span>
                  </div>
                  <div className="d-flex justify-content-between pb-4">
                    <span className='price'>Tax</span>
                    <span className='price'>₹{tax}</span>
                  </div>
                  <div className="d-flex justify-content-between pb-4 " style={{borderBottom:'1px solid #ffffff'}}>
                    <span className='price'>Total</span>
                    <span className='price'>₹{finalTotal}</span>
                  </div>
                  {/* <hr/> */}
                  <div className="order-button mt-5 d-flex justify-content-center align-items-center">
                  <button className='order-btn mt-2' >Order Now - ₹{finalTotal}</button>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {isDialogOpen && (
        <CartDetailsEdit cart={cart.find(item => item._id === selectedProductId)} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default CartDetails;
