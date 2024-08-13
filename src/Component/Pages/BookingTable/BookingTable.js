import React, { useEffect, useState } from 'react';
import logobar from '../../../Asstes/Images/loginLogo.png';
import { useNavigate } from 'react-router-dom';

import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import { useDispatch, useSelector } from 'react-redux';
import { bookingGet } from '../../Redux/Slice/BookingSlice';

const BookingTable = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const { table,totalCount } = useSelector((state) => state.table)


    const [page, setPage] = useState(0)
    const [rowPerPage, setRowperPage] = useState(10)
    const [search, setSearch] = useState("")


    const payload = {
        page,
        limit: rowPerPage,
        search
    }
    // Server Get
    useEffect(() => {
        dispatch(bookingGet({ ...payload, command: false }))
    }, [page, rowPerPage, search]);
    
    useEffect(() => {
        dispatch(bookingGet({ ...payload, command: true }))
    }, []);

    useEffect(() => {
        setData(table)
    }, [table]);


    return (
        <div>
            <div className='TableSection custombackgroud' style={{ backgroundImage: `url(${BannerbackgroundImg})`, height: '100vh' }}>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center mt-5 position-relative">
                        <div className="col-lg-7 col-md-12 order-2 order-lg-1 mb-3 mb-lg-0">
                            <div className="tableHeader">
                                <p className="text-light">Select Tables</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 order-1 order-lg-2 d-flex justify-content-center align-items-center">
                            <div className="logobar text-center">
                                <img src={logobar} alt="logo" className="img-fluid" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 position-relative d-flex justify-content-center">
                        {
                        data?.map((items, index) => (
                            <div key={index} className="col d-flex justify-content-between align-items-center text-light">
                                <div className="tableBox" onClick={() => navigate('/categories')}>
                                    <button className="table-login mb-3">Table {items?.tableNo}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingTable;




























