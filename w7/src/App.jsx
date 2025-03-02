import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavbarController from "./components/NavbarController";
import Home from "./pages/frontend/Home";
import Products from "./pages/frontend/Products";
import ProductDetail from "./pages/frontend/ProductDetail";
import Cart from "./pages/frontend/Cart";
import LoginForm from "./components/LoginForm";
import LogoutComponent from "./components/LogoutComponent";
import Alert from "./components/Alert";
import ProductManagement from "./pages/backend/ProductManagement";
import OrderManagement from "./pages/backend/OrderManagement";
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
      <Alert />
      <NavbarController isAuth={isAuth} />
      <div className="container">
        <Routes>
          {/* 前端路由 */}
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

          {/* 登入/登出 */}
          <Route
            path="/login"
            element={
              isAuth ? (
                <Navigate to="/admin" />
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
            path="/logout"
            element={<LogoutComponent onLogout={handleLogout} />}
          />

          {/* 後台路由 */}
          <Route
            path="/admin"
            element={isAuth ? <div>管理員頁面</div> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/products"
            element={
              isAuth ? <ProductManagement /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/admin/orders"
            element={
              isAuth ? <OrderManagement /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
