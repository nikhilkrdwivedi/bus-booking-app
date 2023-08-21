// import React from "react";
import PropTypes from "prop-types";

export default function Button({
  title,
  Icon,
  classNames,
  onClick,
  IconSize = 18,
  iconClass,
}:ButtonTypes) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md  text-center flex items-center justify-evenly ${classNames}`}
    >
      {Icon && <Icon size={IconSize} className={iconClass} />}
      {title}
    </button>
  );
}

type ButtonTypes = {
  title?: string,
  Icon?: any,
  classNames?:string,
  IconSize?: number,
  iconClass?: string,
  onClick?:  (event: React.MouseEvent<HTMLButtonElement>) => void,
};
