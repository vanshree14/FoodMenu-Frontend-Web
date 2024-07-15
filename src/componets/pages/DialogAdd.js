import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../redux/slice/DialogueSlice";
import Input, { Select, Textarea } from "../extra/Input";
import Title from '../extra/Title'

const DialogAdd = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  return (
    <div className="dialog">
      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-8 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-start">
                <div className="col-6">
                  {dialogueData ? (
                    <h3 className="text-dark m20-bottom">Edit Address</h3>
                  ) : (
                    <h3 className="text-dark m20-bottom">Add Address</h3>
                  )}
                </div>
                <div className="col-4">
                  <div
                    className="closeButton text-dark bg-transparent fw-600 fs-25 "
                    onClick={() => {
                      dispatch(closeDialog());
                    }}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              </div>
              <form id="addressForm">
                <div className="row formBody">
                  <Title name={`Choose Any One`} className={`m-0`} />
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Cheese Volcano</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">9 Cheesy</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Dual Cheese Burst</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
                <div className="row formBody">
                  <Title name={`Veg Topping`} className={`m-0`} />
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Onion</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Capsicum</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Paneer</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Olives</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Jalapenos</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Red Paprika</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Pineapple</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Sweet Corns</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Mushroom</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Fresh Tomatoes</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Baby Corns</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Broccoli</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
                <div className="row formBody">
                  <Title name={`Cheese & Dips`} className={`m-0`} />
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Extra Cheese</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Cheese Dip</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Jalapenos Dip</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Hot & Garlic Dip</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Peri Peri Dip</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Korma Dip</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Pesto & Basil Dip</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <label htmlFor="">Mexican Salsa Dip</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
                <div className="row m20-top formFooter">
                  <div className="col-12 text-end m0">
                    <button
                      className={`cancle_btn`}
                      type={`button`}
                      onClick={() => dispatch(closeDialog())}
                    >
                      Cancle
                    </button>
                    <button
                      type={`submit`}
                      className={`submit_btn ms-3`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogAdd;
