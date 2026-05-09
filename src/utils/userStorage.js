const USERS_KEY = "app_users";
const CURRENT_USER_KEY = "currentUser";

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getUser = (username) => {
  const users = getUsers();
  return users.find((u) => u.username === username);
};

export const registerUser = (username, role = "user") => {
  const users = getUsers();

  if (users.find((u) => u.username === username)) {
    return false;
  }

  const newUser = {
    username: username,
    token: null,
    role: role,
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const updateUserTokenAfterLogin = (username, token) => {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex !== -1) {
    users[userIndex].token = token;
    users[userIndex].lastLogin = new Date().toISOString();
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    localStorage.setItem(CURRENT_USER_KEY, username);
    localStorage.setItem("token", token);
    localStorage.setItem("role", users[userIndex].role);
    localStorage.setItem("username", username);

    return true;
  }
  return false;
};

export const getCurrentUser = () => {
  const username = localStorage.getItem(CURRENT_USER_KEY);
  if (!username) return null;
  return getUser(username);
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};
