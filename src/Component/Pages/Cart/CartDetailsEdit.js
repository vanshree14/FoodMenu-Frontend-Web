import React, { useState, useEffect } from 'react';
import pizzaImg from '../../../Asstes/Images/pizza-img.png';
import { baseURL } from '../../Utils/Config';
import { ProductByCodeGet } from '../../Redux/Slice/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToast } from '../../Extra/Toast';
import { CartEdit } from '../../Redux/Slice/CartSlice';

const CartDetailsEdit = ({  onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();
  const [selectedAddOnIngridiants, setSelectedAddOnIngridiants] = useState([]);
  const { product } = useSelector(state => state.product);

  const [selectedCustomizeIngridiants, setSelectedCustomizeIngridiants] = useState([]);

  useEffect(() => {
    if (product) {
      const sizeData = product.size;
      if (sizeData && sizeData !== '-') {
        setSelectedSize(sizeData);
      } else {
        setSelectedSize('');
      }
      setSelectedAddOnIngridiants(product.addOnIngridiances?.map(item => item._id) || []);
      setSelectedCustomizeIngridiants(product.customizeIngridiances?.map(item => item._id) || []);
    }
  }, [product]);

  const handleSizeChange = (size, page = 1, limit = 10, search = '') => {
    setSelectedSize(size);

    const payload = {
      productCode: product.productCode,
      size,
      page,
      limit,
      search
    };

    dispatch(ProductByCodeGet(payload));
  };

  const handleIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddOnChange = (ingredientId) => {
    setSelectedAddOnIngridiants(prevSelected => {
      if (prevSelected.includes(ingredientId)) {
        return prevSelected.filter(id => id !== ingredientId);
      } else {
        return [...prevSelected, ingredientId];
      }
    });
  };

  const handleCustomizeChange = (ingredientId) => {
    setSelectedCustomizeIngridiants(prevSelected => {
      if (prevSelected.includes(ingredientId)) {
        return prevSelected.filter(id => id !== ingredientId);
      } else {
        return [...prevSelected, ingredientId];
      }
    });
  };

  if (!product) {
    return <div>No product data available</div>;
  }

  const handleEditCart = () => {
    const payload = {
      cartId: product.cartId,
      addOnIngridiantId: selectedAddOnIngridiants,
      customizeIngridiantId: selectedCustomizeIngridiants,
    };

    dispatch(CartEdit(payload))
      .then(() => {
        setToast('Cart updated successfully!', 'success');
        onClose();
      })
      .catch((error) => {
        setToast('Failed to update cart. Please try again.', 'error');
        console.error(error);
      });
  };

  const sizeData = product.size;
  const availableSizes = sizeData && sizeData !== '-' ? [sizeData] : [];

  return (
    <div>
      <div className="menuToggleBtn">
        <div className="menuToggleWrap">
          <div className="DetailsPic ms-4 me-4">
            <img src={baseURL ? baseURL + product.images?.[0] : pizzaImg} alt='img' />
            <button className="close-btn" onClick={onClose}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>
          <div className="details text-center mt-4">
            <h1 className='title'>{product.title}</h1>
            <p className='descripanation d-flex justify-content-center'>{product.description}</p>
            <span className='price pt-2'>₹{product.price}</span>
          </div>

          {availableSizes.length > 0 && (
            <div className="size mt-3 position-relative">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`size-media ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeChange(size)}
                >
                  <p className="ps-4">{size}</p>
                </button>
              ))}
            </div>
          )}

          <div className="order-container">
            <div className="customize-order-box mt-4">
              <p className="section-title" style={{ fontSize: '17px' }}>Customize my order</p>
              <div className="extra-add">
                <p className="section-title">Extra Add Ingredients</p>
                {product.addOnIngridiances?.map((ingredient, index) => (
                  <div className="ingredient-option" key={index}>
                    <span>{ingredient.name}</span>
                    <div className="price d-flex align-items-center justify">
                      <span className='pe-2'>{ingredient.price}₹</span>
                      <input
                        type="checkbox"
                        onChange={() => handleAddOnChange(ingredient._id)}
                        checked={selectedAddOnIngridiants.includes(ingredient._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="remove-ingredients">
                <p className="section-title">Remove Ingredients</p>
                {product.customizeIngridiances?.map((ingredient, index) => (
                  <div className="ingredient-option" key={index}>
                    <span>{ingredient.name}</span>
                    <div className="price d-flex align-items-center justify">
                      <span className='pe-2'>0₹</span>
                      <input
                        type="checkbox"
                        onChange={() => handleCustomizeChange(ingredient._id)}
                        checked={selectedCustomizeIngridiants.includes(ingredient._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="quantity-order">
                <p className="section-title">Quantity order</p>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={handleDecrementQuantity}>-</button>
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
              <div className="cart mt-4 mb-5 position-relative" onClick={handleEditCart}>
                <p>Edit Cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDetailsEdit;
