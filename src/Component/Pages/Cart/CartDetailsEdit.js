import React, { useState, useEffect } from 'react';
import pizzaImg from '../../../Asstes/Images/pizza-img.png';
import { baseURL } from '../../Utils/Config';
import { ProductByCodeGet } from '../../Redux/Slice/ProductSlice';
import { useDispatch } from 'react-redux';
import { setToast } from '../../Extra/Toast';
import { CartEdit } from '../../Redux/Slice/CartSlice';

const CartDetailsEdit = ({ cart, onClose }) => {
  const dispatch = useDispatch();
  
  const [cartItem, setCartItem] = useState({
    ...cart,
    selectedAddOnIngridiants: cart.selectedAddOnIngridiants || [],
    selectedCustomizeIngridiants: cart.selectedCustomizeIngridiants || []
  });

  useEffect(() => {
    setCartItem({
      ...cart,
      selectedAddOnIngridiants: cart.selectedAddOnIngridiants || [],
      selectedCustomizeIngridiants: cart.selectedCustomizeIngridiants || []
    });
  }, [cart]);

  const handleSizeChange = (size) => {
    setCartItem(prevItem => ({
      ...prevItem,
      selectedSize: size
    }));

    const payload = {
      productCode: cart.product.productCode,
      size,
      page: 1,
      limit: 10,
      search: ''
    };

    dispatch(ProductByCodeGet(payload));
  };

  const handleIncrementQuantity = () => {
    setCartItem(prevItem => ({
      ...prevItem,
      quantity: prevItem.quantity + 1
    }));
  };

  const handleDecrementQuantity = () => {
    setCartItem(prevItem => ({
      ...prevItem,
      quantity: prevItem.quantity > 1 ? prevItem.quantity - 1 : 1
    }));
  };

  const handleAddOnChange = (ingredientId) => {
    setCartItem(prevItem => ({
      ...prevItem,
      selectedAddOnIngridiants: prevItem.selectedAddOnIngridiants.includes(ingredientId)
        ? prevItem.selectedAddOnIngridiants.filter(id => id !== ingredientId)
        : [...prevItem.selectedAddOnIngridiants, ingredientId]
    }));
  };

  const handleCustomizeChange = (ingredientId) => {
    setCartItem(prevItem => ({
      ...prevItem,
      selectedCustomizeIngridiants: prevItem.selectedCustomizeIngridiants.includes(ingredientId)
        ? prevItem.selectedCustomizeIngridiants.filter(id => id !== ingredientId)
        : [...prevItem.selectedCustomizeIngridiants, ingredientId]
    }));
  };

  const handleEditCart = () => {
    const payload = {
      cartId: cartItem._id,
      addOnIngridiantId: cartItem.selectedAddOnIngridiants,
      customizeIngridiantId: cartItem.selectedCustomizeIngridiants
    };

    dispatch(CartEdit(payload))
      .then(() => {
        setToast('Cart updated successfully!', 'Cart item updated successfully');
        onClose();
      })
      .catch((error) => {
        setToast('Failed to update cart. Please try again.', 'error');
        console.error(error);
      });
  };
  const [isClosing, setIsClosing] = useState(false);
  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); 
  };
  
  return (
    <div>
      
      <div className={`menuToggleBtn ${isClosing ? 'closing' : ''}`}>
        <div className={`menuToggleWrap ${isClosing ? 'closing' : ''}`}>
          <div className="DetailsPic ms-4 me-4">
            <img src={baseURL ? baseURL + cartItem.product.images?.[0] : pizzaImg} alt='img' />
              <button className="close-btn" onClick={closeMenu}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
          </div>
          <div className="details text-center mt-4">
            <h1 className='title'>{cartItem.product.title}</h1>
            <p className='descripanation d-flex justify-content-center'>{cartItem.product.description}</p>
            <span className='price pt-2'>₹{cartItem.product.price}</span>
          </div>

          {cartItem.product.size && (
            <div className="size mt-3 position-relative">
              <button
                className={`size-media ${cartItem.selectedSize === cartItem.product.size ? 'selected' : ''}`}
                onClick={() => handleSizeChange(cartItem.product.size)}
              >
                <p className="ps-4">{cartItem.product.size}</p>
              </button>
            </div>
          )}

          <div className="order-container">
            <div className="customize-order-box mt-4">
              <p className="section-title" style={{ fontSize: '17px' }}>Customize my order</p>
              <div className="extra-add">
                <p className="section-title">Extra Add Ingredients</p>
                {cartItem.product.addOnIngridiances?.map((ingredient, index) => (
                  <div className="ingredient-option" key={index}>
                    <span>{ingredient.name}</span>
                    <div className="price d-flex align-items-center justify">
                      <span className='pe-2'>{ingredient.price}₹</span>
                      <input
                        type="checkbox"
                        onChange={() => handleAddOnChange(ingredient._id)}
                        checked={cartItem.selectedAddOnIngridiants.includes(ingredient._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="remove-ingredients">
                <p className="section-title">Remove Ingredients</p>
                {cartItem.product.customizeIngridiances?.map((ingredient, index) => (
                  <div className="ingredient-option" key={index}>
                    <span>{ingredient.name}</span>
                    <div className="price d-flex align-items-center justify">
                      <span className='pe-2'>0₹</span>
                      <input
                        type="checkbox"
                        onChange={() => handleCustomizeChange(ingredient._id)}
                        checked={cartItem.selectedCustomizeIngridiants.includes(ingredient._id)}
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
                    value={cartItem.quantity}
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
  );
};

export default CartDetailsEdit;
