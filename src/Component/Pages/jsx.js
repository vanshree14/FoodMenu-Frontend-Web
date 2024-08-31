import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import logobar from '../../../Asstes/Images/loginLogo.png';
import Searching from '../../Extra/Searching';
import pizzaImg from '../../../Asstes/Images/pizza-img.png';
import Delete from '../../../Asstes/Icon/delete.png';
import pizzaicon from '../../../Asstes/Images/pizza-icon.png';
import comboicon from '../../../Asstes/Images/combo.png';
import { productsByCategoryGet, categoryGet } from '../../Redux/Slice/CategorySlice';
import { comboget } from '../../Redux/Slice/ComboSlice';
import { addItemToCart, CartQuntity, removeFromCart } from '../../Redux/Slice/CartSlice';
import ProductDetails from './ProductDetails';
import { baseURL } from '../../Utils/Config';

const CategoryProducts = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { categoryId } = location.state || {};
  const { product, category } = useSelector((state) => state.category);
  const { combo } = useSelector((state) => state.combo);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isProductVisible, setIsProductVisible] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productCount, setProductCount] = useState(1);

  const payload = {
    page,
    limit: rowPerPage,
    search
  };

  const handleSearch = (query) => {
    setSearch(query);
    const filteredData = product.filter(pizza =>
      pizza.title.toLowerCase().includes(query.toLowerCase()) ||
      pizza.description.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  const handleCart = () => {
    navigate('/booking/cart');
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(productsByCategoryGet({ page: 0, limit: 10, categoryId }));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    dispatch(categoryGet({ ...payload, command: false }));
  }, [page, rowPerPage, search]);

  useEffect(() => {
    setData(product);
  }, [product]);

  const currentCategory = category.find(cat => cat._id === categoryId);

  const handleAddToCart = (selectedProductId) => {
    const token = sessionStorage.getItem("token");
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const decodedToken = JSON.parse(token);
    const userId = decodedToken._id;
    const validProductCount = Number(productCount);

    if (isNaN(validProductCount)) {
      console.error('Invalid product count:', productCount);
      return;
    }

    const payload = {
      productId: selectedProductId,
      userId: userId,
      productCount: validProductCount,
    };

    dispatch(addItemToCart(payload));

    setData(prevData =>
      prevData.map(pizza =>
        pizza._id === selectedProductId
          ? { ...pizza, showCounter: true, count: (pizza.count || 0) + validProductCount }
          : pizza
      )
    );
    setProductCount(1);
  };

  const handleIncrement = (selectedProductId) => {
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(token);
    const userId = decodedToken._id;

    setData(prevData =>
      prevData.map(pizza =>
        pizza._id === selectedProductId
          ? { ...pizza, count: (parseInt(pizza.count) || 0) + 1 } : pizza
      )
    );
    dispatch(CartQuntity({ userId, productId: selectedProductId, action: true }));
  };

  const handleDecrement = (selectedProductId) => {
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(token);
    const userId = decodedToken._id;

    setData(prevData =>
      prevData.map(pizza =>
        pizza._id === selectedProductId
          ? { ...pizza, count: (parseInt(pizza.count) || 0) - 1 } : pizza));
    dispatch(CartQuntity({ userId, productId: selectedProductId, action: false }));
  };

  const handleDelete = (selectedProductId) => {
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(token);
    const userId = decodedToken._id;

    setData(prevData =>
      prevData.map(pizza =>
        pizza._id === selectedProductId
          ? {
            ...pizza,
            count: Math.max((parseInt(pizza.count) || 0) - 1, 0),
            showCounter: (parseInt(pizza.count) || 0) - 1 > 0
          }
          : pizza)
    );
    dispatch(removeFromCart({ userId, productId: selectedProductId, action: false }));
  };

  const handlenavClick = () => {
    navigate('/booking/categories');
  };

  const handleShowImage = (pizza) => {
    setSelectedProduct(pizza);
    setIsProductVisible(true);
  };

  const closeProduct = () => {
    setIsProductVisible(false);
  };

  const handleComboClick = () => {
    dispatch(comboget(payload));
    setData(combo);
  };

  return (
    <div>
      <div className="MainPizzaSection MainCategory">
        <div className="container">
          {/* Header and Logo Section */}
          <div className="row d-flex align-items-center mt-5 position-relative">
            <div className="col-6 d-flex align-items-center order-4 order-xl-1 mb-lg-0 justify-content-md-center justify-content-xl-start justify-content-center justify-content-lg-start mt-lg-2">
              {currentCategory && (
                <div className="categoryHeader">
                  <p className="text-light">{currentCategory.name}</p>
                </div>
              )}
            </div>
            <div className="col-xl-6 col-md-12 order-xl-2 mb-lg-3 mb-md-3 d-flex justify-content-xl-end justify-content-md-center justify-content-sm-center justify-content-center">
              <div className="logobar text-center">
                <img src={logobar} alt="logo" className="img" />
              </div>
            </div>
            <div className="col-6 order-lg-3 order-2 mb-3 mb-lg-0 d-flex align-items-center mt-lg-2 justify-content-md-center justify-content-xl-start">
              <div className="retrun-icon text-light position-relative" onClick={handlenavClick}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>
            <div className="col-xl-6 col-md-12 order-xl-4 mt-4 d-flex justify-content-xl-end justify-content-md-center justify-content-center">
              <div className="search-Bar">
                <Searching
                  type="server"
                  data={data}
                  setData={setData}
                  serverSearching={handleSearch}
                  className="w-100"
                />
              </div>
            </div>
          </div>

          {/* Menu Items Section */}
          <div className="show mt-3">
            <div className="row position-relative" style={{ backgroundColor: '#A57F40' }}>
              <div className="col-lg-6" style={{ backgroundColor: '#323232' }}>
                <div className="menu-item" onClick={() => dispatch(productsByCategoryGet({ categoryId, page: 0, limit: 10 }))}>
                  <img src={pizzaicon} alt="Pizza Icon" className="icon" />
                  <span className='text-uppercase'>{currentCategory?.name || "Pizza"}</span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="menu-item" onClick={handleComboClick}>
                  <img src={comboicon} alt="Combo Icon" className="icon" />
                  <span>COMBO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Display Section */}
          <div className="row mt-5 position-relative">
            {data?.map(pizza => (
              <div className="col-xxl-3 col-xl-4 col-md-12 col-lg-6 col-sm-12 col-smm-12 mb-4 d-flex justify-content-center" key={pizza._id}>
                <div className="MainPizzaBox position-relative d-flex">
                  <div className="PizzaImg">
                    <img src={baseURL ? baseURL + pizza.images?.[0] : pizzaImg} alt='img' />
                    <div className="type-icon">
                      {pizza.type === 'veg' ? (
                        <div className="veg-flag"><span className="dot"></span></div>
                      ) : pizza.type === 'non-veg' ? (
                        <div className="Non-veg-flag"><span className="dot"></span></div>
                      ) : null}
                    </div>
                  </div>

                  <div className="pizzadetails pt-3  p10-smm-x">
                    <h1 className='title pb-1'>{pizza.title}</h1>
                    <p className='descripnation pb-2'>{pizza.description}</p>
                    <div className="price pb-2">
                      {pizza.price && <p className='title'>₹ {pizza.price}</p>}
                      {pizza.oldComboPrice && <p className='title'>₹ {pizza.oldComboPrice}</p>}
                      {pizza.newComboPrice && <p className='title'>₹ {pizza.newComboPrice}</p>}
                    </div>

                    <div className='button-container d-flex align-items-center' style={{ gap: '10px' }}>
                      {!pizza.showCounter ? (
                        <button className='add-show' onClick={() => handleAddToCart(pizza._id)}>ADD</button>
                      ) : (
                        <div className="counter d-flex align-items-center me-3">
                          {pizza.count > 1 ? (
                            <button className="decrement me-1" onClick={() => handleDecrement(pizza._id, false)}>-</button>
                          ) : (
                            <div className="counter-button" onClick={() => handleDelete(pizza._id)}>
                              <img src={Delete} alt="Delete" />
                            </div>
                          )}
                          <span className="counter-number">{pizza.count}</span>
                          <button className="increment" onClick={() => handleIncrement(pizza._id, true)}>+</button>
                        </div>
                      )}
                      <button className='show-details cartToggle' onClick={() => handleShowImage(pizza)}>
                        SHOW
                      </button>
                      <i className="fa-regular fa-heart ps-5" style={{ color: '#9B7A41' }}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-lg-12 d-flex justify-content-center">
              <div className="cart-view">
                <p className='ps-5'>3 items</p>
                <p className='pe-5' onClick={handleCart}>View cart</p>
              </div>
            </div>
            <div className="show mt-3 show-1 ">
              <div className="row position-relative" style={{ backgroundColor: '#A57F40', margin: '0px -64px' }}>
                <div className="col" style={{ backgroundColor: '#323232' }}>
                  <div className="menu-item">
                    <img src={pizzaicon} alt="Pizza Icon" className="icon" />
                    {currentCategory && (
                      <span className='text-uppercase'>{currentCategory.name}</span>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="menu-item">
                    <img src={comboicon} alt="Combo Icon" className="icon" />
                    <span>COMBO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Side Menu */}

          {isProductVisible && selectedProduct && (
            <ProductDetails product={selectedProduct} closeDialog={closeProduct} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;


import React from 'react';
import './Profile.css'; // Importing the CSS file for styling

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="header">
        <div className="back-button">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="logo">FOOD LOGO</div>
        <div className="tagline">Your Tagline</div>
      </div>

      <div className="profile-details">
        <h1>PROFILE</h1>
        <p>Male</p>
        <div className="user-info">
          <div className="user-detail">
            <i className="fa-solid fa-user"></i>
            <span>Jorden Sorai</span>
          </div>
          <div className="user-detail">
            <i className="fa-solid fa-envelope"></i>
            <span>jordensi@gmail.com</span>
          </div>
        </div>
        <hr />
        <div className="action-list">
          <button className="action-button">
            <i className="fa-solid fa-box"></i> My Orders
          </button>
          <button className="action-button">
            <i className="fa-solid fa-shopping-cart"></i> My Cart
          </button>
          <button className="action-button">
            <i className="fa-solid fa-phone"></i> Call Outlet
          </button>
          <button className="action-button">
            <i className="fa-brands fa-facebook"></i> Facebook
          </button>
          <button className="action-button">
            <i className="fa-brands fa-instagram"></i> Instagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;



.profile-container {
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 18px;
  cursor: pointer;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #c5a35f;
}

.tagline {
  font-size: 12px;
  color: #c5a35f;
}

.profile-details {
  text-align: center;
}

.user-info {
  margin: 20px 0;
}

.user-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.user-detail i {
  margin-right: 10px;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-button {
  background-color: transparent;
  border: 1px solid #c5a35f;
  border-radius: 5px;
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
}

.action-button i {
  margin-right: 10px;
}


