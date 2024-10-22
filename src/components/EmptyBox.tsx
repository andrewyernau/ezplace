import React from 'react';

interface EmptyBox {

}

const EmptyBox: React.FC<EmptyBox> = ({ }) => {
  return (
    <div className="bg-[#2a2a2a] bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105">
      
    </div>
  );
};

export default EmptyBox;