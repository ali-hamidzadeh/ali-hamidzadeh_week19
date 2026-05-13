import { createContext, useCallback, useContext, useState } from "react";
import { productAPI } from "../services/api";

const ProductSearchContext = createContext();

export function ProductSearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async (search = searchTerm, page = 1) => {
    setLoading(true);
    try {
      const response = await productAPI.getAll({
        search: search,
        page: page,
        limit: 10,
      });

    

      setTotalPages(response.data.totalPages || 1);

  
      setProducts(response.data.products || response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchProducts(searchTerm, page);
    },
    [searchTerm, fetchProducts],
  );

  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term || "");
      setCurrentPage(1);
      fetchProducts(term, 1);
    },
    [fetchProducts],
  );

  const value = {
    searchTerm,
    products,
    loading,
    currentPage,
    totalPages,

    setSearchTerm: handleSearch,
    setCurrentPage: handlePageChange,
    fetchProducts,
    refreshProducts: () => fetchProducts(searchTerm, 1),
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
    throw new Error(
      "useProductSearch must be used within ProductSearchProvider",
    );
  }
  return context;
}
