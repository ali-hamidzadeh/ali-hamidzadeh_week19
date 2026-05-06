// قوانین اعتبارسنجی
const rules = {
  userName: (value) => {
    if (!value.trim()) return "نام کاربری الزامی است";
    if (value.length < 3) return "نام کاربری باید حداقل 3 کاراکتر باشد";
    return "";
  },

  password: (value) => {
    if (!value) return "رمز عبور الزامی است";
    if (value.length < 6) return "رمز عبور حداقل باید 6 کاراکتر باشد";
    return "";
  },

  confirmPassword: (value, formData) => {
    if (!value) return "تکرار رمز عبور الزامی است";
    if (value !== formData.password) return "رمز عبور و تکرار آن مطابقت ندارند";
    return "";
  },
};

export const validateField = (name, value, formData) => {
  const rule = rules[name];
  return rule ? rule(value, formData) : "";
};

export const validateForm = (formData) => {
  const error = {};

  Object.keys(rules).forEach((fieldName) => {
    const error = rules[fieldName](formData[fieldName], formData);
    if (error) error[fieldName] = error;
  });

  return error;
};
