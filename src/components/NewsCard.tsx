import React from 'react';

interface NewsCardProps {
  title: string;
  content: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, content, date }) => {
  return (
    <div className="bg-[#2a2a2a] bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105">
      <h2 className="text-xl font-semibold mb-2 text-[#8b5cf6]">{title}</h2>
      <p className="text-gray-300 mb-4">{content}</p>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  );
};

export default NewsCard;