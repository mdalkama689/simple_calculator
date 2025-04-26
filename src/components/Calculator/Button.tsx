import React from 'react';

type ButtonType = 'number' | 'operator' | 'function';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type: ButtonType;
  isWide?: boolean;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  type, 
  isWide = false,
  isActive = false 
}) => {
  const getBackgroundColor = () => {
    if (type === 'operator') return isActive ? 'bg-amber-500 hover:bg-amber-400' : 'bg-amber-500 hover:bg-amber-400';
    if (type === 'function') return 'bg-[#323232] hover:bg-[#3D3D3D]';
    return 'bg-[#505050] hover:bg-[#606060]';
  };

  const getTextColor = () => {
    if (type === 'operator') return 'text-white';
    if (type === 'function') return 'text-white';
    return 'text-white';
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${getBackgroundColor()}
        ${getTextColor()}
        text-xl sm:text-2xl font-medium
        rounded-full
        flex items-center justify-center
        transition-all duration-200
        active:scale-95
        h-16 sm:h-[70px]
        shadow-lg
        ${isWide ? 'col-span-2 w-full' : 'aspect-square'}
      `}
    >
      {label}
    </button>
  );
};

export default Button;