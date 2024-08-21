import React, { useEffect, useState } from 'react';
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import logobar from '../../../Asstes/Images/loginLogo.png';
import Searching from '../../Extra/Searching';
import pizzaImg from '../../../Asstes/Images/pizza-img.png';
import Delete from '../../../Asstes/Icon/delete.png';
import pizzaicon from '../../../Asstes/Images/pizza-icon.png';
import comboicon from '../../../Asstes/Images/combo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productget } from '../../Redux/Slice/ProductSlice';
import { baseURL } from '../../Utils/Config';
import left from '../../../Asstes/Icon/left.png';
import { categoryGet, productsByCategoryGet } from '../../Redux/Slice/CategorySlice';
import burgerpic from '../../../Asstes/Images/burger-img.png'
import deleteicon from '../../../Asstes/Icon/delete.png'
import { addItemToCart } from '../../Redux/Slice/CartSlice';
import { openDialog } from '../../Redux/Slice/DialogueSlice';
import ProductDetails from './ProductDetails';
import { jwtDecode } from 'jwt-decode';

const CategoryProducts = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { categoryId } = location.state || {};
  const { product, category } = useSelector((state) => state.category);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isProductVisible, setIsProductVisible] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAddOnIngridiants, setSelectedAddOnIngridiants] = useState([]);
  const [selectedCustomizeIngridiants, setSelectedCustomizeIngridiants] = useState([]);
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
    navigate('/cart')
  }

  useEffect(() => {
    if (categoryId) {
      dispatch(productsByCategoryGet({ page: 0, limit: 10, categoryId }));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    dispatch(productget({ ...payload, command: false }));
  }, [page, rowPerPage, search]);

  useEffect(() => {
    dispatch(categoryGet({ ...payload, command: false }));
  }, [page, rowPerPage, search]);


  useEffect(() => {
    setData(product);
  }, [product]);
  const productMaterId = localStorage.getItem("productId");


  const currentCategory = category.find(cat => cat._id === categoryId);

  const handleAddToCart = (selectedProductId) => {
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(token);
    const userId = decodedToken._id;
    const payload = {
      productId: selectedProductId,
      userId: userId,
      productCount,
      addOnIngridiantId: selectedAddOnIngridiants,
      customizeIngridiantId: selectedCustomizeIngridiants,
    };

    dispatch(addItemToCart(payload));
  };


  const handleIncrement = (id) => {
    setData(data.map(pizza =>
      pizza._id === id ? { ...pizza, count: pizza.count + 1 } : pizza
    ));
  };

  const handleDecrement = (id) => {
    setData(data.map(pizza => {
      if (pizza._id === id) {
        if (pizza.count > 1) {
          return { ...pizza, count: pizza.count - 1 };
        } else {
          return { ...pizza, showCounter: false, count: 0 };
        }
      }
      return pizza;
    }));
  };

  const handleDelete = (id) => {
    setData(data.map(pizza =>
      pizza._id === id ? { ...pizza, showCounter: false, count: 0 } : pizza
    ));
  };

  const handlenavClick = () => {
    navigate('/categories');
  };

  const handleShowImage = (pizza) => {
    setSelectedProduct(pizza);
    setIsProductVisible(true);
  };

  const closeCart = () => {
    setIsProductVisible(false);
  };
  const [quantity, setQuantity] = useState(1);


  return (
    <div>
      <div className="MainPizzaSection MainCategory custombackgroud" style={{ backgroundImage: `url(${BannerbackgroundImg})` }}>
        <div className="container">
          <div className="row d-flex align-items-center mt-5 position-relative">
            <div className="col-xl-7 col-lg-12 d-flex align-items-center col-md-12 order-2 order-smm-1 order-lg-1 mb-lg-0 col-sm-12 col-smm-12 justify-content-md-center justify-content-xl-start mt-lg-2">
              <div className="retrun-icon-2 me-5 d-block text-light position-relative" onClick={handlenavClick}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              {currentCategory && (
                <div className="categoryHeader">
                  <p className="text-light">{currentCategory.name}</p>  {/* Display category name */}
                </div>
              )}
            </div>
            <div className="col-xl-5 col-md-12 order-xl-1 mb-lg-3 mb-md-3 d-md-flex justify-content-md-center">
              <div className="logobar text-center">
                <img src={logobar} alt="logo" className="img" />
              </div>
            </div>
            <div className="mt-4 col-xl-9 col-md-12 order-smm-1 order-2 order-lg-1 mb-3 mb-lg-0 col-sm-6">
              <div className="retrun-icon text-light position-relative" onClick={handlenavClick}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 order-xl-1 mb-md-3 mt-4 d-md-flex justify-content-md-center">
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

          <div className="show mt-3">
            <div className="row position-relative" style={{ backgroundColor: '#A57F40' }}>
              <div className="col-lg-6" style={{ backgroundColor: '#323232' }}>
                <div className="menu-item">
                  <img src={pizzaicon} alt="Pizza Icon" className="icon" />
                  {currentCategory && (
                    <span className='text-uppercase'>{currentCategory.name}</span>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="menu-item">
                  <img src={comboicon} alt="Combo Icon" className="icon" />
                  <span>COMBO</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 position-relative">
            {data?.map(pizza => (
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-smm-12 mb-4 d-flex justify-content-center" key={pizza._id}>
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

                  <div className="pizzadetails pt-3 pe-2">
                    <h1 className='title pb-1'>{pizza.title}</h1>
                    <p className='descripnation pb-2'>{pizza.description}</p>
                    <div className="price pb-2">
                      <p className='title'>₹ {pizza.price}</p>
                    </div>
                    <div className='d-flex align-items-center'>
                      {!pizza.showCounter ? (
                        <button className='add-show' onClick={() => handleAddToCart(pizza._id)}>ADD</button>
                      ) : (
                        <div className="counter d-flex align-items-center me-3">
                          {pizza.count > 1 ? (
                            <button className="decrement me-1" onClick={() => handleDecrement(pizza._id)}>-</button>
                          ) : (
                            <div className="counter-button" onClick={() => handleDelete(pizza._id)}>
                              <img src={Delete} alt="Delete" />
                            </div>
                          )}
                          <span className="counter-number">{pizza.count}</span>
                          <button className="increment" onClick={() => handleIncrement(pizza._id)}>+</button>
                        </div>
                      )}
                      <button className='show-details cartToggle' onClick={() => handleShowImage(pizza)}>
                        SHOW
                      </button>

                      <i className="fa-regular fa-heart" style={{ color: '#9B7A41' }}></i>
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
        </div>
      </div>


      {/* Cart Side Menu */}

      {isProductVisible && selectedProduct && (
        <ProductDetails product={selectedProduct} closeDialog={closeCart} />
      )}

    </div>
  );
};

export default CategoryProducts;

