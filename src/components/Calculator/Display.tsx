import React from 'react';

interface DisplayProps {
  input: string;
  output: string;
}

const Display: React.FC<DisplayProps> = ({ input, output }) => {
  // Adjust font size based on length of the displayed value
  const getOutputFontSize = () => {
    if (output.length > 8) return 'text-4xl sm:text-5xl';
    if (output.length > 6) return 'text-5xl sm:text-6xl';
    return 'text-6xl sm:text-7xl';
  };

  return (
    <div className="w-full flex flex-col justify-end items-end gap-2 py-6 px-4 h-36 sm:h-40">
      <div className="text-lg sm:text-xl text-gray-400 font-light h-6 truncate tracking-wide">
        {input}
      </div>
      <div className={`${getOutputFontSize()} font-light text-white truncate tracking-tight`}>
        {output}
      </div>
    </div>
  );
};

export default Display;