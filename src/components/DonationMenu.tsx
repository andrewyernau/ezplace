import React from 'react';
import { Heart } from 'lucide-react';

const DonationMenu: React.FC = () => {
  return (
    <div className="bg-[#2a2a2a] bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="flex items-center space-x-2 mb-4">
        <Heart className="text-[#8b5cf6]" size={24} />
        <h2 className="text-2xl font-semibold">Donate</h2>
      </div>
      <p className="text-gray-300 mb-4">
        Support our server and help us keep the creepers at bay! Your donations go towards server maintenance and exciting new features.
      </p>
      <div className="space-y-2">
        <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] py-2 rounded transition-colors">
          Donate $5
        </button>
        <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] py-2 rounded transition-colors">
          Donate $10
        </button>
        <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] py-2 rounded transition-colors">
          Donate $20
        </button>
      </div>
    </div>
  );
};

export default DonationMenu;