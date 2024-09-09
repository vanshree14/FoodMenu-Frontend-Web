import React from 'react'
import logobar from '../../../Asstes/Images/loginLogo.png';
import { useNavigate } from 'react-router-dom';


const Orders = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/booking/categories/:categoryName");
  };
  const handleorderClick = () => {
    navigate("/orderdetails")
  }

  return (
    <div>
      <div className="OrderSection">
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
            <div class="col-12 col-sm-6 col-lg-4">
              <div class="card mt-5">
                <div class="card-header mb-2 d-flex justify-content-between align-items-center">
                 <div className="order-code d-flex justify-content-center align-items-center">
                 <div class="logo">FOOD<br /> LOGO</div>
                 <div class="order-id">#2865265</div>

                 </div>
                <div className="delivered-order d-flex align-items-center">
                <div className="checked pe-1">
                <i class="fa-solid fa-check"></i>
                </div>
                <div class="status delivered">DELIVERED</div>
                </div>
                </div>
                <div class="card-body mb-2 text-center d-flex justify-content-between">
                  <p>06-Jul-24 12:23:58 PM</p>
                  <p className='price'>&#8377; 1312.3</p>
                </div>
                <div class="view text-center" onClick={handleorderClick}>
                  <div class="orderview">VIEW ORDER</div>
                </div>
              </div>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
