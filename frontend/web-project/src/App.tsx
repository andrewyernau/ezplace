import { Footer } from "./components/Footer";

import { Navbar } from "./components/Navbar";

import { ScrollToTop } from "./components/ScrollToTop";

import BodyContent from "./components/BodyContent";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <BodyContent />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
