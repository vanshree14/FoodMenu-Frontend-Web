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
import { productsByCategoryGet } from '../../Redux/Slice/CategorySlice';
import burgerpic from '../../../Asstes/Images/burger-img.png'
import deleteicon from '../../../Asstes/Icon/delete.png'

const CategoryProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { categoryId } = location.state || {};
  const { product, category } = useSelector((state) => state.category);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isCartVisible, setIsCartVisible] = useState(false); // New state for cart visibility

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

  useEffect(() => {
    if (categoryId) {
      dispatch(productsByCategoryGet({ page: 0, limit: 10, categoryId }));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    dispatch(productget({ ...payload, command: false }));
  }, [page, rowPerPage, search]);

  useEffect(() => {
    setData(product);
  }, [product]);

  const currentCategory = category.find(cat => cat._id === categoryId);

  const handleAdd = (id) => {
    setData(data.map(pizza =>
      pizza._id === id ? { ...pizza, showCounter: true, count: 1 } : pizza
    ));
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

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const closeCart = () => {
    setIsCartVisible(false);
  };
  const [quantity, setQuantity] = useState(1); // State for managing quantity
  const handleIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  const handleDeleteQuantity = () => {
    setQuantity(1); // Reset quantity to 1 when deleted
  };

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
                        <button className='add-show' onClick={() => handleAdd(pizza._id)}>ADD</button>
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
                      <button className='show-details cartToggle' onClick={toggleCart}>SHOW</button>
                      <i className="fa-regular fa-heart" style={{ color: '#9B7A41' }}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
           
            <div className="col-lg-12 d-flex justify-content-center">
            <div className="cart-view">
            <p className='ps-5'>3 items</p>
            <p className='pe-5'>View cart</p>
            </div>
            </div>
            <div className="show mt-3 show-1 ">
            <div className="row position-relative" style={{ backgroundColor: '#A57F40',margin:'0px -64px' }}>
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
      {isCartVisible && (
        <div className="menuToggleBtn ">
          <div className="menuToggleWrap">
            <div className="DetailsPic ms-4 me-4">
              <img src={burgerpic} alt='img' />
              <button className="close-btn" onClick={closeCart}><i class="fa-solid fa-arrow-left"></i></button>
            </div>
            <div className="details text-center mt-4">
              <h1 className='title'>Stovetohp Burgers</h1>
              <p className='descripanation d-flex justify-content-center'>Hot & spicy pizza with onion & red
                paprika toppings and a new spicy peri..</p>
              <span className='price pt-2'>₹199</span>
            </div>
            <div className="size mt-3">
              <button className='size-media'><p className='ps-4'>small</p></button>
              <button className='size-media'> <p className='ps-4'>Medium</p></button>
              <button className='size-media'><p className='ps-4'>Large</p></button>
            </div>
            <div class="order-container">
              <div class="customize-order-box mt-4">
                <p class="section-title" style={{ fontSize: '17px' }}>Customize my order</p>
                <div class="extra-add">
                  <p class="section-title">Extra Add Ingredients</p>
                  <div class="ingredient-option">
                    <span>Extra Cheese Slice</span>
                    <div className="price d-flex align-items-center justify">
                      <span className='pe-2'>20₹</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                  <div class="ingredient-option">
                    <span>Extra Cheese Burst</span>
                    <div className="price d-flex align-items-center justify">

                      <span className='pe-2'>89₹</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                  <div class="ingredient-option">
                    <span>Extra Double Cheese</span>
                    <div className="price d-flex align-items-center justify">

                      <span className='pe-2'>99₹</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
                <div class="remove-ingredients">
                  <p class="section-title">Remove Ingredients</p>
                  <div class="ingredient-option">
                    <span>No Tometo</span>
                    <div className="price d-flex align-items-center justify">

                      <span className='pe-2'>0₹</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                  <div class="ingredient-option">
                    <span>No Onion</span>
                    <div className="price d-flex align-items-center justify">

                      <span className='pe-2'>0₹</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                  <div class="ingredient-option">
                    <span>No Lettuce</span>
                    <div className="price d-flex align-items-center justify">

                      <span className='pe-2'>0₹</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
                <div class="quantity-order">
                  <p class="section-title">Quantity order</p>
                  <div className="quantity-controls">
                    {quantity > 1 ? (
                      <>
                        <button className="quantity-btn" onClick={handleDecrementQuantity}>-</button>
                      </>
                    ) : (
                      <>
                        <button className="trash-btn" onClick={handleDeleteQuantity}><img src={deleteicon} alt='img' /></button>
                      </>
                    )}
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      className="quantity-input"
                      readOnly
                    />
                    <button className="quantity-btn" onClick={handleIncrementQuantity}>+</button>
                  </div>
                </div>
                <div className="cart mt-4 mb-5">
                  <p>Add to cart - ₹{quantity * 199}</p>
                </div>
              </div>
            </div>




          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
