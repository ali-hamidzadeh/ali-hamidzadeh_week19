import { useEffect, useCallback, useRef } from "react";
import { getCurrentUser } from "../../utils/userStorage";
import styles from "./AdminProduction.module.css";
import { useProductSearch } from "../../contexts/ProductSearchContext";
import { useProductActions } from "../../contexts/ProductActionContext";

import { CiSearch } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import sliderIcon from "../../assets/setting-3.svg";
import userImg from "../../assets/Felix-Vogel-4.png";

import AddModal from "../../components/modals/AddModal";
import DeleteModal from "../../components/modals/DeleteModal";
import EditModal from "../../components/modals/EditModal";

function AdminProducts() {
  const currentUser = getCurrentUser();
  const timeoutRef = useRef(null);

  const {
    searchTerm,
    setSearchTerm,
    products,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    refreshProducts,
  } = useProductSearch();

  const {
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
  } = useProductActions();

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSearchTerm(value);
      }, 500);
    },
    [setSearchTerm],
  );

  const confirmDelete = async () => {
    if (deleteModal.product) {
      const success = await handleDeleteProduct(deleteModal.product.id);
      if (success) {
        closeDeleteModal();
        refreshProducts();
      }
    }
  };

  const saveNewProduct = async (productData) => {
    try {
      await handleAddProduct(productData);
      closeAddModal();
      refreshProducts();
    } catch (error) {
      console.error("خطا در ایجاد محصول:", error);
    }
  };

  const saveEdit = async (productId, updatedData) => {
    try {
      await handleEditProduct(productId, updatedData);
      closeEditModal();
      refreshProducts();
    } catch (error) {
      console.error("خطا در ویرایش:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <div className={styles.search}>
          <CiSearch />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.login_user}>
          <div>
            <img src={userImg} alt="" />
            <div className={styles.userText}>
              <p>{currentUser ? currentUser.username : "کاربر"}</p>
              <p>مدیر</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.management}>
        <div className={styles.title_manage}>
          <div>
            <img src={sliderIcon} alt="slider" />
            <span>مدیریت کالا</span>
          </div>
          <button onClick={openAddModal}>افزودن محصول</button>
        </div>

        <div className={styles.table_component}>
          {loading ? (
            <div>در حال بارگذاری...</div>
          ) : (
            <table className={styles.card}>
              <thead>
                <tr>
                  <th>نام کالا</th>
                  <th>موجودی</th>
                  <th>قیمت</th>
                  <th>شناسه کالا</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && searchTerm && !loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      محصولی یافت نشد
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>{product.id}</td>
                      <td>
                        <div className={styles.operation}>
                          <BiEdit
                            className={styles.edit_icon}
                            onClick={() => openEditModal(product)}
                          />
                          <BiTrash
                            className={styles.delete_icon}
                            onClick={() => openDeleteModal(product)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={styles.pagination}>
        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <span
              key={page}
              className={`${styles.page_item} ${page === currentPage ? styles.active : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </span>
          ))}
      </div>

      <AddModal
        isOpen={addModal.isOpen}
        onClose={closeAddModal}
        onSave={saveNewProduct}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={deleteModal.product?.name}
      />

      <EditModal
        isOpen={editModal.isOpen}
        onClose={closeEditModal}
        product={editModal.product}
        onSave={saveEdit}
      />
    </div>
  );
}

export default AdminProducts;
