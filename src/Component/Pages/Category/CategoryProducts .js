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
import { categoryGet, productsByCategoryGet } from '../../Redux/Slice/CategorySlice';
import { addItemToCart, CartQuntity, removeFromCart } from '../../Redux/Slice/CartSlice';
import Loader from '../../Utils/Loader';
import ProductDetails from './ProductDetails';
import { comboCategoryGet } from '../../Redux/Slice/ComboSlice';
import { WishListCreate } from '../../Redux/Slice/WishListSlice';
import { setToast } from '../../Extra/Toast';

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
  const [isProductVisible, setIsProductVisible] = useState(false);
  const { auth, isLoading } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAddOnIngridiants, setSelectedAddOnIngridiants] = useState([]);
  const [selectedCustomizeIngridiants, setSelectedCustomizeIngridiants] = useState([]);
  const [productCount, setProductCount] = useState(1);
  const { combo } = useSelector((state) => state.combo);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const totalCount = useSelector((state) => state.cart.totalCount);


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
    dispatch(productget({ ...payload, command: false }));
  }, [page, rowPerPage, search]);

  useEffect(() => {
    dispatch(categoryGet({ ...payload, command: false }));
  }, [page, rowPerPage, search]);

  useEffect(() => {
    const categoryId = location.state?.categoryId || null;

    if (!categoryId) {
      console.warn("Category ID is undefined. Ensure it is correctly passed.");
      return;
    }

    const payload = {
      categoryId,
      page: page || 0,
      limit: rowPerPage || 10,
      search: search || '',
      command: false,
    };

    dispatch(productsByCategoryGet(payload));
  }, [page, rowPerPage, search, location.state?.categoryId]);


  useEffect(() => {
    setData(product);
  }, [product]);




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
      addOnIngridiantId: selectedAddOnIngridiants,
      customizeIngridiantId: selectedCustomizeIngridiants,
    };

    dispatch(addItemToCart(payload));

    setData(prevData =>
      prevData.map(pizza =>
        pizza._id === selectedProductId
          ? { ...pizza, showCounter: true, count: (pizza.count || 0) + validProductCount }
          : pizza
      )
    );
    setSelectedAddOnIngridiants([]);
    setSelectedCustomizeIngridiants([]);
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
  const handleComboClick = async () => {
    const categoryId = location.state?.categoryId || null;

    if (!categoryId) {
      console.warn("Category ID is undefined. Ensure it is correctly passed.");
      return;
    }

    const payload = {
      categoryId,
      page: 0,
      limit: 10,
    };

    try {
      await dispatch(comboCategoryGet(payload));

      setData(combo);
    } catch (error) {
      console.error("Error fetching combo category data:", error);
    }
  };

  const currentCategory = category.find(cat => cat._id === categoryId);

  const handleWishList = async (selectedProductId) => {
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(token);
    const userId = decodedToken._id;

    const payload = {
      productId: selectedProductId,
      userId: userId,
    };
    dispatch(WishListCreate(payload))
      .then(() => {
        setToast('sucees', 'Wishlist created successfully');
      })
      .catch((error) => {
        setToast('Failed to update cart. Please try again.', 'error');
        console.error(error);
      });
  }

  return (
    <div>
      <div className="MainPizzaSection MainCategory">
        <div className="container">
          <div className="row d-flex align-items-center mt-5 position-relative">
            {/* Category Name */}
            <div className="col-6  d-flex align-items-center  order-4 order-xl-1 mb-lg-0  justify-content-md-center  justify-content-center justify-content-lg-start mt-lg-2">
              {currentCategory && (
                <div className="categoryHeader">
                  <p className="text-light">{currentCategory.name}</p>
                </div>
              )}
            </div>

            {/* Logo Bar */}
            <div className="col-xl-6 col-md-12 order-xl-2  mb-lg-3 mb-md-3 d-flex justify-content-xl-end justify-content-md-center justify-content-sm-center justify-content-center">
              <div className="logobar text-center">
                <img src={logobar} alt="logo" className="img" />
              </div>
            </div>

            {/* Return Icon */}
            <div className="col-6 order-lg-3 order-2  mb-3 mb-lg-0 d-flex align-items-center justify-content-center mt-lg-2 justify-content-md-center justify-content-xl-start ">
              <div className="retrun-icon text-light position-relative" onClick={handlenavClick}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>

            {/* Search Bar */}
            <div className="col-xl-6 col-md-12 order-xl-4  mt-4 d-flex   justify-content-xl-end justify-content-md-center justify-content-center">
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
                <div className="menu-item" onClick={() => dispatch(productsByCategoryGet({ categoryId, page: 0, limit: 10 }))}>
                  <img src={pizzaicon} alt="Pizza Icon" className="icon" />
                  {currentCategory && (
                    <span className='text-uppercase'>{currentCategory.name}</span>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="menu-item" onClick={handleComboClick}>
                  <img src={comboicon} alt="Combo Icon" className="icon" />
                  <span >COMBO</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 position-relative">
            {data?.map(pizza => (
              <div className=" col mb-4 d-flex  justify-content-sm-center justify-content-center justify-content-xl-start  " key={pizza._id}>
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
                    <div className="mainprice pb-2 d-flex">
                      {pizza.isCombo ? (
                        <>
                          {pizza.newComboPrice > 0 && <p className='title pe-3 fs-18'>₹ {pizza.newComboPrice}</p>}
                          {pizza.oldComboPrice > 0 && <p className=' old-price d-flex align-items-center'>₹ {pizza.oldComboPrice}</p>}
                        </>
                      ) : (
                        <p className='title fs-18'>₹ {pizza.price}</p>
                      )}
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
                      <i className="fa-regular fa-heart p65-left" style={{ color: '#9B7A41' }}  onClick={() => handleWishList(pizza._id)}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-12 d-flex justify-content-center">

              <div className="cart-view">
                <p className='ps-5'>{totalCount} items</p>
                <p className='pe-5' onClick={handleCart}>View cart</p>
              </div>

            </div>
            <div className="show mt-3 show-1 ">
              <div className="row position-relative" style={{ backgroundColor: '#A57F40', margin: '0px -64px' }}>
                <div className="col" style={{ backgroundColor: '#323232' }}>
                  <div className="menu-item " onClick={() => dispatch(productsByCategoryGet({ categoryId, page: 0, limit: 10 }))}>
                    <img src={pizzaicon} alt="Pizza Icon" className="icon" />
                    {currentCategory && (
                      <span className='text-uppercase'>{currentCategory.name}</span>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="menu-item" onClick={handleComboClick}>
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
        <ProductDetails product={selectedProduct} onClose={closeProduct} />
      )}


    </div>
  );
};

export default CategoryProducts;



