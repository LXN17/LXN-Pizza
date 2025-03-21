import "./scss/app.scss";
import Header from "./components/Header.js";
import { createContext, useState } from "react";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound/NotFound.js";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart.js";

export const SearchContext = createContext("");

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ cartCount, setCartCount }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
