import {jwtDecode} from "jwt-decode";

const getToken = () => localStorage.getItem("token");

const decodeToken = () => {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  } else {
    console.error("No token found");
    return null;
  }
};

const getUserIdFromToken = () => {
  const decodedToken = decodeToken();
  return decodedToken ? decodedToken.id : null; // Asegúrate de que el campo `id` esté en el token
};

const isAdmin = () => {
  const decodedToken = decodeToken();
  return decodedToken ? decodedToken.rol === "Administrador" : false; // Asegúrate de que el campo `rol` esté en el token
};

const getUserDataFromToken = () => {
  const decodedToken = decodeToken();
  return decodedToken || null;
};

export { getUserIdFromToken, isAdmin, getUserDataFromToken };
