import React from 'react'
import logobar from '../../../Asstes/Images/loginLogo.png'
import { useNavigate } from 'react-router-dom';

import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';

const BookingTable = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='TableSection custombackgroud' style={{ backgroundImage: `url(${BannerbackgroundImg})` }}>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center  mt-5 position-relative">
                        <div className="col-lg-7 col-md-12 order-2 order-lg-1  mb-3 mb-lg-0 ">
                            <div className="tableHeader">
                                <p className="text-light">Select Table</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 order-1 order-lg-2 d-flex justify-content-center align-items-center">
                            <div className="logobar text-center">
                                <img src={logobar} alt="logo" className="img-fluid" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 position-relative d-flex justify-content-center">
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox" onClick={() => navigate('/categories')}>
                                <button className="table-login mb-3">table 1</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 2</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 3</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 1</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 2</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 3</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 1</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 2</button>
                            </div>
                        </div>
                        <div className=" col d-flex justify-content-between align-items-center text-light">
                            <div className="tableBox">
                                <button className="table-login mb-3">table 3</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookingTable
