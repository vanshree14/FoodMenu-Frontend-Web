import React from 'react'
import BannerbackgroundImg from '../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import logobar from '../../Asstes/Images/loginLogo.png'



const CategoryList = () => {
    return (
        <div>
            <div className="MainCategory mainLoginPage" style={{ backgroundImage: `url(${BannerbackgroundImg})` }}>
                <div className="container">
                <div className="row d-flex justify-content-center mt-5 position-relative">
                        <div className="col-lg-7 col-md-12 order-2 order-lg-1  mb-3 mb-lg-0">
                            <div className="tableHeader">
                                <p className="text-light">Select Category</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 order-1 order-lg-2">
                            <div className="logobar text-center">
                                <img src={logobar} alt="logo" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12 order-2 order-lg-1  mb-3 mb-lg-0">ddd</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryList
