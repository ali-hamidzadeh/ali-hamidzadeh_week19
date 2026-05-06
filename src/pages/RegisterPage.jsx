import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import inputs from "../utils/inputs";
import { validateField, validateForm } from "../utils/validation";
import { register } from "../services/authServices";
import Union from "../assets/Union.png";
import { useTitle } from "../hooks/useTitle";
import styles from "./css/RegisterPage.module.css";

function RegisterPage() {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});

  useTitle("ثبت نام در بیزباز");

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value, { ...form, [name]: value });
    setError((prev) => ({ ...prev, [name]: error }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const trimmedForm = {
      ...form,
      username: form.userName.trim(),
    };

    const validationErrors = validateForm(trimmedForm);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    try {
      const response = await register({
        username: trimmedForm.userName,
        password: trimmedForm.password,
      });

      console.log("ثبت‌نام موفق:", response.data);
    } catch (e) {
      const message = e.response?.data?.message || "خطایی در ثبت‌نام رخ داد";
      setError({ server: message });
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
        <img src={Union} alt="onlineShop-logo" />
        <h2>فرم ثبت نام</h2>

        <form onSubmit={submitHandler}>
          {inputs.map((input) => (
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
                className={error[input.name] ? "input-error" : ""}
              />
              {input.showToggle && (
                <span
                  className={styles.eye_icon}
                  onClick={() => toggleVisibility(input.name)}
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

          <button type="submit">ثبت نام</button>
        </form>

        <a href="/login">حساب کاربری دارید؟</a>
      </div>
    </div>
  );
}

export default RegisterPage;
