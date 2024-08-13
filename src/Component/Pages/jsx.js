

>import React from 'react';
>import pizzaImg from '../../../../Asstes/Images/pizza-img.png';
>import vegIcon from '../../../../Asstes/Images/veg-icon.png'; // Add a vegetarian icon image
>
>const PizzaArea = () => {
>    const [data, setData] = useState([]);
>
>    // Other useState and useEffect hooks...
>
>    return (
>        <div>
>            <div className="MainPizzaSection MainCategory custombackgroud">
>                <div className="container">
>                    <div className="row mt-5 position-relative">
>                        {data.map(pizza => (
>                            <div className="col-xxl-3 col-xl-4 col-lg-6 col-smm-12 mb-4 d-flex justify-content-center" key={pizza.id}>
>                                <div className="MainPizzaBox position-relative d-flex">
>                                    <div className="PizzaImg">
>                                        <img src={pizzaImg} alt='img' />
>                                        {pizza.veg && (
>                                            <div className="veg-badge">
>                                                <img src={vegIcon} alt="Veg" />
>                                            </div>
>                                        )}
>                                    </div>
>                                    <div className="pizzadetails pt-3 pe-2">
>                                        <h1 className='title pb-1'>{pizza.title}</h1>
>                                        <p className='description pb-2'>{pizza.description}</p>
>                                        <div className="price pb-2">
>                                            <p className={`title ${pizza.veg ? 'veg-text' : ''}`}>₹ {pizza.price}</p>
>                                        </div>
>                                        <div className='d-flex align-items-center'>
>                                            {!pizza.showCounter ? (
>                                                <button className={`add-show ${pizza.veg ? 'veg-button' : ''}`} onClick={() => handleAdd(pizza.id)}>ADD</button>
>                                            ) : (
>                                                <div className="counter d-flex align-items-center me-3">
>                                                    {/* Counter buttons here */}
>                                                </div>
>                                            )}
>                                            <button className='show-details'>SHOW</button>
>                                            <i className="fa-regular fa-heart" style={{ color: '#9B7A41' }}></i>
>                                        </div>
>                                    </div>
>                                </div>
>                            </div>
>                        ))}
>                    </div>
>                </div>
>            </div>
>        </div>
>    );
>};
>
>export default PizzaArea;





>.veg-badge {
>    position: absolute;
>    top: 10px;
>    left: 10px;
>    width: 20px;
>    height: 20px;
>}
>
>.veg-text {
>    color: green;
>    font-weight: bold;
>}
>
>.veg-button {
>    background-color: green;
>    color: white;
>    border: 1px solid green;
>}
