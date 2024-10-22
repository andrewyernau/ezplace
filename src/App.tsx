import React, { useEffect, useState, useRef } from "react";
import { Circle } from "lucide-react";
import Header from "./components/Header";
import NewsCard from "./components/NewsCard";
import ShopMenu from "./components/ShopMenu";
import DonationMenu from "./components/DonationMenu";
import EmptyBox from "./components/EmptyBox";

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const newsRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const donateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden w-full">
      {/* Background circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Circle
            key={i}
            className="absolute text-[#2a2a2a] opacity-10"
            size={Math.random() * 100 + 50}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${
                scrollY * (0.1 + Math.random() * 0.2)
              }px)`,
            }}
          />
        ))}
      </div>
      {/* Minecraft screenshot background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url(background.jpg)",
          filter: "blur(5px)",
        }}
      ></div>

      {/* Main content */}
      <Header
        onNavClick={{
          news: () => scrollTo(newsRef),
          shop: () => scrollTo(shopRef),
          donate: () => scrollTo(donateRef),
        }}
        onEvClick={{ deployCard: () => scrollTo(donateRef) }}
      />
      <main className="w-full px-4 py-6">
        <div ref={newsRef} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#8b5cf6]">
            Latest News
          </h2>
          <div className="flex gap-8">
            <div className="flex-1">
              <NewsCard title="asdasd" content="asdasd" date="" />
            </div>
            <div className="flex-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5">
              <NewsCard
                title="Mod Spotlight: TechCraft"
                content="Explore the wonders of technology in Minecraft with our featured mod of the month."
                date="2023-04-10"
              />
              <NewsCard
                title="New Survival World!"
                content="Join our brand new survival world with custom terrain and exciting challenges."
                date="2023-04-15"
              />
              <NewsCard
                title="Server Maintenance"
                content="Scheduled maintenance on April 20th. The server will be down for 2 hours."
                date="2023-04-05"
              />
              <div ref={shopRef}>
                <ShopMenu />
              </div>
              <div ref={donateRef}>
                <DonationMenu />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
