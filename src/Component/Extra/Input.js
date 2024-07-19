// import React, { useEffect, useState } from "react";
// import $ from "jquery";
// import Button from "./Button";
// const Input = (props) => {
//   const [imagePath, setImagePath] = useState("");
//   const handleImage = (e) => {
//     if (e.target.files.length > 0) {
//       setImagePath(URL?.createObjectURL(e.target.files[0]));
//     } else {
//       setImagePath("");
//     }
//   };

//   const {
//     id,
//     className,
//     type,
//     name,
//     label,
//     placeholder,
//     value,
//     disabled,
//     readOnly,
//     min,
//     max,
//     activeIcon,
//     activClick,
//     labelClass,
//     errorMessage,
//     autoComplete,
//     defaultValue,
//     validation,
//     validationError,
//     ignore
//   } = props;

//   const [types, setTypes] = useState(type);

//   const hideShow = () => {
//     types === "password" ? setTypes("text") : setTypes("password");
//   };
//   const [error, setError] = useState("opacity-0");
//   const checkForm = (e) => {
//     if (types === "file" || types === "files") {
//       handleImage(e);
//     }

//     if (e.target.value == "") {
//       setError("opacity-1");
//     } else {
//       setError("opacity-0");
//     }
//   };

//   return (

//     <div
//       className={`inputData ${types}  flex-row justify-content-start text-start`}
//     >
//         {label && (
//           <label
//             htmlFor={id}
//             className={`${(types === "radio" || types === "checkbox") && "ms-2 order-1"
//               } ${labelClass}`}
//           >
//             {label}
//           </label>
//         )}
//         <input
//           type={types}
//           name={name}
//           className={className}
//           id={id}
//           onChange={(e) => checkForm(e)}
//           placeholder={placeholder}
//           value={value}
//           onWheel={(e) => type === "number" && e.target.blur()}
//           disabled={disabled}
//           readOnly={readOnly}
//           minLength={min}
//           maxLength={max}
//           autoComplete={autoComplete}
//           defaultValue={defaultValue}
//           data-validation={validation}
//           data-ignore={ignore}
//           title={validationError}
//         />
//         {/* Show Image */}
//         <img
//           src={imagePath != "" ? imagePath : null}
//           alt="hostImage"
//           draggable="false"
//           className={`${(!imagePath || imagePath == "") && "d-none"}`}
//           width={"70px"}
//           height={"70px"}
//           data-image={name}
//           data-class={`showImage`}
//           id={`file-${name}`}
//         />
//         {/* error */}
//         {type !== "search" && (
//           <p className={`errorMessage text-start ${error}`} id={`error-${name}`}>{errorMessage}</p>
//         )}
//         {/* Password hide show */}
//         {type === "password" && (
//           <div className="passHideShow" onClick={hideShow}>
//             {types === "password" ? (
//               <i class="ri-eye-line"></i>
//             ) : (
//               <i class="ri-eye-close-line"></i>
//             )}
//           </div>
//         )}
//         {/* Search Icon */}
//         {type === "search" && !value && (
//           <div className="searching">
//             <i className="ri-search-line"></i>
//           </div>
//         )}
//         {activeIcon && (
//           <div className="activeIcon" onClick={activClick}>
//             <i className={activeIcon}></i>
//           </div>
//         )}
//     </div>
//   );
// };

// export default Input;

// export const Image = (props) => {
//   const { value, name, className, id, label, errorMessage, multiple } = props;
//   const [imagePath, setImagePath] = useState("");
//   const [error, setError] = useState("opacity-0");
//   const [changeValue, setChangeValue] = useState(false);
//   // console.log("multiImagepath", multiImagePath);
//   const [multiImagePath, setMultiImagePath] = useState([]);

//   const handleImage = (e, multi) => {
//     if (e.target.files.length > 0) {
//       if (multi == "multi") {
//         // New Path
//         const newImagePaths = [];
//         for (let i = 0; i < e.target.files.length; i++) {
//           newImagePaths.push(URL.createObjectURL(e.target.files[i]));
//         }
//         // Old Path
//         const addImage = document.getElementById(`${name}-multiImage`);
//         for (let i = 0; i < newImagePaths.length; i++) {
//           console.log("e.target.files[i]", e.target.files[i].name);

//           const imageTag = document.createElement("img");
//           const divTag = document.createElement("div");
//           const removeDiv = document.createElement("div");
//           imageTag.src = newImagePaths[i];
//           imageTag.setAttribute("data-class", "showImage");
//           imageTag.setAttribute("data-new", e.target.files[i].name);
//           divTag.appendChild(imageTag);
//           divTag.appendChild(removeDiv);
//           removeDiv.setAttribute("data-remove", "remove");
//           removeDiv.classList.add("ri-close-line");
//           divTag.setAttribute("data-index", "index");
//           addImage.appendChild(divTag);
//         }
//         const newImageFileValue = e.target.files;
//         const input = document.getElementById(id);

//         const dataTransfer = new DataTransfer();
//         for (let i = 0; i < multiImagePath.length; i++) {
//           dataTransfer.items.add(multiImagePath[i]);
//         }
//         for (let i = 0; i < newImageFileValue.length; i++) {
//           dataTransfer.items.add(newImageFileValue[i]);
//         }
//         input.files = dataTransfer.files;
//         setMultiImagePath(dataTransfer.files);

//       } else {
//         setImagePath(URL?.createObjectURL(e.target.files[0]));
//       }
//     } else {
//       if (multi === "multi") {
//         // Clear the multiImage section when no files selected
//         const addImage = document.getElementById(`${name}-multiImage`);
//         addImage.innerHTML = '';
//       } else {
//         setImagePath("");
//       }
//     }
//   };
//   const checkForm = (e, multi) => {
//     handleImage(e, multi);
//     setChangeValue(changeValue == true ? false : true);
//     if (e.target.value == "") {
//       setError("opacity-1");
//     } else {
//       setError("opacity-0");
//     }
//   };

//   return (
//     <div className="inputData text-start">
//       <ImageScript value={changeValue} setMultiImagePath={setMultiImagePath} />
//       {label && <label htmlFor={id}>{label}</label>}

//       {multiple ? (
//         <>
//           <div className="imageBoxMain">
//             <div className="boxImage">
//               <input
//                 type="file"
//                 value={value}
//                 name={name}
//                 className={className}
//                 id={id}
//                 multiple={true}
//                 onChange={(e) => checkForm(e, "multi")}
//               />
//             </div>
//             <div
//               id={`${name}-multiImage`}
//               className="d-flex flex-wrap multiImage"
//             ></div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="imageBoxMain">
//             <div className="boxImage">
//               <input
//                 type="file"
//                 value={value}
//                 name={name}
//                 className={`${className}`}
//                 id={id}
//                 onChange={(e) => checkForm(e)}
//               />
//             </div>
//             <img
//               src={imagePath != "" ? imagePath : null}
//               alt="hostImage"
//               draggable="false"
//               className={`boxImage ${(!imagePath || imagePath == "") && "d-none"}`}
//               width={"100px"}
//               height={"100px"}
//               data-image={name}
//               data-class={`showImage`}
//               id={`file-${name}`}
//             />
//           </div>

//         </>
//       )}

//       <p
//         className={`errorMessage text-start text-danger ${error}`}
//         id={`error-${name}`}
//       >
//         {errorMessage}
//       </p>
//     </div>
//   );
// };

// const ImageScript = ({ value, setMultiImagePath }) => {
//   useEffect(() => {
//     const removeImage = (e) => {
//       const current = e.target;
//       // console.log("$(current).parent().siblings()", $(current).children());

//       const mainImageTag = $(current).parent().parent().siblings(".boxImage").children()
//       const pathImage = $(current).siblings();
//       console.log("mainImageTag", mainImageTag[0].files);



//       if (mainImageTag[0]?.tagName === "INPUT") {
//         const datas = pathImage.attr("data-new");
//         if (datas) {
//           const imageFileValue = mainImageTag[0].files;
//           const newImageFileValue = Array.from(imageFileValue).filter(
//             (image) => image.name !== datas
//           );

//           const dataTransfer = new DataTransfer();
//           newImageFileValue.forEach((file) => dataTransfer.items.add(file));

//           mainImageTag[0].files = dataTransfer.files;
//           setMultiImagePath(dataTransfer.files)
//         }
//       }

//       $(current).parent().remove();
//     };

//     $(`[data-remove]`).on("click", removeImage);
//     return () => {
//       $(`[data-remove]`).off("click", removeImage);
//     };
//   }, [value]);

//   return null;
// };

// export const TextareaArray = (props) => {
//   const { id, label, row, placeholder, name, onSubmit, errorMessage, initialValues } = props;
//   const [error, setError] = useState("opacity-0");
//   const checkForm = (e) => {
//     if (e.target.value == "") {
//       setError("opacity-1");
//     } else {
//       setError("opacity-0");
//     }
//   };
//   const [inputValue, setInputValue] = useState("");
//   const [formData, setFormData] = useState(Array.isArray(initialValues) ? initialValues : []);
//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmitNew = () => {
//     if (inputValue.trim() !== "") {
//       const newFormData = [...formData, inputValue];
//       setFormData(newFormData);
//       setInputValue("");
//     } else {
//       setError("opacity-1");
//     }
//   };
//   const handleRemove = (index) => {
//     const newFormData = [...formData];
//     newFormData.splice(index, 1);
//     setFormData(newFormData);
//     if (onSubmit) {
//       onSubmit(newFormData);
//     }
//   };

//   // Lorem ipsum dolor sit amet consectetur adipiscing elit. Pellentesque vitae consequat turpis. Praesent sagittis tortor non aliquet aliquet nisi dolor pharetra velit ut placerat tortor enim sit amet lectus. Lorem ipsum dolor sit amet consectetur adipiscing elit. Mauris sapien erat finibus non neque ac molestie cursus ipsum. Cras turpis elit interdum vitae quam ac tempus placerat purus. Quisque eu sem sit amet neque lacinia porttitor. Curabitur viverra fringilla hendrerit. Praesent aliquam erat sit amet massa finibus sed consectetur arcu laoreet.
//   // Suspendisse interdum risus nisl vitae pulvinar leo euismod eu. Aenean in aliquam sapien eget tristique dolor. Praesent id interdum dolor. Duis gravida semper quam sed lacinia velit. Vivamus placerat eu arcu eget tempus. Quisque cursus purus rutrum tellus accumsan placerat. Donec faucibus nisi id aliquam laoreet. Integer porttitor ac nulla sit amet vulputate.
//   // Finibus non neque ac
//   // Mauris sapien erat finibus non neque ac molestie cursus ipsum. Cras turpis elit interdum vitae quam ac tempus placerat purus. Quisque eu sem sit amet neque lacinia porttitor. Curabitur viverra fringilla hendrerit. Praesent aliquam erat sit amet massa finibus sed consectetur arcu laoreet. Suspendisse interdum risus nisl vitae pulvinar leo euismod eu. Aenean in aliquam sapien eget tristique dolor. Praesent id interdum dolor. Duis gravida semper quam sed lacinia velit. Vivamus placerat eu arcu eget tempus.
//   // Praesent aliquam erat sit amet massa finibus sed consectetur arcu laoreet. Suspendisse interdum risus nisl vitae pulvinar leo euismod eu. Aenean in aliquam sapien eget tristique dolor. Praesent id interdum dolor. Duis gravida semper quam sed lacinia velit. Vivamus placerat eu arcu eget tempus. Quisque cursus purus rutrum tellus accumsan placerat.
//   // Tempus placerat Purus
//   // Mauris sapien erat finibus non neque ac molestie cursus ipsum. Cras turpis elit interdum vitae quam ac tempus placerat purus. Quisque eu sem sit amet neque lacinia porttitor. Curabitur viverra fringilla hendrerit. Praesent aliquam erat sit amet massa finibus sed consectetur arcu laoreet. Suspendisse interdum risus nisl vitae pulvinar leo euismod eu. Aenean in aliquam sapien eget tristique dolor. Praesent id interdum dolor. Duis gravida semper quam sed lacinia velit. Vivamus placerat eu arcu eget tempus.
//   return (
//     <div className="inputData text-start">
//       <label htmlFor={id}>{label}</label>
//       <textarea
//         value={inputValue}
//         name={`${name}s`}
//         onChange={handleInputChange}
//         data-ignore={true}
//         onClick={(e) => checkForm(e)}
//       ></textarea>
//       <Button type={`button`} text={`Add`} onClick={handleSubmitNew}
//         className={`bg-blueActiveBg rounded-2 text-light px-4 py-2`}
//       >
//         Add
//       </Button>
//       <div id={`error-${name}s`}></div>

//       {formData.length > 0 && (
//         <div className="textAreaMain">
//           {formData?.map((data, index) => (
//             <div key={index} className="textAreaField d-inline-block">
//               {data}
//               <button onClick={() => handleRemove(index)} >
//                 <i class="fa-solid fa-xmark"></i>
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <textarea
//         id={id}
//         rows={row}
//         placeholder={placeholder}
//         name={name}
//         value={formData}
//         onChange={(e) => checkForm(e)}
//         style={{ transform: "scaleX(0)", display: "none" }}
//       ></textarea>
//       <p className={`errorMessage text-start text-danger ${error}`} id={`error-${name}`}>
//         {errorMessage}
//       </p>
//     </div >
//   );
// };





// export const Textarea = (props) => {
//   const { id, label, row, placeholder, name, errorMessage } = props;
//   const [error, setError] = useState("");
//   const checkForm = (e) => {
//     if (e.target.value == "") {
//       setError("opacity-1");
//     } else {
//       setError("opacity-0");
//     }
//   };
//   return (
//     <div className="inputData text-start">
//       <label htmlFor={id}>{label}</label>
//       <textarea
//         id={id}
//         rows={row}
//         placeholder={placeholder}
//         name={name}
//         onChange={(e) => checkForm(e)}
//       ></textarea>
//       <p
//         className={`errorMessage text-start text-danger ${error}`}
//         id={`error-${name}`}
//       >
//         {errorMessage}
//       </p>
//     </div>
//   );
// };





// export const Select = (props) => {
//   const {
//     id,
//     label,
//     option,
//     onChange,
//     className,
//     btnClass,
//     defaultValue,
//     placeholder,
//     name,
//     errorMessage,
//     angle
//   } = props;
//   const [error, setError] = useState("opacity-0");
//   const [value, setValue] = useState(defaultValue);
//   const [key, setKey] = useState(defaultValue);

//   $(document).ready(function () {
//     const editId = $(`#${id}`)[0]?.value
//     if (editId && option) {
//       console.log("typeof-option", typeof option[0]);
//       console.log("option", option[0]);

//       if (typeof option[0] == "object") {
//         const matchingItem = option.find(item => item.value === editId);
//         if (matchingItem) {
//           setKey(matchingItem?.name)
//         }
//       } else {
//         setKey(editId)
//       }

//     }
//   })


//   console.log("value", value);
//   console.log("placeholder", placeholder);
//   console.log("name", name);
//   console.log("option", option);

//   return (
//     <div class={`inputData text-start ${className}`}>
//       <SelectScript value={value} id={`toggle-${id}`} angle={angle} />
//       <label htmlFor={id}>{label}</label>
//       <div className={`selectMain`}>
//         <button
//           className={`selectBox betBox m-auto-left ${btnClass}`}
//           type="button"
//           value={key}
//           id={`toggle-${id}`}
//         >
//           <p className={`m0 m10-right showSelectValue`}>
//             <p className={`${!key ? "text-gray" : "text-dark"
//               } d-flex align-items-center `}>
//               {label == "Color" &&
//                 <span className={`colorBall ${!key && "d-none"}`} style={{
//                   backgroundColor: key
//                 }}></span>}
//               <span>{key ? key : placeholder}</span>
//             </p>
//             <input
//               type="text"
//               placeholder={placeholder}
//               readOnly
//               name={name}
//               id={id}
//               className={`p0 m0 h-auto cursor-pointer d-none  ${value == placeholder ? "text-gray" : "text-dark"
//                 }`}
//               value={value}
//             />
//           </p>
//           <i
//             class={`ri-arrow-down-s-line ${value == placeholder ? "text-gray" : "text-dark"
//               }`}
//           ></i>
//         </button>
//         <p className={`errorMessage text-start  ${error}`} id={`error-${name}`}>
//           {errorMessage}
//         </p>
//         <ul className="dropMenu">
//           <li
//             className="text-gray text-center"
//             onClick={() => {
//               setValue("");
//               setKey("");
//               setError("opacity-1");
//             }}
//           >
//             -- {placeholder} --
//           </li>
//           {option?.map((res, i) => {
//             const isObject = typeof res
//             console.log("-----isObject", isObject)
//             return (
//               isObject == "object" ? (
//                 <li
//                   onClick={() => {
//                     setValue(res.value);
//                     setError("opacity-0");
//                     setKey(res.name);
//                     $(".dropMenu").hide();
//                     {
//                       onChange && onChange(res.value);
//                     }
//                   }}
//                   key={`li`}
//                 >
//                   <span className="d-flex align-items-center">
//                     {label == "Color" &&
//                       <span className="colorBall" style={{
//                         backgroundColor: res.name
//                       }}></span>}
//                     <span>{res.name}</span>
//                   </span>
//                 </li>
//               ) : (
//                 <li
//                   onClick={() => {
//                     setValue(res);
//                     setKey(res);
//                     setError("opacity-0");
//                     $(".dropMenu").hide();
//                     {
//                       onChange && onChange(res);
//                     }
//                   }}
//                   key={`li`}
//                 >
//                   <span className="d-flex align-items-center">
//                     {label == "Color" &&
//                       <span className="colorBall" style={{
//                         backgroundColor: res
//                       }}></span>}
//                     <span>{res}</span>
//                   </span>
//                 </li>
//               )
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };


// export const MultiSelect = (props) => {
//   const {
//     id,
//     label,
//     options,
//     onChange,
//     className,
//     btnClass,
//     defaultValue,
//     placeholder,
//     name,
//     errorMessage,
//     angle,
//     onChangeValue
//   } = props;

//   const [selectedValues, setSelectedValues] = useState([]);
//   const [showValue, setShowValue] = useState();
//   const [error, setError] = useState("opacity-0");

//   const handleOptionClick = (option) => {
//     const valueToToggle = option.value || option;
//     const isSelected = selectedValues.includes(valueToToggle);
//     if (!isSelected) {
//       setSelectedValues([...selectedValues, valueToToggle]);
//       if (showValue) {
//         setShowValue([...showValue, valueToToggle]);
//       } else {
//         setShowValue([valueToToggle]);
//       }
//     } else {
//       const newSelectedValues = selectedValues.filter(
//         (value) => value !== valueToToggle
//       );

//       setSelectedValues(newSelectedValues);
//       setShowValue(newSelectedValues);
//     }
//     $(".dropMenu").hide();

//   };
//   useEffect(() => {
//     setError(selectedValues?.length === 0 ? "opacity-1" : "opacity-0");
//   }, [selectedValues]);
//   useEffect(() => {
//     setError("opacity-0");
//   }, []);

//   $(document).ready(function () {
//     const editId = $(`#${id}`)[0]?.value
//     if (editId && options) {
//       const action = editId.split(",")
//       setSelectedValues(action)
//       setShowValue(action)
//     }
//   })

//   return (
//     <div className={`inputData text-start ${className}`}>
//       <SelectScript value={showValue} id={`toggle-${id}`} angle={angle} />
//       <label htmlFor={id}>{label}</label>
//       <div className={`selectMain`}>
//         <button
//           className={`selectBox betBox m-auto-left ${btnClass}`}
//           type="button"
//           value={selectedValues}
//           id={`toggle-${id}`}
//         >
//           <input
//             type="text"
//             placeholder={placeholder}
//             readOnly
//             name={name}
//             className={`p0 m0 h-auto cursor-pointer d-none ${!selectedValues ? "text-gray" : "text-dark"
//               }`}
//             value={showValue}
//             onChange={onChangeValue}
//             id={id}
//           />
//           <p className={`m0 m10-right showSelectValue`}>
//             {selectedValues?.length === 0 ? (
//               <span className="text-gray">{placeholder}</span>
//             ) : (
//               selectedValues.map((selectedValue, index) => {
//                 const optionObject =
//                   typeof selectedValue === "object" &&
//                   selectedValue.hasOwnProperty("name") &&
//                   selectedValue.hasOwnProperty("value");

//                 return (
//                   <span key={index} className="text-dark multiSelectionDisplay">
//                     {label == "Color" &&
//                       <span className="colorBall" style={{
//                         backgroundColor: optionObject
//                           ? selectedValue.name
//                           : (options.find((opt) => opt.value === selectedValue) || {}).name || selectedValue
//                       }}></span>}
//                     <span>
//                       {optionObject
//                         ? selectedValue.name
//                         : (options.find((opt) => opt.value === selectedValue) || {}).name || selectedValue}
//                     </span>
//                   </span>
//                 );
//               })
//             )}
//           </p>
//           <i
//             className={`ri-arrow-down-s-line ${selectedValues?.length === 0 ? "text-gray" : "text-dark"
//               }`}
//           ></i>
//         </button>
//         <p
//           className={`errorMessage text-start ${error}`}
//           id={`error-${name}`}
//         >
//           {errorMessage}
//         </p>
//         <ul className="dropMenu">
//           {options?.map((option, index) => (
//             <li
//               key={index}
//               className={
//                 selectedValues.includes(option.value || option)
//                   ? "selected"
//                   : ""
//               }
//               onClick={() => {
//                 handleOptionClick(option);
//                 setError("opacity-0");
//                 onChange &&
//                   onChange(
//                     selectedValues.map((selectedValue) => {
//                       const optionObject =
//                         typeof selectedValue === "object" &&
//                         selectedValue.hasOwnProperty("name") &&
//                         selectedValue.hasOwnProperty("value");
//                       return optionObject
//                         ? selectedValue
//                         : {
//                           name: (options.find((opt) => opt.value === selectedValue) || {}).name || selectedValue,
//                           value: selectedValue,
//                         };
//                     })
//                   );
//               }}
//             >
//               {label == "Color" &&
//                 <span className="colorBall" style={{ backgroundColor: typeof option === "object" ? option.name : option }}></span>}
//               <span>{typeof option === "object" ? option.name : option}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };


// const SelectScript = ({ value, id, angle }) => {
//   useEffect(() => {

//     $(".dropMenu").hide();
//     const handleDrop = () => {
//       console.log("angle", angle);

//       if (angle) {
//         let height = $(document).height();
//         let adminStart = $(".adminStart").height();
//         let dropMenuStyleHeight = $(`#${id} ~ .dropMenu`).css('maxHeight');
//         let dropMenuHeight = $(`#${id} ~ .dropMenu`).height()
//         const totalHeight = !dropMenuStyleHeight == "none" ? parseInt(dropMenuStyleHeight) + adminStart : dropMenuHeight + adminStart;
//         if (totalHeight >= height) {
//           $(`#${id} ~ .dropMenu`).removeClass("bottomSide");
//           $(`#${id} ~ .dropMenu`).addClass("topSide");
//         } else {
//           $(`#${id} ~ .dropMenu`).removeClass("topSide");
//           $(`#${id} ~ .dropMenu`).addClass("bottomSide");
//         }

//         console.log("id", id);
//         console.log("height", height);
//         console.log("dropMenu", totalHeight);
//         console.log("$(`#${id} ~ .dropMenu`)", $(`#${id} ~ .dropMenu`));

//       }

//       $(`#${id} ~ .dropMenu`).slideToggle();
//     };

//     $(`#${id}`).on("click", handleDrop);
//     return () => {
//       $(`#${id}`).off("click", handleDrop);
//     };
//   }, []);

//   return null;
// };

// src/Extra/Input.js
import React from 'react';

const Input = ({ type, id, placeholder, name, value, onChange, errorMessage, className }) => {
    return (
        <div className={`inputData ${className}`}>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="input-field"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
};

export default Input;
