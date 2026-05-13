import styles from "./DeleteModal.module.css";
import delLogo from "../../assets/Close.png";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={delLogo} alt="delete_logo" />

        <h3 className={styles.modalTitle}>آیا از حذف این محصول مطمئنید؟</h3>

        <div className={styles.buttonContainer}>
          <button className={styles.deleteButton} onClick={onConfirm}>
            حذف
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
