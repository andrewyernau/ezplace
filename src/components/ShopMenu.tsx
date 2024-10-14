import React from 'react';
import { ShoppingBag } from 'lucide-react';

const ShopMenu: React.FC = () => {
  return (
    <div className="bg-[#2a2a2a] bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="flex items-center space-x-2 mb-4">
        <ShoppingBag className="text-[#8b5cf6]" size={24} />
        <h2 className="text-2xl font-semibold">Shop</h2>
      </div>
      <ul className="space-y-2">
        <li className="flex justify-between items-center">
          <span>VIP Rank</span>
          <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] px-3 py-1 rounded transition-colors">
            $10
          </button>
        </li>
        <li className="flex justify-between items-center">
          <span>Diamond Kit</span>
          <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] px-3 py-1 rounded transition-colors">
            $5
          </button>
        </li>
        <li className="flex justify-between items-center">
          <span>Custom Pet</span>
          <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] px-3 py-1 rounded transition-colors">
            $3
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ShopMenu;