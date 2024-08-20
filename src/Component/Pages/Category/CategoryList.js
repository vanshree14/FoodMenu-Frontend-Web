import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Searching from '../../Extra/Searching';
import { baseURL } from '../../Utils/Config';
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import logobar from '../../../Asstes/Images/loginLogo.png';
import { categoryGet, productsByCategoryGet } from '../../Redux/Slice/CategorySlice'


const CategoryList = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.category);

    const [page, setPage] = useState(0);
    const [rowPerPage, setRowperPage] = useState(10);
    const [search, setSearch] = useState("");

    const { categoryId } = location.state || {};

    const payload = {
        page,
        limit: rowPerPage,
        search
    };

    useEffect(() => {
        dispatch(categoryGet({ ...payload, command: false }));
    }, [page, rowPerPage, search]);

    useEffect(() => {
        if (categoryId) {
            dispatch(productsByCategoryGet({ page: 0, limit: 10, categoryId }));
        }
    }, [categoryId, dispatch]);


    useEffect(() => {
        setData(category);
    }, [category]);

    const handleSearch = (query) => {
        setSearch(query);
    };

    const handleClick = () => {
        navigate("/booking/tables");
    };

    const handleNavClick = (categoryId, categoryName) => {
        navigate(`/categories/${categoryName}`, { state: { categoryId } });
    };


    return (
        <div>
            <div className="MainCategory custombackgroud" style={{ backgroundImage: `url(${BannerbackgroundImg})`, height: '100vh' }}>
                <div className="container">
                    <div className="row d-flex align-items-center mt-5 position-relative">
                        {/* Category Name */}
                        <div className="col-xl-6  d-flex align-items-center col-md-6 order-lg-1 order-3 mb-lg-0 col-sm-6 col-smm-6 justify-content-md-center justify-content-lg-start mt-lg-2">
                           
                                <div className="categoryHeader">
                                    <p className="text-light">select category</p> {/* Display category name */}
                                </div>
                            
                        </div>

                        {/* Logo Bar */}
                        <div className="col-xl-6 col-md-12 order-xl-2  mb-lg-3 mb-md-3 d-flex justify-content-xl-end justify-content-md-center justify-content-sm-center justify-content-center">
                            <div className="logobar text-center">
                                <img src={logobar} alt="logo" className="img" />
                            </div>
                        </div>

                        {/* Return Icon */}
                        <div className="col-xl-6 col-md-6 col-smm-6 order-lg-3 order-2 col-sm-6 mb-3 mb-lg-0 d-flex align-items-center mt-lg-2 justify-content-md-center justify-content-xl-start justify-content-center">
                            <div className="retrun-icon text-light position-relative" onClick={handleClick}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="col-xl-6 col-md-12 order-xl-4  mt-4 d-flex   justify-content-xl-end justify-content-md-center justify-content-center">
                            <div className="search-Bar">
                                <Searching
                                    type="server"
                                    data={data}
                                    setData={setData}
                                    serverSearching={handleSearch}
                                    className="w-100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex align-items-center position-relative">
                        {data?.map((items, index) => {
                            const imagePath = items?.image.replace(/\\/g, "/");
                            const fullImageUrl = baseURL + imagePath;
                            return (
                                <div className=" col mb-4" key={index}>
                                    <div className="CategoryBox">
                                        <div className="CategoryDetails">
                                            <div className="CategoryImg d-flex justify-content-center">
                                                <img
                                                    src={fullImageUrl}
                                                    alt={items?.name}
                                                    className="featuredImg2"
                                                    onClick={() => handleNavClick(items._id, items?.name.toLowerCase())}
                                                />
                                            </div>
                                            <p className='text-light d-flex justify-content-center pt-3'>{items?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
