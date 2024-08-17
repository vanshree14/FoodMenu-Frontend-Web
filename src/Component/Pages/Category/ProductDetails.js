import React, { useState } from 'react';
import burgerpic from '../../../Asstes/Images/burger.jpg'; 
import deleteicon from '../../../Asstes/Icon/delete.png'; 
import { baseURL } from '../../Utils/Config';
import pizzaImg from '../../../Asstes/Images/pizza-img.png';

const ProductDetails = ({ product, closeDialog }) => {
  const [quantity, setQuantity] = useState(1);

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

  if (!product) {
    return <div>No product data available</div>; 
  }
  

  return (
    <div>
      <div className="menuToggleBtn">
        <div className="menuToggleWrap">
          <div className="DetailsPic ms-4 me-4">
          <img src={baseURL ? baseURL + product.images?.[0] : pizzaImg} alt='img' />
            <button className="close-btn" onClick={closeDialog}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>
          <div className="details text-center mt-4">
            <h1 className='title'>{product.title}</h1>
            <p className='descripanation d-flex justify-content-center'>{product.description}</p>
            <span className='price pt-2'>₹{product.price}</span>
          </div>
          <div className="size mt-3">
            <button className='size-media'><p className='ps-4'>Small</p></button>
            <button className='size-media'><p className='ps-4'>Medium</p></button>
            <button className='size-media'><p className='ps-4'>Large</p></button>
          </div>
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
                      <input type="checkbox" />
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
                      <input type="checkbox" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="quantity-order">
                <p className="section-title">Quantity order</p>
                <div className="quantity-controls">
                  {quantity > 1 ? (
                    <button className="quantity-btn" onClick={handleDecrementQuantity}>-</button>
                  ) : (
                    <button className="trash-btn" onClick={handleDeleteQuantity}>
                      <img src={deleteicon} alt='Delete' />
                    </button>
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
                <p>Add to cart - ₹{quantity * product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
