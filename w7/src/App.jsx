import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/frontend/Home";
import Products from "./pages/frontend/Products";
import ProductDetail from "./pages/frontend/ProductDetail";
import Cart from "./pages/frontend/Cart";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import useCart from "./hooks/useCart";
import useAuth from "./hooks/useAuth";
import "./assets/styles.scss";

function App() {
  const { cart, addToCart, updateCartQty, removeFromCart, clearCart } =
    useCart();

  const {
    account,
    setAccount,
    isAuth,
    setIsAuth,
    checkLogin,
    handleLogin,
    handleLogout,
  } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateCartQty={updateCartQty}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/login"
            element={
              isAuth ? (
                <Navigate to="/" />
              ) : (
                <LoginForm
                  account={account}
                  onInputChange={handleInputChange}
                  onLogin={handleLogin}
                />
              )
            }
          />
          <Route
            path="/admin"
            element={isAuth ? <div>管理員頁面</div> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
