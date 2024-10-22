import React from 'react';
import { AlignJustify,Box } from 'lucide-react';

interface HeaderProps {
  onNavClick: {
    news: () => void;
    shop: () => void;
    donate: () => void;
  };
  onEvClick: {
    deployCard:() => void;
  }
}

const Header: React.FC<HeaderProps> = ({ onNavClick, onEvClick }) => {
  return (
    <header className="bg-[#2a2a2a] bg-opacity-80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-0 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Box className="text-[#8b5cf6]" size={32} />
          <h1 className="text-2xl font-bold">EzPlace</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><button onClick={onNavClick.news} className="hover:text-[#8b5cf6] transition-colors">News</button></li>
            <li><button onClick={onNavClick.shop} className="hover:text-[#8b5cf6] transition-colors">Shop</button></li>
            <li><button onClick={onNavClick.donate} className="hover:text-[#8b5cf6] transition-colors">Donate</button></li>
            <li><AlignJustify onClick={onEvClick.deployCard} className="hover:text-[#8b5cf6] transition-colors"></AlignJustify></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;