import "./scss/app.scss";
import Header from "./components/Header";
import { useState } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="wrapper">
      <Header cartCount={cartCount} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home cartCount={cartCount} setCartCount={setCartCount} />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
