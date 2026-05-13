import { useEffect, useState } from "react";
import styles from "./EditModal.module.css";

function EditModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    quantity: product?.quantity || "",
    price: product?.price || "",
  });

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        name: product.name || "",
        quantity: product.quantity || "",
        price: product.price || "",
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product.id, formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>ویرایش اطلاعات</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>نام کالا</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>تعداد موجودی</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>قیمت</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.saveButton}>
              ثبت اطلاعات جدید
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

export default EditModal;
