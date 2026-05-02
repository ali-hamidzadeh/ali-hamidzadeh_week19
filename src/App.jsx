import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminProducts from "./pages/admin/AdminProducts";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
