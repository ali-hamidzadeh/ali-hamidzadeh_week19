import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminProducts from "./pages/admin/AdminProducts";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/register" element={<RegisterPage isAdmin={true} />} />

      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
