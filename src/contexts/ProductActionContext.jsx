import { createContext, useContext, useState, useCallback } from "react";
import { productAPI } from "../services/api";

const ProductActionContext = createContext();

export function ProductActionProvider({ children }) {
  const [addModal, setAddModal] = useState({ isOpen: false });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
  const [editModal, setEditModal] = useState({ isOpen: false, product: null });

  const openAddModal = useCallback(() => {
    setAddModal({ isOpen: true });
  }, []);

  const closeAddModal = useCallback(() => {
    setAddModal({ isOpen: false });
  }, []);

  const handleAddProduct = useCallback(async (productData) => {
    try {
      const response = await productAPI.create(productData);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }, []);

  const openDeleteModal = useCallback((product) => {
    setDeleteModal({
      isOpen: true,
      product: product,
    });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({
      isOpen: false,
      product: null,
    });
  }, []);

  const handleDeleteProduct = useCallback(async (productId) => {
    try {
      await productAPI.delete(productId);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }, []);

  const openEditModal = useCallback((product) => {
    setEditModal({
      isOpen: true,
      product: product,
    });
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModal({
      isOpen: false,
      product: null,
    });
  }, []);

  const handleEditProduct = useCallback(async (productId, updatedData) => {
    try {
      const response = await productAPI.update(productId, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  }, []);

  const value = {
    addModal,
    openAddModal,
    closeAddModal,
    handleAddProduct,
    
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteProduct,
    
    editModal,
    openEditModal,
    closeEditModal,
    handleEditProduct,
  };

  return (
    <ProductActionContext.Provider value={value}>
      {children}
    </ProductActionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProductActions() {
  const context = useContext(ProductActionContext);
  if (!context) {
    throw new Error("useProductActions must be used within ProductActionProvider");
  }
  return context;
}