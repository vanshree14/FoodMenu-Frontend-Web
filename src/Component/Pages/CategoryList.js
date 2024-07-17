import React, { useState } from 'react'
import Navbar from './Navbar'
// import Burger from '../../asstes/Images/burger.jpg'
// import Pizza from '../../asstes/Images/pizaa.jpg'
// import AngaraPunjabBurger from '../../Asstes/Images/Angara-Punjab-Burger.jpg'
// import BatataHarraBurger from '../../Asstes/Images/Batata-Harra-Burger.jpg'
// import BhunaMediterraneanBurger from '../../Asstes/Images/Bhuna-Mediterranean-Burger.jpg'
// import SpinachCornBomberBurger from '../../Asstes/Images/Spinach-Corn-Bomber-Burger.jpg'
import MargheritaPizza from '../../Asstes/Images/MargheritaPizza.png'
import OnionsPizza from '../../Asstes/Images/OnionsPizza.png'
import FarmVilla from '../../Asstes/Images/farmVilla.png'
import GardenSpecial from '../../Asstes/Images/gardenSpecial.png'
import Chezzy7Pizza from '../../Asstes/Images/chezzy7Pizza.png'
import Paneer65 from '../../Asstes/Images/paneer65.png'
import { Button, Modal } from 'react-bootstrap'
import DialogAdd from './DialogAdd'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from '../Redux/Slice/DialogueSlice'
import { useNavigate } from 'react-router-dom'

const CategoryList = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout =  () => {
        navigate("/admin");
    };
    return (
        <div>
            <Navbar />

            <div className='categoryMain'>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-8 d-flex justify-content-between align-items-center">
                            <div className='Menutitle'>
                                <h1>Burger</h1>
                            </div>
                            <input type="submit" value="Back" className="btn solid" onClick={handleLogout} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 MenuCategory">
                            <div className='row'>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <div className="cardMain d-flex">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
                                            <div className="card-header">
                                                <div className="categoryImage">
                                                    <img src={MargheritaPizza} alt="" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button className='AddBtn' variant="primary" onClick={() => dispatch(openDialog({ type: "category" }))}>
                                                    + Add
                                                </button>
                                            </div>
                                            {dialogue && dialogueType === "category" && (
                                                <DialogAdd />
                                            )}
                                        </div>
                                        <div className="col-8 ps-0 py-2">
                                            <div className="card-body">
                                                <div className="veg">
                                                    <div className="veg-nonveg"></div>
                                                </div>
                                                <div className='card-title'>Margherita Pizza</div>
                                                <div className="price">₹145</div>
                                                <div className="cardMenuTitle">A classic cheesy Margherita. Cant go wrong. [Fat-14.3 per 100 g, Protein-12.6 per 100 g, Carbohydrate-39.2 per 100 g, Sugar-0 per 100 g, Calories-336 k.cal]Nutritional information per 100g</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <div className="cardMain d-flex">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
                                            <div className="card-header ">
                                                <div className="categoryImage">
                                                    <img src={OnionsPizza} alt="" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button className='AddBtn' variant="primary" onClick={handleShow}>
                                                    + Add
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-8 ps-0 py-2">
                                            <div className="card-body">
                                                <div className="veg">
                                                    <div className="veg-nonveg"></div>
                                                </div>
                                                <div className='card-title'>Onions Pizza</div>
                                                <div className="price">₹79</div>
                                                <div className="cardMenuTitle">Onions on a cheesy base with in house sauce. [Fat-7 per 100 g, Protein-12.2 per 100 g, Carbohydrate-50.8 per 100 g, Sugar-7 per 100 g, Calories-315 k.cal]Nutritional information per 100g</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <div className="cardMain d-flex">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
                                            <div className="card-header ">
                                                <div className="categoryImage">
                                                    <img src={FarmVilla} alt="" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button className='AddBtn' variant="primary" onClick={handleShow}>
                                                    + Add
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-8 ps-0 py-2">
                                            <div className="card-body">
                                                <div className="veg">
                                                    <div className="veg-nonveg"></div>
                                                </div>
                                                <div className='card-title'>Farm Villa</div>
                                                <div className="price">₹449</div>
                                                <div className="cardMenuTitle">The freshness of capsicum, tomatoes, with the flavour of paneer and red paprika topped with a Cheese dip. [Fat-10.9 per 100 g, Protein-12.7 per 100 g, Carbohydrate-34.9 per 100 g, Sugar-0 per 100 g, Calories-288.9 k.cal]Nutritional information per 100g.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <div className="cardMain d-flex">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
                                            <div className="card-header ">
                                                <div className="categoryImage">
                                                    <img src={GardenSpecial} alt="" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button className='AddBtn' variant="primary" onClick={handleShow}>
                                                    + Add
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-8 ps-0 py-2">
                                            <div className="card-body">
                                                <div className="veg">
                                                    <div className="nonveg"></div>
                                                </div>
                                                <div className='card-title'>Garden Special</div>
                                                <div className="price">₹449</div>
                                                <div className="cardMenuTitle">A close cousin of the gardne delight. Capsicum,Mushrooms,Onion, and Fresh Tomatoes. [Fat-18.8 per 100 g, Protein-10.8 per 100 g, Carbohydrate-16.4 per 100 g, Sugar-0 per 100 g, Calories-277.6 k.call]Nutritional information per 100g</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <div className="cardMain d-flex">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
                                            <div className="card-header ">
                                                <div className="categoryImage">
                                                    <img src={Chezzy7Pizza} alt="" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button className='AddBtn' variant="primary" onClick={handleShow}>
                                                    + Add
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-8 ps-0 py-2">
                                            <div className="card-body">
                                                <div className="veg">
                                                    <div className="veg-nonveg"></div>
                                                </div>
                                                <div className='card-title'>Cheezy-7 Pizza</div>
                                                <div className="price">₹499</div>
                                                <div className="cardMenuTitle">An Exotic Combination Of White Mozarella, Cream, White Cheese, Monterey Jack, Cream Orange, Colby And Orange Cheddar Cheese</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <div className="cardMain d-flex">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
                                            <div className="card-header ">
                                                <div className="categoryImage">
                                                    <img src={Paneer65} alt="" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button className='AddBtn' variant="primary" onClick={handleShow}>
                                                    + Add
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-8 ps-0 py-2">
                                            <div className="card-body">
                                                <div className="veg">
                                                    <div className="veg-nonveg"></div>
                                                </div>
                                                <div className='card-title'>Paneer 65</div>
                                                <div className="price">₹255</div>
                                                <div className="cardMenuTitle">A Combination Of Onion, Capsicum, Red Paprika, Paneer 65 With Extra Cheese</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {dialogue && dialogueType === "category" && (
                    <DialogAdd />
                )} */}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        I will not close if you click outside me. Do not even try to press
                        escape key.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default CategoryList




