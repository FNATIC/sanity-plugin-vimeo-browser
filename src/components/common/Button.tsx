import React from 'react';

interface ButtonProps {
  color?: string
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ color = "red", onClick, children }) => {
    const colorString = `bg-${color}-400`
    return (
      <button className={`${colorString} p-2 mr-2 rounded text-white hover:shadow-xl`} onClick={onClick}>
        {children}
      </button>
    );
};

export default Button;