import React from 'react';

const Button = ({ onClick, text, aIcon, bIcon, className, type, disabled}) => {
  return (
    <button type={type} className={`themeButton ${className}`} onClick={onClick} disabled={disabled}>
      {bIcon && <span><i className={`${bIcon} m5-right`}></i></span>}
      <span>{text}</span>
      {aIcon && <span><i className={`${aIcon} m5-left`}></i></span>}
    </button>
  );
}

export default Button;



export const ActionButton = ({
  onClick,
  onDoubleClick,
  text,
  icon,
  aIcon,
  bIcon,
  className,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`actionButton ${className}`}
      onClick={onClick}
      disabled={disabled}
      onDoubleClick={onDoubleClick}
    >
      {bIcon && (
        <span>
          <i className={`${bIcon} m5-right`}></i>
        </span>
      )}
      {text && <span>{text}</span>}
      {icon && (
        <span>
          <i className={`${icon}`}></i>
        </span>
      )}
      {aIcon && (
        <span>
          <i className={`${aIcon} m5-left`}></i>
        </span>
      )}
    </button>
  );
};
