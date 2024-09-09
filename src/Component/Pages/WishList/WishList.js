import React, { useEffect, useState } from 'react';
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import logobar from '../../../Asstes/Images/loginLogo.png';
import pizzaimg from '../../../Asstes/Images/MargheritaPizza.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, CartQuntityUpdate, DeleteFromCart, ItemToCartGet } from '../../Redux/Slice/CartSlice';
import { baseURL } from '../../Utils/Config';
import Delete from '../../../Asstes/Icon/delete.png';
import ProductDetails from '../Category/ProductDetails';
import WishListDetails from './WishListDetails';
import { WishListDelete, WishListGet } from '../../Redux/Slice/WishListSlice';
import { setToast } from '../../Extra/Toast';

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlist } = useSelector(state => state.wishlist);
  const { auth } = useSelector(state => state.auth);
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [selectedAddOnIngridiants, setSelectedAddOnIngridiants] = useState([]);
  const [selectedCustomizeIngridiants, setSelectedCustomizeIngridiants] = useState([]);
  const [quantity, setQuantity] = useState(1);


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

        dispatch(WishListGet(payload));
      }
    }
  }, [page, rowsPerPage, search, dispatch]);

  const handleClick = () => {
    navigate("/booking/categories/:categoryName");
  };



  const handleRemoveFromCart = (wishlistId) => {
    dispatch(WishListDelete(wishlistId));
  };

  const handleShowImage = (pizza) => {
    setSelectedProduct(pizza);
    setIsProductVisible(true);
  };

  const closeProduct = () => {
    setIsProductVisible(false);
  };
  const handleAddToCart = async () => {
    const product = wishlist[0].product;
    try {
      const token = sessionStorage.getItem("token");
      const isAuthenticated = !!token;

      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      const decodedToken = JSON.parse(token);
      const userId = decodedToken._id;
      const validProductCount = Number(quantity);

      if (isNaN(validProductCount) || validProductCount <= 0) {
        console.error('Invalid product count:', quantity);
        setToast("error", "Invalid product count.");
        return;
      }

      const payload = {
        productId: product._id,
        userId,
        productCount: validProductCount,
        addOnIngridiantId: selectedAddOnIngridiants,
        customizeIngridiantId: selectedCustomizeIngridiants,
      };
      await dispatch(addItemToCart(payload));
      setSelectedAddOnIngridiants([]);
      setSelectedCustomizeIngridiants([]);
      setQuantity(1);

      setToast("success", "Item added to cart successfully.");
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setToast("error", "Failed to add item to cart.");
    }
  };

  return (
    <div>
      {/* Cart Details */}
      <div className="CartDetails">
        <div className="container">
          <div className="row d-flex align-items-center mt-5 position-relative">
            <div className="col-sm-6 col-smm-6 col-md-6 order-md-1 order-sm-1 order-xl-0 d-flex justify-content-xl-start justify-content-md-end justify-content-sm-end justify-content-center align-items-center mt-lg-2 order-1 col-xsm-6 col-xs-6">
              <h1 className='position-relative text-light'>My Wishlist</h1>
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
            <div className="card">
              <div className="gallery card-body row">
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 cardImage"
                      key={item._id}
                    >
                      <div className="card bg-light text-white mb-4 w-100">
                        <div className="cart-img m-3 ">
                          <img
                            src={
                              item?.product?.images?.[0]
                                ? baseURL + item.product.images[0]
                                : pizzaimg
                            }
                            alt=""
                            className="img-fluid height-233  width-325 width-315" // Bootstrap class for responsive images
                          />
                        </div>

                        <div className="card-body ">
                          <div className="details d-flex justify-content-between">
                            <h5 className="card-title text-prime fw-900 fs-22 text-capitalize">
                              {item?.product?.title}
                            </h5>
                          </div>
                          <h4 className="priceshow mt-2">₹{item?.product?.price}.00</h4>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="addcart d-flex ms-3">
                            <button
                              className="addcart ms-3 me-3 btn btn-primary"
                              onClick={() => handleShowImage(wishlist)}
                            >
                              View
                            </button>
                          </div>

                          <button
                            className="addcart ms-3 me-3 btn btn-success  width-110"
                            onClick={handleAddToCart}
                          >
                            Add to cart
                          </button>

                          <div className="quantity-control me-4 d-flex justify-content-between align-items-center">
                            <div className="Delete-wish bg-prime">
                              <img
                                src={Delete}
                                alt="Delete"
                                onClick={() => handleRemoveFromCart(item._id)}
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-light fs-20">Your wishlist is empty</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Cart Side Menu */}
      {isProductVisible && selectedProduct && (
        <WishListDetails wishlist={selectedProduct} onClose={closeProduct} />
      )}
    </div>
  )
}

export default WishList
