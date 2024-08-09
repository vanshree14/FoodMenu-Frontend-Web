import React, { useEffect, useState } from 'react'
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import logobar from '../../../Asstes/Images/loginLogo.png'
import Searching from '../../Extra/Searching';
import pizza from '../../../Asstes/Images/pizzaimg.png'
import fries from '../../../Asstes/Images/friesimg.png'
import sadvich from '../../../Asstes/Images/sandvichimg.png'
import burger from '../../../Asstes/Images/burgerimg.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryGet } from '../../Redux/Slice/CategorySlice';
import { BaseURL } from '../../Utils/Config';



const CategoryList = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { category } = useSelector((state) => state.category)


    const [page, setPage] = useState(0)
    const [rowPerPage, setRowperPage] = useState(10)
    const [search, setSearch] = useState("")


    const payload = {
        page,
        limit: rowPerPage,
        search
    }
    useEffect(() => {
        dispatch(categoryGet({ ...payload, command: false }))
    }, [page, rowPerPage, search])

    useEffect(() => {
        dispatch(categoryGet({ ...payload, command: true }))
    }, [])

    useEffect(() => {
        setData(category)
    }, [category]);

    // Search BOTH
    // const handleFilterData = (filteredData) => {
    //     if (typeof filteredData === "string") {
    //         setSearch(filteredData);
    //     } else {
    //         setData(filteredData);
    //     }
    // };
    const handleclick = () => {
        navigate("/table")
    }


    return (
        <div>
            <div className="MainCategory   custombackgroud" style={{ backgroundImage: `url(${BannerbackgroundImg})` }}>
                <div className="container">
                    <div className="row d-flex align-items-center mt-5 position-relative">
                        <div className="col-lg-7 col-md-12 order-2 order-lg-1  mb-3 mb-lg-0">
                            <div className="categoryHeader">
                                <p className="text-light">Select Category</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 order-1 ">
                            <div className="logobar text-center">
                                <img src={logobar} alt="logo" className="img" />
                            </div>
                        </div>
                        <div className=" mt-4  col-lg-9 col-md-12 order-2 order-lg-1  mb-3 mb-lg-0">
                            <div className="retrun-icon text-light position-relative " onClick={handleclick}>
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 order-1 mt-4 ">
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
                    {/* <div className="row row d-flex align-items-center mt-5 position-relative">
                        {
                            data?.map((items,index) => {
                                 
                                    
                                        <div className="col-lg-2" key={index}>
                                            <div className="CategoryBox">
                                                <div className="CategoryDetails">
                                                    <div className="CategoryImg  d-flex justify-content-center">
                                                    <img src={items?.image ? BaseURL + items?.image : items?.image} alt="img" className='height-40' />
                                                    </div>
                                                    <p className='text-light d-flex justify-content-center pt-2'>{items?.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    
                                
                            })
                        }
                    </div> */}

                    
                    <div className="row d-flex align-items-center mt-5 position-relative">
                        <div className="col-lg-3 col-smm-6 col-6 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
                            <div className="CategoryBox">
                                <div className="CategoryDetails">
                                    <div className="CategoryImg d-flex justify-content-center">
                                        <img src={pizza} alt="img" />
                                    </div>
                                    <p className="text-light d-flex justify-content-center pt-2">pizza</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-smm-6 col-6 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
                            <div className="CategoryBox">
                                <div className="CategoryDetails">
                                    <div className="CategoryImg d-flex justify-content-center">
                                        <img src={burger} alt="img" />
                                    </div>
                                    <p className="text-light d-flex justify-content-center pt-2">burger</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-smm-6 col-6 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
                            <div className="CategoryBox">
                                <div className="CategoryDetails">
                                    <div className="CategoryImg d-flex justify-content-center">
                                        <img src={sadvich} alt="img" />
                                    </div>
                                    <p className="text-light d-flex justify-content-center pt-2">sandvich</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-smm-6 col-6 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
                            <div className="CategoryBox">
                                <div className="CategoryDetails">
                                    <div className="CategoryImg d-flex justify-content-center">
                                        <img src={pizza} alt="img" />
                                    </div>
                                    <p className="text-light d-flex justify-content-center pt-2">pizza</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-smm-6 col-6 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
                            <div className="CategoryBox">
                                <div className="CategoryDetails">
                                    <div className="CategoryImg d-flex justify-content-center">
                                        <img src={fries} alt="img" />
                                    </div>
                                    <p className="text-light d-flex justify-content-center pt-2">fries</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-smm-6 col-6 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
                            <div className="CategoryBox">
                                <div className="CategoryDetails">
                                    <div className="CategoryImg d-flex justify-content-center">
                                        <img src={pizza} alt="img" />
                                    </div>
                                    <p className="text-light d-flex justify-content-center pt-2">pizza</p>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default CategoryList
