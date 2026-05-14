import { createContext, useCallback, useContext, useState, useEffect, useMemo } from "react";
import { productAPI } from "../services/api";

const ProductSearchContext = createContext();

export function ProductSearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAll({
        page: 1,
        limit: 1000, 
      });
      
      const products = response.data.products || response.data.data || [];
      setAllProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      return allProducts;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return allProducts.filter(product => 
      product.name?.toLowerCase().includes(term) ||
      product.title?.toLowerCase().includes(term) ||
      product.id?.toString().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.price?.toString().includes(term)
    );
  }, [allProducts, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term || "");
    setCurrentPage(1); 
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const value = {
    searchTerm,
    products: currentProducts,
    allProducts: filteredProducts,
    loading,
    currentPage,
    totalPages,
    setSearchTerm: handleSearch,
    setCurrentPage: handlePageChange,
    refreshProducts: fetchAllProducts,
  };

  return (
    <ProductSearchContext.Provider value={value}>
      {children}
    </ProductSearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProductSearch() {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error("useProductSearch must be used within ProductSearchProvider");
  }
  return context;
}