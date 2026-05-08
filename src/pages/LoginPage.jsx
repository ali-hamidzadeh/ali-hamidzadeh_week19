import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { FiEye, FiEyeOff } from "react-icons/fi";

import styles from "./css/LoginPage.module.css";
import Union from "../assets/Union.png";
import { logInputs } from "../utils/inputs";
import { login } from "../services/authServices";
import { validateFields } from "../utils/validation";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

      console.log("ورود موفق:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/products");
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
        <img src={Union} alt="onlineShop-logo" />
        <h2>فرم ورود</h2>

        <form onSubmit={submitHandler}>
          {errors.server && (
            <div className={styles.server_error}>{errors.server}</div>
          )}

          {logInputs.map((input) => (
            <div key={input.name}>
              <input
                type={input.showToggle && showPassword ? "text" : input.type}
                name={input.name}
                id={input.name}
                value={form[input.name]}
                placeholder={input.placeholder}
                onChange={formHandler}
                disabled={isLoading}
              />
              {input.showToggle && (
                <span
                  className={styles.eye_icon}
                  onClick={() => setShowPassword(!showPassword)}
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

        <a href="/register">ایجاد حساب کاربری!</a>
      </div>
    </div>
  );
}

export default LoginPage;
