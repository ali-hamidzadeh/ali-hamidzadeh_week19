import { useState } from "react";
import styles from "./AddModal.module.css";

function AddModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  if (!isOpen) return null;

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>ایجاد محصول جدید</h2>

        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.formGroup}>
            <label>نام کالا</label>
            <input
              type="text"
              name="name"
              placeholder="نام کالا"
              value={formData.name}
              onChange={changeHandler}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>تعداد موجودی</label>
            <input
              type="number"
              name="quantity"
              placeholder="تعداد"
              value={formData.quantity}
              onChange={changeHandler}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>قیمت</label>
            <input
              type="text"
              name="price"
              placeholder="قیمت"
              value={formData.price}
              onChange={changeHandler}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.saveButton}>
              ایجاد
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
