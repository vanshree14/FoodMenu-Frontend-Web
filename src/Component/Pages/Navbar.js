import React from 'react'
import Logo from '../../Asstes/Images/Caffeine-Haven-logo.svg'

const Navbar = () => {
    return (
        <div className='navbarMain'>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="logo">
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center m-0">
                        <div className="search">
                            <i className='fa fa-search'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar