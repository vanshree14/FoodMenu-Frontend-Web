import React, { useEffect, useState } from "react";
import $ from "jquery";

const Input = (props) => {
    const [imagePath, setImagePath] = useState("");
    const handleImage = (e) => {
        if (e.target.files.length > 0) {
            setImagePath(URL?.createObjectURL(e.target.files[0]));
        } else {
            setImagePath("");
        }
    };

    const {
        id,
        className,
        inputDataClass,
        type,
        name,
        label,
        placeholder,
        value,
        disabled,
        readOnly,
        min,
        max,
        activeIcon,
        activClick,
        labelClass,
        errorMessage,
        autoComplete,
        defaultValue,
        validation,
        validationError,
        ignore,
        icon // Added icon prop
    } = props;

    const [types, setTypes] = useState(type);

    const hideShow = () => {
        types === "password" ? setTypes("text") : setTypes("password");
    };
    const [error, setError] = useState("opacity-0");
    const checkForm = (e) => {
        if (types === "file" || types === "files") {
            handleImage(e);
        }

        if (e.target.value == "") {
            setError("opacity-1");
        } else {
            setError("opacity-0");
        }
    };

    return (
        <div className={`inputData ${types} ${inputDataClass} flex-row justify-content-start text-start position-relative`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`${(types === "radio" || types === "checkbox") && "ms-2 order-1"
                        } ${labelClass}`}
                >
                    {label}
                </label>
            )}

            <div className="inputsBox position-relative">
                {icon && <i className={`inputsIcons ${icon}`} ></i>}

                <input
                    type={types}
                    name={name}
                    className={`input-field ${className}`}
                    id={id}
                    onChange={(e) => checkForm(e)}
                    placeholder={placeholder}
                    value={value}
                    onWheel={(e) => type === "number" && e.target.blur()}
                    disabled={disabled}
                    readOnly={readOnly}
                    minLength={min}
                    maxLength={max}
                    autoComplete={autoComplete}
                    defaultValue={defaultValue}
                    data-validation={validation}
                    data-ignore={ignore}
                    title={validationError}
                    style={{ paddingLeft: icon ? '50px' : '10px' }}
                />
                {/* Password hide show */}
                {type === "password" && (
                    <div className="passHideShow" onClick={hideShow}>
                        {types === "password" ? (
                            <i className="ri-eye-line"></i>
                        ) : (
                            <i className="ri-eye-close-line"></i>
                        )}
                    </div>
                )}
            </div>

            {/* Show Image */}
            <img
                src={imagePath !== "" ? imagePath : null}
                alt="hostImage"
                draggable="false"
                className={`${(!imagePath || imagePath === "") && "d-none"}`}
                width={"70px"}
                height={"70px"}
                data-image={name}
                data-class={`showImage`}
                id={`file-${name}`}
            />

            {/* error */}
            {type !== "search" && (
                <p className={`errorMessage text-start ${error}`} id={`error-${name}`}>{errorMessage}</p>
            )}



            {/* Search Icon */}
            {type === "search" && !value && (
                <div className="searching">
                    <i className="ri-search-line"></i>
                </div>
            )}

            {activeIcon && (
                <div className="activeIcon" onClick={activClick}>
                    <i className={activeIcon}></i>
                </div>
            )}
        </div>
    );
};

export default Input;
