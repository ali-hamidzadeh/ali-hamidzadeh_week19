import { getCurrentUser } from "../../utils/userStorage";
import { BiSearch } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import sliderIcon from "../../assets/setting-3.svg";

import userImg from "../../assets/Felix-Vogel-4.png";
import styles from "./AdminProduction.module.css";

function AdminProducts() {
  const currentUser = getCurrentUser();

  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <div className={styles.search}>
          <BiSearch />
          <input type="text" placeholder="جستجو کالا" />
        </div>
        <div className={styles.login_user}>
          <div>
            <img src={userImg} alt="" />{" "}
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
              <tr>
                <td>تیشرت طرح انگولار</td>
                <td>293</td>
                <td>90 هزار تومان</td>
                <td>90uf9g9h7895467g974</td>
                <td>
                  <div className={styles.operation}>
                    <BiEdit className={styles.edit_icon} />
                    <BiTrash className={styles.delete_icon} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>تیشرت طرح انگولار</td>
                <td>293</td>
                <td>90 هزار تومان</td>
                <td>90uf9g9h7895467g974</td>
                <td>
                  <div className={styles.operation}>
                    <BiEdit className={styles.edit_icon} />
                    <BiTrash className={styles.delete_icon} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>تیشرت طرح انگولار</td>
                <td>293</td>
                <td>90 هزار تومان</td>
                <td>90uf9g9h7895467g974</td>
                <td>
                  <div className={styles.operation}>
                    <BiEdit className={styles.edit_icon} />
                    <BiTrash className={styles.delete_icon} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>تیشرت طرح انگولار</td>
                <td>293</td>
                <td>90 هزار تومان</td>
                <td>90uf9g9h7895467g974</td>
                <td>
                  <div className={styles.operation}>
                    <BiEdit className={styles.edit_icon} />
                    <BiTrash className={styles.delete_icon} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>تیشرت طرح انگولار</td>
                <td>293</td>
                <td>90 هزار تومان</td>
                <td>90uf9g9h7895467g974</td>
                <td>
                  <div className={styles.operation}>
                    <BiEdit className={styles.edit_icon} />
                    <BiTrash className={styles.delete_icon} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.pagination}>
        <span className={`${styles.page_item} ${styles.active}`}>۱</span>

        <span className={styles.page_item}>۲</span>

        <span className={styles.page_item}>۳</span>
      </div>
    </div>
  );
}

export default AdminProducts;
