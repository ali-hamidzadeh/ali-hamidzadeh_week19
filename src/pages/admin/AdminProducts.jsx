import { getCurrentUser } from "../../utils/userStorage";
import styles from "./AdminProduction.module.css";
import { useProductSearch } from "../../contexts/ProductSearchContext";

import { CiSearch } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import sliderIcon from "../../assets/setting-3.svg";
import userImg from "../../assets/Felix-Vogel-4.png";
import { useEffect } from "react";

function AdminProducts() {
  const currentUser = getCurrentUser();

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

  useEffect(() => {
    refreshProducts();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <div className={styles.search}>
          <CiSearch />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <button>افزودن محصول</button>
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.inventory}</td>
                    <td>{product.price}</td>
                    <td>{product.id}</td>
                    <td>
                      <div className={styles.operation}>
                        <BiEdit className={styles.edit_icon} />
                        <BiTrash className={styles.delete_icon} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <span
            key={page}
            className={`${styles.page_item} ${page === currentPage ? styles.active : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
