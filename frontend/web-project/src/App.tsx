import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Username } from "./components/Username";
import { ScrollToTop } from "./components/ScrollToTop";
import BodyContent from "./components/BodyContent";
import "./App.css";
import { useState } from "react";

function App() {
  const [isUsernameVisible, setIsUsernameVisible] = useState(false);

  const toggleUsername = () => {
    setIsUsernameVisible(!isUsernameVisible);
  };

  return (
    <div className="app-container relative">
      <Navbar onLoginToggle={toggleUsername} />

      {/* Overlay para desenfoque */}
      {isUsernameVisible && (
        <div
          className="overlay"
          onClick={() => setIsUsernameVisible(false)}
        ></div>
      )}

      {/* Ventana de Username */}
      <div
        className={`username-container ${
          isUsernameVisible ? "" : "hidden"
        }`}
      >
        <Username onClose={toggleUsername} />
      </div>

      {/* Contenido principal */}
      <div className="body-content-container">
        <BodyContent />
        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
}

export default App;