//     < div className = 'row' >
// <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
//     <div className="cardMain d-flex">
//         <div className="col-8 ps-3 py-2">
//             <div className="card-body">
//                 <div className='card-title'>Burger</div>
//                 <div className="price">₹286</div>
//                 <div className="cardMenuTitle">saf</div>
//             </div>
//         </div>
//         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
//             <div className="card-header">
//                 <div className="categoryImage">
//                     <img src={Burger} alt="" />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

// <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
//     <div className="cardMain d-flex">
//         <div className="col-8 ps-3 py-2">
//             <div className="card-body">
//                 <div className='card-title'>Cheezy-7 Pizza</div>
//                 <div className="price">₹286</div>
//                 <div className="cardMenuTitle">An Exotic Combination of White Mozzarilla, Cream White Cheese, Cheddar, Monterey Jack, Cream Orange Cheese, Colby, Orange Cheddar. [Fat-12.4, Protein-10.3, Carbohydrate-32.2, Sugar-2.1, Calories-281.8]</div>
//             </div>
//         </div>
//         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
//             <div className="card-header ">
//                 <div className="categoryImage">
//                     <img src={Pizza} alt="" />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
//     <div className="cardMain d-flex">
//         <div className="col-8 ps-3 py-2">
//             <div className="card-body">
//                 <div className='card-title'>Angara Punjab Burger</div>
//                 <div className="price">₹108</div>
//                 <div className="cardMenuTitle">Rajasthani angara spices meet punjabi flavors topped with our magic mayonnaise and premium veggies.</div>
//             </div>
//         </div>
//         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
//             <div className="card-header ">
//                 <div className="categoryImage">
//                     <img src={AngaraPunjabBurger} alt="" />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
//     <div className="cardMain d-flex">
//         <div className="col-8 ps-3 py-2">
//             <div className="card-body">
//                 <div className='card-title'>Batata Harra Burger</div>
//                 <div className="price">₹68</div>
//                 <div className="cardMenuTitle">Fusion burger made from Lebanese and South Indian spices perfected to Indian palate topped with our premium mayonnaise and premium veggies.</div>
//             </div>
//         </div>
//         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
//             <div className="card-header ">
//                 <div className="categoryImage">
//                     <img src={BatataHarraBurger} alt="" />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
//     <div className="cardMain d-flex">
//         <div className="col-8 ps-3 py-2">
//             <div className="card-body">
//                 <div className='card-title'>Bhuna Mediterranean Burger </div>
//                 <div className="price">₹83</div>
//                 <div className="cardMenuTitle">Patty made from Coastal Mediterranean European flavors with roasted notes of garlic topped with our cocktail mayonnaise and premium veggies.</div>
//             </div>
//         </div>
//         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
//             <div className="card-header ">
//                 <div className="categoryImage">
//                     <img src={BhunaMediterraneanBurger} alt="" />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
//     <div className="cardMain d-flex">
//         <div className="col-8 ps-3 py-2">
//             <div className="card-body">
//                 <div className='card-title'>Spinach Corn Bomber Burger </div>
//                 <div className="price">₹270</div>
//                 <div className="cardMenuTitle">Refreshing patty made from spinach, corns, potato & cheese topped with our dual dip pesto-basil , premium mayonnaise and premium veggies.</div>
//             </div>
//         </div>
//         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-xl-3 p-lg-3 p-md-3 p-sm-3 p-0 m-0">
//             <div className="card-header ">
//                 <div className="categoryImage">
//                     <img src={SpinachCornBomberBurger} alt="" />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div >