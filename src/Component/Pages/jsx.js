import React, { useState } from 'react';
import BannerbackgroundImg from '../../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import Searching from '../../../Extra/Searching';
import logobar from '../../../../Asstes/Images/loginLogo.png';
import pizzaImg from '../../../../Asstes//Images/pizza-img.png';
import Delete from '../../../../Asstes/Icon/delete.png';
import Like from '../../../../Asstes/Images/LIKE.png';

const PizzaArea = () => {
    const [data, setData] = useState([]);
    const initialPizzas = [
        { id: 1, count: 0, showCounter: false },
        { id: 2, count: 0, showCounter: false },
        { id: 3, count: 0, showCounter: false },
        { id: 4, count: 0, showCounter: false },
        { id: 5, count: 0, showCounter: false },
        { id: 6, count: 0, showCounter: false },
        { id: 7, count: 0, showCounter: false },
        { id: 8, count: 0, showCounter: false },
        { id: 9, count: 0, showCounter: false },
        { id: 10, count: 0, showCounter: false },
        { id: 11, count: 0, showCounter: false },
        { id: 12, count: 0, showCounter: false },
        { id: 13, count: 0, showCounter: false },
        { id: 14, count: 0, showCounter: false },
        { id: 15, count: 0, showCounter: false },
        { id: 16, count: 0, showCounter: false },
    ];

    const [pizzas, setPizzas] = useState(initialPizzas);

    const handleAdd = (id) => {
        setPizzas(pizzas.map(pizza =>
            pizza.id === id ? { ...pizza, showCounter: true, count: 1 } : pizza
        ));
    };

    const handleIncrement = (id) => {
        setPizzas(pizzas.map(pizza =>
            pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
        ));
    };

    const handleDecrement = (id) => {
        setPizzas(pizzas.map(pizza => {
            if (pizza.id === id) {
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
        setPizzas(pizzas.map(pizza =>
            pizza.id === id ? { ...pizza, showCounter: false, count: 0 } : pizza
        ));
    };

    return (
        <div>
            <div className="MainPizzaSection MainCategory custombackgroud" style={{ backgroundImage: `url(${BannerbackgroundImg})` }} >
                <div className="container">
                    <div className="row d-flex align-items-center mt-5 position-relative">
                        <div className="col-xl-7 col-lg-12 d-flex align-items-center col-md-12 order-2 order-smm-1 order-lg-1 mb-3 mb-lg-0 col-sm-12 col-smm-12 justify-content-md-center justify-content-xl-start mt-lg-2">
                            <div className="retrun-icon-2 me-5 d-block text-light position-relative">
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>

                            <div className="categoryHeader">
                                <p className="text-light">pizza</p>
                            </div>
                        </div>
                        <div className="col-xl-5 col-md-12 order-xl-1 mb-lg-3 mb-md-3 d-md-flex justify-content-md-center">
                            <div className="logobar text-center">
                                <img src={logobar} alt="logo" className="img" />
                            </div>
                        </div>
                        <div className="mt-4 col-xl-9 col-md-12 order-smm-1 order-2 order-lg-1 mb-3 mb-lg-0 col-sm-6">
                            <div className="retrun-icon text-light position-relative">
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-12 order-xl-1 mb-md-3 mt-4 d-md-flex justify-content-md-center">
                            <div className="search-Bar">
                                <Searching
                                    type={`server`}
                                    data={data}
                                    setData={setData}
                                    className={`w-100`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 position-relative" style={{ backgroundColor: '#9B7A41' }}>
                        <div className="col-lg-6" style={{ backgroundColor: '#323231' }}>
                            <div className="pizza-media">
                                <button className='pizza-login'>pizza</button>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="combo-media">
                                <button className='combo-login'>pizza</button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 position-relative">
                        {pizzas.map(pizza => (
                            <div className={`col-xxl-3 col-xl-4 col-lg-6 mb-4 ${pizza.id % 3 === 2 ? 'some-class' : pizza.id % 3 === 0 ? 'another-class' : ''}`} key={pizza.id}>
                                <div className="MainPizzaBox position-relative d-flex">
                                    <div className="PizzaImg">
                                        <img src={pizzaImg} alt='img' />
                                    </div>
                                    <div className="pizzadetails pt-3">
                                        <h1 className='title pb-1'>Blazing Onion & Paprika</h1>
                                        <p className='descripnation pb-2'>Hot & spicy pizza with onion & red
                                            paprika toppings and a new spicy peri..</p>
                                        <div className="price pb-2">
                                            <p className='title'>₹ 299</p>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            {!pizza.showCounter ? (
                                                <button className='add-show' onClick={() => handleAdd(pizza.id)}>ADD</button>
                                            ) : (
                                                <div className="counter d-flex align-items-center me-3">
                                                    {pizza.count > 1 ? (
                                                        <button className="decrement me-1" onClick={() => handleDecrement(pizza.id)}>-</button>
                                                    ) : (
                                                        <div className="counter-button" onClick={() => handleDelete(pizza.id)}>
                                                            <img src={Delete} alt="Delete" />
                                                        </div>
                                                    )}
                                                    <span className="counter-number">{pizza.count}</span>
                                                    <button className="increment" onClick={() => handleIncrement(pizza.id)}>+</button>
                                                </div>
                                            )}
                                            <button className='show-details'>SHOW</button>
                                            <i className="fa-regular fa-heart" style={{ color: '#9B7A41' }}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-12 d-flex justify-content-center">
                        <div className="cart-view d-flex justify-content-between align-items-center">
                            <p className='ps-5'>3 items</p>
                            <p className='pe-5'>view items</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaArea;
