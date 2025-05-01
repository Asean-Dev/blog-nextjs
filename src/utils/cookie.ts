import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("_jwt_token", token, {
    expires: 1 / 24, // วัน
    path: "/",
  });
};
export const removedToken = () => {
  Cookies.set("_jwt_token", "");
};

export const getToken = () => {
  // ดึง token จาก cookie
  const token = Cookies.get("_jwt_token");

  return { Authorization: { Authorization: `Bearer ${token}` }, token: token };
};
