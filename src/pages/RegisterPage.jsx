import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { resInputs } from "../utils/inputs";
import { validateField, validateForm } from "../utils/validation";
import { register } from "../services/authServices";
import Union from "../assets/Union.png";
import { useTitle } from "../hooks/useTitle";
import styles from "./css/RegisterPage.module.css";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/userStorage";

function RegisterPage({ isAdmin = false }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); // state برای لودر

  const navigate = useNavigate();

  useTitle(isAdmin ? "ثبت نام ادمین" : "ثبت نام در بیزباز");

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({
      ...prev,
      [name]: validateField(name, value, { ...form, [name]: value }),
      server: undefined,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const trimmedForm = {
      username: form.username.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    const validationErrors = validateForm(trimmedForm);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await register({
        username: trimmedForm.username,
        password: trimmedForm.password,
      });

      console.log("ثبت‌نام موفق:", response.data);

      const role = isAdmin ? "admin" : "user";

      const registered = registerUser(trimmedForm.username, role);

      if (!registered) {
        setError({ server: "این نام کاربری قبلاً ثبت شده است" });
        setLoading(false);
        return;
      }

      setTimeout(() => {
        if (role === "admin") {
          navigate("/login?admin=true");
        } else {
          navigate("/login");
        }
        setLoading(false);
      }, 2000);
    } catch (e) {
      const message = e.response?.data?.message || "خطایی در ثبت‌نام رخ داد";
      setError((prev) => ({ ...prev, server: message }));
      setLoading(false);
    }
  };

  const getVisibility = (name) => {
    if (name === "password") return showPassword;
    if (name === "confirmPassword") return showConfirmPassword;
    return false;
  };

  const toggleVisibility = (name) => {
    if (name === "password") setShowPassword(!showPassword);
    if (name === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to="/admin/register" className={styles.logo}>
          <img src={Union} alt="onlineShop-logo" />
        </Link>

        <h2>{isAdmin ? "فرم ثبت نام ادمین" : "فرم ثبت نام"}</h2>
        <form onSubmit={submitHandler}>
          {error.server && (
            <div className={styles.server_error}>{error.server}</div>
          )}
          {resInputs.map((input) => (
            <div key={input.name}>
              <input
                type={
                  input.showToggle && getVisibility(input.name)
                    ? "text"
                    : input.type
                }
                name={input.name}
                id={input.name}
                value={form[input.name]}
                placeholder={input.placeholder}
                onChange={formHandler}
                className={error[input.name] ? styles.input_error : ""}
                disabled={loading}
              />
              {input.showToggle && (
                <span
                  className={styles.eye_icon}
                  onClick={() => !loading && toggleVisibility(input.name)}
                >
                  {getVisibility(input.name) ? <FiEye /> : <FiEyeOff />}
                </span>
              )}
              {error[input.name] && (
                <span className={styles.error_message}>
                  {error[input.name]}
                </span>
              )}
            </div>
          ))}

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                در حال ثبت نام...
              </>
            ) : (
              "ثبت نام"
            )}
          </button>
        </form>
        {!loading && <a href="/login">حساب کاربری دارید؟</a>}
      </div>
    </div>
  );
}

export default RegisterPage;
