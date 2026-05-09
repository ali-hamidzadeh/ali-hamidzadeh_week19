// LoginPage.js
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { FiEye, FiEyeOff } from "react-icons/fi";

import styles from "./css/LoginPage.module.css";
import Union from "../assets/Union.png";
import { logInputs } from "../utils/inputs";
import { login } from "../services/authServices";
import { validateFields } from "../utils/validation";
import { getUser, updateUserTokenAfterLogin } from "../utils/userStorage";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useTitle("ورود به بیزباز");

  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "", server: "" }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const trimmedForm = {
      username: form.username.trim(),
      password: form.password,
    };

    const validationErrors = validateFields(trimmedForm, [
      "username",
      "password",
    ]);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        username: trimmedForm.username,
        password: trimmedForm.password,
      });

      const token = response.data.token || response.data.accessToken;

      const existingUser = getUser(trimmedForm.username);

      if (!existingUser) {
        setErrors({ server: "ابتدا ثبت‌نام کنید" });
        setIsLoading(false);
        return;
      }

      const isAdminParam = searchParams.get("admin") === "true";
      if (isAdminParam && existingUser.role !== "admin") {
        setErrors({ server: "شما دسترسی ادمین ندارید" });
        setIsLoading(false);
        return;
      }

      updateUserTokenAfterLogin(trimmedForm.username, token);

      setTimeout(() => {
        if (existingUser.role === "admin") {
          navigate("/admin/products");
        } else {
          navigate("/products");
        }
      }, 2000);
    } catch (e) {
      const message = e.response?.data?.message || "خطایی در ورود رخ داد";
      setErrors({ server: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>
          <img src={Union} alt="onlineShop-logo" />
        </Link>
        <h2>
          {searchParams.get("admin") === "true" ? "ورود ادمین" : "فرم ورود"}
        </h2>

        <form onSubmit={submitHandler}>
          {errors.server && (
            <div className={styles.server_error}>{errors.server}</div>
          )}

          {logInputs.map((input) => (
            <div key={input.name} className={styles.input_group}>
              <input
                type={input.showToggle && showPassword ? "text" : input.type}
                name={input.name}
                id={input.name}
                value={form[input.name]}
                placeholder={input.placeholder}
                onChange={formHandler}
                disabled={isLoading}
                className={errors[input.name] ? styles.input_error : ""}
              />
              {input.showToggle && (
                <span
                  className={styles.eye_icon}
                  onClick={() => !isLoading && setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              )}

              {errors[input.name] && (
                <span className={styles.error_message}>
                  {errors[input.name]}
                </span>
              )}
            </div>
          ))}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className={styles.register_link}>
          <Link
            to={
              searchParams.get("admin") === "true"
                ? "/admin/register"
                : "/register"
            }
          >
            ایجاد حساب کاربری!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
