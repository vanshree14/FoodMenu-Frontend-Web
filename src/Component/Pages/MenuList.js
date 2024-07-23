import React from 'react'
import Burger from '../../Asstes/Images/burger.jpg'
import Pizza from '../../Asstes/Images/pizaa.jpg'
import BlueberryMocktails from '../../Asstes/Images/blueberry-mojito-mocktail.jpg'
import SoupMonchow from '../../Asstes/Images/Vegetable_Manchow_Soup.jpg'
import KajuKatali from '../../Asstes/Images/KajuKatli.jpg'
import FrenchFries from '../../Asstes/Images/french-fries.jpg'
import VadaPaw from '../../Asstes/Images/vada-pav.jpg'
import Dabeli from '../../Asstes/Images/dabeli.jpg'
import Khawsa from '../../Asstes/Images/khawsa.jpg'
import Khaman from '../../Asstes/Images/khaman.jpg'
import Cake from '../../Asstes/Images/cake.jpeg'
import Sandwich from '../../Asstes/Images/sandwich.jpg'
import { useNavigate } from 'react-router-dom'

const MenuList = () => {
    const navigate = useNavigate()

    const handleLogout =  () => {
        navigate("/signup");
    };

    return (
        <div className='menulistsection'>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 d-flex justify-content-between align-items-center">
                        <div className='Menutitle'>
                            <h1>Your Comfort Food</h1>
                        </div>
                        <input type="submit" value="Log Out" className="btn solid" onClick={handleLogout} />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                        <div className='MenuCategory row'>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header">
                                        <div className="categoryImage" onClick={() => navigate('/burger')}>
                                            <img src={Burger} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Burger</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage" onClick={() => navigate('/pizza')}>
                                            <img src={Pizza} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Pizza</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={BlueberryMocktails} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Mocktail</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={SoupMonchow} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Soup</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={KajuKatali} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Kaju Katali</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={FrenchFries} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>French-Fries</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={Khaman} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Khaman</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={Khawsa} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Khawsa</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={Dabeli} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Dabeli</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={VadaPaw} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>VadaPaw</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={Cake} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Cake</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="cardMain">
                                    <div className="card-header ">
                                        <div className="categoryImage">
                                            <img src={Sandwich} alt="" />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='card-title'>Sandwich</div>
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

export default MenuList



//     < div className = "col-xl-8 col-lg-8 col-md-13 col-sm-12 col-12" >
//         <div className='MenuCategory row'>
//             <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header">
//                         <div className="categoryImage">
//                             <img src={Burger} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Burger</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={Pizza} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Pizza</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={BlueberryMocktails} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Mocktail</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={SoupMonchow} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Soup</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={KajuKatali} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Kaju Katali</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={FrenchFries} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>French-Fries</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={Khaman} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Khaman</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={Khawsa} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Khawsa</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={Dabeli} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Dabeli</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={VadaPaw} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>VadaPaw</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={Cake} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Cake</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
//                 <div className="cardMain">
//                     <div className="card-header ">
//                         <div className="categoryImage">
//                             <img src={Sandwich} alt="" />
//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <div className='card-title'>Sandwich</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
// </div >