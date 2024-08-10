import React, { useState } from 'react'
import BannerbackgroundImg from '../../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import Searching from '../../../Extra/Searching';
import logobar from '../../../../Asstes/Images/loginLogo.png'
import pizzaImg from '../../../../Asstes//Images/pizza-img.png'



const PizzaArea = () => {
    const [data, setData] = useState([]);

    return (
        <div>
            <div className="MainPizzaSection MainCategory custombackgroud" style={{ backgroundImage: `url(${BannerbackgroundImg})` }} >
                <div className="container">
                    <div className="row d-flex align-items-center mt-5 position-relative" >
                        <div className="col-xl-7 col-lg-12 d-flex align-items-center col-md-12 order-2 order-smm-1 order-lg-1  mb-3 mb-lg-0  col-sm-12 col-smm-12 justify-content-md-center justify-content-xl-start mt-lg-2">
                            <div className="retrun-icon-2 me-5 d-block text-light position-relative " >
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>

                            <div className="categoryHeader">
                                <p className="text-light">pizza</p>
                            </div>
                        </div>
                        <div className="col-xl-5 col-md-12 order-xl-1 mb-lg-3 mb-md-3  d-md-flex justify-content-md-center">
                            <div className="logobar text-center  ">
                                <img src={logobar} alt="logo" className="img" />
                            </div>
                        </div>
                        <div className=" mt-4  col-xl-9 col-md-12 order-smm-1 order-2 order-lg-1  mb-3 mb-lg-0  col-sm-6">
                            <div className="retrun-icon text-light position-relative ">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-12 order-xl-1 mb-md-3   mt-4 d-md-flex justify-content-md-center">
                            <div className="search-Bar">
                                <Searching
                                    type={`server`}
                                    data={data}
                                    setData={setData}
                                    // column={categoryTable}
                                    // serverSearching={handleFilterData}
                                    className={`w-100`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 position-relative" style={{backgroundColor:'#9B7A41'}}>
                        <div className="col-lg-6" style={{backgroundColor:'#323231'}}>
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
                    <div className="row mt-5">
                        <div className="col-lg-4">
                        <div className="MainPizzaBox position-relative d-flex">
                            <div className="PizzaImg">
                                <img src={pizzaImg} alt='img'/>
                            </div>
                            <div className="pizzadetails">
                                <h1 className='title'>Blazing Onion & Paprika</h1>
                                <p className='descripnation'>Hot & spicy pizza with onion & red
                                paprika toppings and a new spicy peri..</p>
                                <div className="price">
                                <p className='title'>₹ 299</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <button className='add-show'>add</button>
                                <button className='show-details'>show</button>
                            </div>
                            </div>
                            
                        </div>
                        </div>
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PizzaArea
