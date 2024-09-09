import React from 'react'
import logobar from '../../../Asstes/Images/loginLogo.png';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/booking/categories/:categoryName");
    };
    return (
        <div>
            <div className="OrderDetails">
                <div className="container">
                    <div className="row d-flex align-items-center mt-5 position-relative">
                        <div className="col-sm-6 col-smm-6 col-md-6 order-md-1 order-sm-1 order-xl-0 d-flex justify-content-xl-start justify-content-md-end justify-content-sm-end justify-content-center align-items-center mt-lg-2 order-1 col-xsm-6 col-xs-6">
                            <h1 className='position-relative text-light'>My Order</h1>
                        </div>
                        <div className="col-xl-6 col-md-12 col-sm-12 col-smm-12 d-flex justify-content-xl-end order-xl-0 justify-content-md-center justify-content-sm-center align-items-center justify-content-center">
                            <div className="logobar">
                                <img src={logobar} alt="logo" className="img" />
                            </div>
                        </div>
                        <div className="col-smm-6 col-md-6 col-sm-6 col-xsm-6 col-xs-6 mt-4 d-flex align-items-center mt-lg-2">
                            <div className="retrun-icon text-light position-relative" onClick={handleClick}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row g-4">
                        <div class="col-lg-8 col-sm-12 col-xs-12 ">
                            <div class="card p-4 width-725">
                                <h4>Your Order Details</h4>
                                <div class="order-item">
                                    <h5>Farmhouse</h5>
                                    <p>* No Onion - Free + Extra Cheese Slice - 20₹ + Extra Cheese Burst - 89₹</p>
                                    <p><strong>₹ 459 x 2</strong></p>
                                    <p class="text-end"><strong>₹ 918</strong></p>
                                </div>
                                <hr />
                                <div class="order-item">
                                    <h5>Cheese Volcano Paneer</h5>
                                    <p>₹ 299 x 1</p>
                                    <p class="text-end"><strong>₹ 299</strong></p>
                                </div>
                                <hr />
                                <div class="totals">
                                    <p>Sub Total <span class="float-end">1298₹</span></p>
                                    <p>Total Tax <span class="float-end">14₹</span></p>
                                    <p><strong>Grand Total <span class="float-end">1312₹</span></strong></p>
                                </div>
                                <hr />
                                <div class="order-meta">
                                    <p>Order ID: <span>#2865265</span></p>
                                    <p>Payment ID: <span>upi (pay_OSUDKS7IDWnh)</span></p>
                                    <p>Date and Time: <span>29th Jun 2024 & 12:24 PM</span></p>
                                    <p>Payment Mode: <span>razorpay</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-sm-12">
                            <div class="card p-4 width-635">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="logo">FOOD LOGO</div>
                                    <div class="contact">
                                        <a href="tel:+911234567890">
                                            <i class="bi bi-telephone"></i>
                                        </a>
                                    </div>
                                </div>
                                <hr />
                                <div class="order-status">
                                    <div class="status-item">
                                        <i class="bi bi-check-circle-fill text-success"></i> Received
                                    </div>
                                    <div class="status-item">
                                        <i class="bi bi-check-circle-fill text-success"></i> Accepted
                                    </div>
                                    <div class="status-item">
                                        <i class="bi bi-exclamation-circle-fill text-warning"></i> Prepared
                                    </div>
                                    <div class="status-item">
                                        <i class="bi bi-exclamation-circle-fill text-warning"></i> Delivered
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
